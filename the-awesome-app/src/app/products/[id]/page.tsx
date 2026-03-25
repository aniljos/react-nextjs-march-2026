"use client";

import { Product } from "@/models/Product";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";



const url = "http://localhost:9000/products";
export default function EditProduct() {

  const [product, setProduct] = useState(new Product(0, "", 0, ""));
  const params = useParams();
  const router = useRouter();

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

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>){

    // const value = evt.target.value;
    // const copy = {...product};
    // copy.name = value;
    // setProduct(copy);

    setProduct({...product, name: evt.target.value});

  }

  function handleCancel(evt: MouseEvent<HTMLButtonElement>){
    evt.preventDefault();
    router.back();
  }

   async function handleSave(evt: MouseEvent<HTMLButtonElement>){
    evt.preventDefault();

    try {
      await axios.put(url + "/" + product.id, product);
      router.back();
    } catch (error) {
      console.log(error);
      alert("Failed to save");
    }


    
  }

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
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="number"
            id="price"
            value={product.price}
            onChange={evt => setProduct({...product, price: evt.target.valueAsNumber})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input
            className="form-control"
            type="text"
            id="desc"
            value={product.description}
            onChange={evt => setProduct({...product, description: evt.target.value})}
          />
        </div>
        <br />
        <div>
          <button className="btn btn-warning" onClick={handleCancel}>Cancel</button>&nbsp;
          <button className="btn btn-success" onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
  );
}
