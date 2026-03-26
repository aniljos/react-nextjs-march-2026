import { Customer } from "@/models/Customer";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Awesome App: Customers",
  description: "Listing of customers",
  keywords: ["global customers", "tech companies", "fortune 500"]
};


export default async function CustomerPage(){

    //api call/db call
    //const url = "http://localhost:9000/customers";
    const url = `${process.env.BASE_URL}/customers`;
    const response = await fetch(url, {method: "GET"});
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
                            <td>{customer.name}</td>
                            <td>{customer.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}