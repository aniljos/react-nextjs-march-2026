import path from "path";
import fs from 'fs/promises';
import { NextResponse } from "next/server";

type Supplier = {
    id: number;
    name: string;
    contactPerson: string;
    email: string;
    location: string;
}

export async function GET(request:Request){

    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    //connect to the DB, invvoke and endpoint, any sever code
     const filepath = path.join(process.cwd(), "data", "suppliers.json");
     const fileContent = await fs.readFile(filepath, 'utf-8');
     const suppliers = JSON.parse(fileContent) as Supplier[];

     if(!query){
        return NextResponse.json(suppliers);
     }
     else{
        const filteredData = suppliers.filter(item => 
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.contactPerson.toLowerCase().includes(query.toLowerCase()) ||
                item.email.toLowerCase().includes(query.toLowerCase()) ||
                item.location.toLowerCase().includes(query.toLowerCase()));
        return NextResponse.json(filteredData);      
     }
     
}