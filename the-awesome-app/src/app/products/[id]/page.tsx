"use client";

import { Product } from "@/models/Product";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



const url = "http://localhost:9000/products";
export default function EditProduct() {
  const [product, setProduct] = useState(new Product(0, "", 0, ""));
  const params = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get<Product>(url + "/" + params.id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
  }, []);

  return (
    <div>
      <h4>Edit Product: {params.id}</h4>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            value={product.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="number"
            id="price"
            value={product.price}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input
            className="form-control"
            type="text"
            id="desc"
            value={product.description}
          />
        </div>
        <br />
        <div>
          <button className="btn btn-warning">Cancel</button>&nbsp;
          <button className="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  );
}
