import SearchSuppliers from "./SearchSuppliers";

export default async function SuppliersPage(){

    async function fetchSuppliers(query?: string){

        const response = await fetch("http://localhost:3000/api/suppliers?q=" + query);
        const suppliers = await response.json();
        return suppliers;
    }
    const suppliers = await fetchSuppliers("");
    return (
        <div>
            <h4>Supplier Listings</h4>
            <SearchSuppliers data={suppliers}/>
        </div>
    )


}