import useSelectedSchool from "@/hooks/useSelectedSchool";
import { createClient } from "@supabase/supabase-js";

type CsvRow = {
  schoollevel: string,
  gradelevel: string,
  classroom: string,
  studentid: string,
  gender: string,
  ethnicity: string,
  ell: string,
  odr_f: string,
  susp_f: string,
  math_f: string,
  read_f: string,
  mysaebrs_emo: string,
  mysaebrs_soc: string,
  mysaebrs_aca: string,
  saebrs_emo: string,
  saebrs_soc: string,
  saebrs_aca:string
}

const supabaseUrl = 'https://kalbwmivszjzlnepcebm.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export async function uploadAndCopyCSV(tableName: string, data: any) {

  console.log({data})

  // Step 1: Create Table
  const { error: createError } = await supabase.rpc('create_school_data_table', {
    _table_name: tableName
  });

  if (createError) {
    console.error('Error creating table:', createError);
    return;
  }

  // Step 2: Insert Data
  const { error: insertError } = await supabase
    .from(tableName)
    .insert(data);

  if (insertError) {
    console.error('Error inserting data:', insertError);
    return;
  }

  console.log('Data uploaded successfully!');
}

