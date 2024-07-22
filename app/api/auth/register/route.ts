import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
import useSelectedSchool from "@/hooks/useSelectedSchool";
import { uploadAndCopyCSV } from "../../upload/school-data";

export async function POST(request: Request) {


  const supabaseUrl = 'https://kalbwmivszjzlnepcebm.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey!);

  try {
    const {email, username, password, schoolName} = await request.json();
    // TODO: Validation

    const hashedPassword = await hash(password, 10);

    // Insert new user
    const { data, error } = await supabase
      .rpc('insert_user', {
        _email: email,
        _is_admin: true,
        _name: username,
        _password: hashedPassword,
        _school_id: 0
      })
    if (error) console.error(error)
    else console.log(data)


    // Get school name from school ID of new user
    let { data: schoolNameData, error: schoolNameError } = await supabase
    .rpc('get_school_name_from_username', {
      _username: username
    })
    if (schoolNameError) console.error({schoolNameError})
    else console.log({schoolNameData})


    // Create empty table for that new user's school
    let { data: schoolTable, error: schoolTableError } = await supabase
    .rpc('create_school_data_table', {
      _table_name: schoolName + "_data"
    })
    if (schoolTableError) console.error({schoolTableError})
    else console.log({schoolTable})

    

  } catch(e) {
    console.log({e});
  }

  return NextResponse.json({message: "SUCCESS"});
}
