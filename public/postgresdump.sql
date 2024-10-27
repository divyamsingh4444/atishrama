-- Drop all tables if they exist to clean up the database
DROP TABLE IF EXISTS Shifts, Shift_Requests, Teams, Departments, Employees, Roles CASCADE;

-- Create Roles table first, as it's referenced by Employees
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    permissions JSONB -- Permissions as a JSON object
);

-- Create Departments table
CREATE TABLE Departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Teams table, referencing Departments
CREATE TABLE Teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department_id INT REFERENCES Departments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Employees table, which references Roles, Departments, and Teams
CREATE TABLE Employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    designation VARCHAR(100) DEFAULT 'employee', -- Default designation is "employee"
    department_id INT REFERENCES Departments(id) ON DELETE SET NULL,
    team_id INT REFERENCES Teams(id) ON DELETE SET NULL,
    role_id INT REFERENCES Roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Update Teams to include shift_manager_id after Employees table is created
ALTER TABLE Teams
ADD COLUMN shift_manager_id INT REFERENCES Employees(id) ON DELETE SET NULL;

-- Create Shift_Requests table, which references Employees
CREATE TABLE Shift_Requests (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(id) ON DELETE CASCADE,
    created_by INT REFERENCES Employees(id) ON DELETE SET NULL,
    shift_type VARCHAR(50) CHECK (shift_type IN ('half', 'full', 'night')),
    status VARCHAR(50) CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by INT REFERENCES Employees(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP,
    shift_date DATE NOT NULL,
    reason TEXT, -- Reason for the shift request
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Shifts table, which references Shift_Requests and Employees
CREATE TABLE Shifts (
    id SERIAL PRIMARY KEY,
    shift_request_id INT REFERENCES Shift_Requests(id) ON DELETE CASCADE,
    employee_id INT REFERENCES Employees(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('ongoing', 'completed', 'failed')),
    start_date DATE NOT NULL,
    end_date DATE, -- Optional end date for completed shifts
    report TEXT, -- Report detailing major tasks during the shift
    created_at TIMESTAMP DEFAULT NOW()
);

-- Triggers and Functions to enforce restrictions and automate shifts

-- Trigger function to enforce team-level restrictions for shift requests
CREATE OR REPLACE FUNCTION enforce_team_restriction()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT team_id FROM Employees WHERE id = NEW.created_by) 
        != (SELECT team_id FROM Employees WHERE id = NEW.employee_id) THEN
        RAISE EXCEPTION 'Shift Manager can only create shift requests for employees in their own team';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for enforcing team restriction
CREATE TRIGGER check_team_match
BEFORE INSERT ON Shift_Requests
FOR EACH ROW EXECUTE FUNCTION enforce_team_restriction();

-- Trigger function to enforce department-level restrictions for department heads
CREATE OR REPLACE FUNCTION enforce_department_restriction()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT department_id FROM Employees WHERE id = NEW.reviewed_by) 
        != (SELECT department_id FROM Employees WHERE id = NEW.employee_id) THEN
        RAISE EXCEPTION 'Department Head can only review shift requests for employees in their own department';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for enforcing department restriction
CREATE TRIGGER check_department_match
BEFORE UPDATE ON Shift_Requests
FOR EACH ROW WHEN (NEW.status = 'approved')
EXECUTE FUNCTION enforce_department_restriction();

-- Trigger function to automatically create an "ongoing" shift when a shift request is approved
CREATE OR REPLACE FUNCTION create_ongoing_shift()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'approved' THEN
        INSERT INTO Shifts (shift_request_id, employee_id, status, start_date, created_at)
        VALUES (NEW.id, NEW.employee_id, 'ongoing', NEW.shift_date, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-creating "ongoing" shift on shift request approval
CREATE TRIGGER add_ongoing_shift
AFTER UPDATE ON Shift_Requests
FOR EACH ROW EXECUTE FUNCTION create_ongoing_shift();

-- Insert Roles with updated permissions
INSERT INTO Roles (name, permissions)
VALUES 
    ('IT Admin', '{"can_create_employee": true, "can_manage_departments": true, "can_assign_department_head": true, "can_control_all": true}'),
    ('Department Head', '{"can_assign_shift_manager": true, "can_manage_teams": true, "can_review_shifts": true}'),
    ('Shift Manager', '{"can_create_shift_request": true, "can_view_ongoing_shifts": true, "can_verify_shifts": true}'),
    ('Employee', '{"can_view_completed_shifts": true}');
