// pages/api/getShiftStats.js
import { supabase } from '@/utils/connect'

export default async function handler(req,res) {
    const { employeeId } = req.query;

    if (!employeeId) {
        return res.status(400).json({ error: 'Employee ID is required' });
    }

    const { data: completedShifts,error: shiftError } = await supabase
        .from('Shifts')
        .select('id')
        .eq('employee_id',employeeId)
        .eq('status','completed');

    if (shiftError) {
        return res.status(500).json({ error: shiftError.message });
    }

    // Calculate overtime shifts
    const { data: overtimeShifts,error: overtimeError } = await supabase
        .from('Shift_Requests')
        .select('id')
        .eq('employee_id',employeeId)
        .eq('shift_type','night');

    if (overtimeError) {
        return res.status(500).json({ error: overtimeError.message });
    }

    res.status(200).json({
        completedShiftsCount: completedShifts.length,
        overtimeShiftsCount: overtimeShifts.length,
    });
}
