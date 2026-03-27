import { Supplier } from "@/models/Supplier";
import SearchSuppliers from "./SearchSuppliers";
import SearchSuppliersActions from "./SearchSuppliersAction";
import Link from "next/link";

export default async function SuppliersPage() {
  // async function fetchSuppliers(query?: string){

  //     const response = await fetch("http://localhost:3000/api/suppliers?q=" + query);
  //     const suppliers = await response.json();
  //     return suppliers;
  // }
  // const suppliers = await fetchSuppliers("");

  async function fetchSuppliersAsync(query?: string) {

    'use server'
    const response = await fetch(
      "http://localhost:3000/api/suppliers?q=" + query,
    );
    const suppliers = await response.json() as Supplier[];
    return (
          <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Person</th>
                        <th>Location</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.contactPerson}</td>
                            <td>{supplier.location}</td>
                            <td>{supplier.email}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
    );
  }

  return (
    <div>
      <h4>Supplier Listings</h4>

      <Link href="/suppliers/add">Add New Supplier</Link>  

      {/* <SearchSuppliers data={suppliers}/> */}
      <SearchSuppliersActions suppliers={fetchSuppliersAsync}/>
    </div>
  );
}
