import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {email, username, password} = await request.json();
    // Validate email/username and password
    console.log({email, username, password});
  } catch(e) {
    console.log({e});
  }

  return NextResponse.json({message: "SUCCESS"});
}
