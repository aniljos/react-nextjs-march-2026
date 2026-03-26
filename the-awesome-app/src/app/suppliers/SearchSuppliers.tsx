'use client'
import { Supplier } from "@/models/Supplier"
import axios from "axios";
import { use, useState } from "react";

type SearchSuppliersProps={
    data: Supplier[]
}

export default function SearchSuppliers({data}: SearchSuppliersProps){

    const [searchText, setSearchText] = useState("")
    const [suppliers, setSuppliers] = useState(data);
    async function search(){
        try {
            const url = "http://localhost:3000/api/suppliers?q=" + searchText;
            const response = await axios.get<Supplier[]>(url);
            setSuppliers(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return(

        <div>
            <input className="form-control" type="search" 
                placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)}/>
            <br />
            <button className="btn btn-success" onClick={search}>Search</button>

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
        </div>
    )
}