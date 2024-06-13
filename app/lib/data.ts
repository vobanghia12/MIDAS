import { sql } from '@vercel/postgres';
import {
  Student,
  SchoolField
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchStudents(schoolName: string) {
  noStore();

  try {
    const data = await sql`SELECT COUNT(id) FROM students WHERE school=${schoolName}`;

    return data.rows[0].count;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch student data');
  }
}

export async function fetchMySaebrsData() {
  noStore();

  try {
    // const data = await sql<Student>`SELECT COUNT(*) FROM students WHERE saebrs_emo='high';`;
    const emoHigh = await sql`SELECT COUNT(*) FROM students WHERE mysaebrs_emo = 'high'`;
    const socHigh = await sql`SELECT COUNT(*) FROM students WHERE mysaebrs_soc = 'high'`;
    const acaHigh = await sql`SELECT COUNT(*) FROM students WHERE mysaebrs_aca = 'high'`;
    
    const emo = Number(emoHigh.rows[0].count);
    const soc = Number(socHigh.rows[0].count);
    const aca = Number(acaHigh.rows[0].count);

    return {
      emo,
      soc,
      aca
    };
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch student data');
  }
}

export async function fetchSchools() {
  try {
    const data = await sql<SchoolField>`
      SELECT
        id,
        school AS name
      FROM students
      ORDER BY school ASC
    `;

    const schools = data.rows;
    console.log(schools);
    return schools;
  } catch (err) {
    console.error('Database error: ', err);
    throw new Error('Failed to fetch all schools');
  }
}


// const invoices = await sql<InvoicesTable>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

