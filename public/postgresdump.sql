-- Create Departments table
CREATE TABLE Departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Employees table
CREATE TABLE Employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department_id INT REFERENCES Departments(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Roles table (optional for role-based access control)
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    permissions JSONB -- Permissions can be a JSON object defining access control
);

-- Link Roles to Employees for more explicit role-based access control
ALTER TABLE Employees
ADD COLUMN role_id INT REFERENCES Roles(id) ON DELETE SET NULL;

-- Create Shifts table
CREATE TABLE Shifts (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(id) ON DELETE CASCADE,
    assigned_by INT REFERENCES Employees(id) ON DELETE SET NULL,
    shift_type VARCHAR(50) CHECK (shift_type IN ('overtime', 'night')),
    status VARCHAR(50) CHECK (status IN ('pending', 'accepted', 'completed', 'failed', 'rejected')),
    shift_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Shift_Requests table
CREATE TABLE Shift_Requests (
    id SERIAL PRIMARY KEY,
    shift_id INT REFERENCES Shifts(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by INT REFERENCES Employees(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP
);

-- Example permission for Roles (optional if JSON permissions are needed)
INSERT INTO Roles (name, permissions)
VALUES 
    ('HR Head', '{"can_create_employee": true, "can_assign_department_head": true, "can_manage_departments": true}'),
    ('Department Head', '{"can_assign_shift_manager": true, "can_review_shifts": true}'),
    ('Shift Manager', '{"can_create_shift": true, "can_assign_shift": true}'),
    ('Employee', '{"can_view_shift": true}');
