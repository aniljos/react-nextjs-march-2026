import { NextResponse } from "next/server";

// GET http://localhost:3000/api/hello
export function GET(){
    return NextResponse.json({message: "Hello route handler..."})
}