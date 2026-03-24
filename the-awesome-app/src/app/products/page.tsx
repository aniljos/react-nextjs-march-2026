"use client";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from './products.module.css';
import { useRouter } from "next/navigation";

const url = "http://localhost:9000/products";

export default function ListProducts() {

  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  async function fetchProducts() {

    try {
      const response = await axios.get<Product[]>(url);
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(product: Product){

    const deleteUrl = url + "/" + product.id;
    try {
      
      await axios.delete(deleteUrl);
      //await fetchProducts()
      //copy of products
      const copy_of_products = [...products];
      const index = copy_of_products.findIndex(item => item.id === product.id);
      copy_of_products.splice(index, 1);
      setProducts(copy_of_products);


    } catch {
      alert("Failed to delete...")
    }
  }
  function editProduct(product: Product){
    router.push("/products/" + product.id);
  }

  return (
    <div>
      <h4>List Products</h4>
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
        {products.map(product => {
            return (
                <div key={product.id} className={styles.product}>
                    <p>Id: {product.id}</p>
                    <p>Name: {product.name}</p>
                    <p>Price: {product.price}</p>
                    <p>Desc: {product.description}</p>
                    <div>
                      <button className="btn btn-warning" onClick={() => {deleteProduct(product)}}>Delete</button>&nbsp;
                      <button className="btn btn-info" onClick={() => editProduct(product)}>Edit</button>
                    </div>
                </div>
            )
        })}

      </div>
    </div>
  );
}
