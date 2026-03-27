'use server'

import { Supplier } from "@/models/Supplier";
import path from "path";
import fs from 'fs/promises';
import { redirect } from "next/navigation";

//export async function formSubmit(form: FormData){
export async function formSubmit(prevStatus:object,  form: FormData){

    const id = form.get("id")?.toString();
    const name = form.get("name")?.toString();
    const contactPerson = form.get("contactPerson")?.toString();
    const email = form.get("email")?.toString();
    const location = form.get("location")?.toString();

    const supplier: Supplier = {
        id: Number(id), 
        name: name ? name : "", 
        location: location? location: "", 
        contactPerson: contactPerson? contactPerson: "", 
        email: email? email: ""
    }

    if(supplier.id < 100){
        return {status: -1, message: "error"};
    }

    const filepath = path.join(process.cwd(), "data", "suppliers.json");
    const fileContent = await fs.readFile(filepath, 'utf-8');
    const suppliers = JSON.parse(fileContent) as Supplier[];
    suppliers.push(supplier);

    await fs.writeFile(filepath, JSON.stringify(suppliers, null, 2), 'utf-8');

    console.log("saved suppiler to server");

    redirect("/suppliers")

    return {status: 1, message: "completed"};
}