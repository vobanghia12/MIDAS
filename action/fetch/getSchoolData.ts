/**
 * Endpoints for school data tables.
 * Fetching data from loaded JSON data will be prioritized before making API calls to the database.
 * 
 * @since 2024-07-14
 */

import { createClient } from "@supabase/supabase-js";
import { Student } from "@/types/student";

const supabaseUrl = 'https://kalbwmivszjzlnepcebm.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

/**
 * Get distinct grade levels in a provided array of Students.
 * @param students Array of Student objects
 * @returns Array of distinct grades (string) E.g. ["6", "7", "8"]
 */
export const getDistinctGradeLevels = (students: Student[]): string[] => {
  const gradeLevels = students.map(student => student.gradelevel);
  const distinctGradeLevels = Array.from(new Set(gradeLevels));
  return distinctGradeLevels;
};

/**
 * Get distinct classroom IDs in a provided array of Students.
 * @param students Array of Student objects
 * @returns Array of distinct classroom IDs (string) E.g. ["A", "B", "C"]
 */
export const getDistinctClassroomIds = (students: Student[]): string[] => {
  const classroomIds = students.map(student => student.classroom);
  const distinctclassroomIds = Array.from(new Set(classroomIds));
  return distinctclassroomIds;
};


/**
 * Get all student IDs from provided array of Students
 * @param students Array of Student objects
 * @returns Array of student IDs (string)
 */
export const getStudentIds = (students: Student[]): string[] => {
  const studentIds = students.map(student => student.studentid);
  return studentIds;
};


