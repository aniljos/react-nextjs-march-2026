"use client";

import { sayHello } from "@/actions/hello";
import { JSX, useEffect, useState } from "react";

type SearchSuppliersActionsProps = {
    suppliers : (q: string) => Promise<JSX.Element> 
}

export default function SearchSuppliersActions({suppliers}: SearchSuppliersActionsProps) {

  const [searchText, setSearchText] = useState("");
  const [messageView, setMessageView] = useState<JSX.Element>();
  const [supplierView, setSupplierView] = useState<JSX.Element>();


  async function search() {
        const result = await sayHello(searchText);
        setMessageView(result);
        const suppliersJSX = await suppliers(searchText);
        setSupplierView(suppliersJSX);
  }
  useEffect(() => {
    
    async function getSuppliers(){
        const suppliersJSX = await suppliers("");
        setSupplierView(suppliersJSX);
    }
    getSuppliers();
  }, [])

  return (
    <div>
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <br />
      <button className="btn btn-success" onClick={search}>
        Search
      </button>
      {searchText ? (
        <div className="alert alert-info">Searching for {searchText}</div>
      ) : null}
      <div>{messageView}</div>

      <div>{supplierView}</div>
    </div>
  );
}