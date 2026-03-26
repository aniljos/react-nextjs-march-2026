"use client";

import { useState } from "react";


export default function SearchSuppliersActions() {
  const [searchText, setSearchText] = useState("");

  async function search() {



  }
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
      <div></div>
    </div>
  );
}
