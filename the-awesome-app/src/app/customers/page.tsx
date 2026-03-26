import { Customer } from "@/models/Customer";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Awesome App: Customers",
  description: "Listing of customers",
  keywords: ["global customers", "tech companies", "fortune 500"]
};

export default async function CustomerListing(){

      //simulate a delay of 3 secs
    await new Promise(resolve => setTimeout(resolve, 3000));
    return (
        <div>
            <h4>Customer Listing</h4>
            <Suspense fallback={<div className="alert alert-danger">Loading Customers #1</div>}>
                <CustomerPage timeout={7000}/>
            </Suspense>
            
            <Suspense fallback={<div className="alert alert-warning">Loading Customers #2</div>}>
                <CustomerPage timeout={9000}/>
            </Suspense>
        </div>
    )

}

export async function CustomerPage({timeout}: {timeout: number}){

    //api call/db call
    //const url = "http://localhost:9000/customers";

      //simulate a delay 
    await new Promise(resolve => setTimeout(resolve, timeout));

    console.log("rendering customers...");
    const url = `${process.env.BASE_URL}/customers`;
    //cache: "no-store" will ensure its an SSR
    const response = await fetch(url, {method: "GET", cache: "no-store"});
    const customers = await response.json() as Customer[];

    return (
        <div>
            <h6>Customers</h6>
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td><Link href={"/customers/" + customer.id}> {customer.name} </Link></td>
                            <td>{customer.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}