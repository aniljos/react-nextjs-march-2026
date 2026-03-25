"use client";
import { Product } from "@/models/Product";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
//import styles from './products.module.css';
import { useRouter } from "next/navigation";
import { ProductView } from "./ProductView";
import { useTitle } from "@/hooks/useTitle";

const url = "http://localhost:9000/products";

export default function ListProducts() {

  const [products, setProducts] = useState<Product[]>([]);
  const [isMessageVisible, setMessageVisible] = useState(true);
  const router = useRouter();
  useTitle("List Products");

  

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const  deleteProduct = useCallback(async (product: Product)=>{

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
  }, [products])
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const editProduct = useCallback( (product: Product) => {
    router.push("/products/" + product.id);
  }, [])

  const totalPrice = useMemo(function calculateTotalPrice(){
    let total = 0;

    console.log("calculateTotalPrice invoked...")
    products.forEach(product => {
      if(product.price)
        total += product.price;
    })

    return total;
  }, [products])

  return (
    <div>
      <h4>List Products</h4>

      <div>Total Price: {totalPrice}</div>

      { isMessageVisible ? <div>This is a page to demonstrate dat fetching</div>: null}
      <br />
      <button 
        className="btn" 
        onClick={() => setMessageVisible(!isMessageVisible)}>
          {isMessageVisible? "Hide" : "Show"}
      </button>

      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
        {products.map(product => {
            return (
              <ProductView key={product.id} product={product} onDelete={deleteProduct} onEdit={editProduct}/>

                // <div key={product.id} className={styles.product}>
                //     <p>Id: {product.id}</p>
                //     <p>Name: {product.name}</p>
                //     <p>Price: {product.price}</p>
                //     <p>Desc: {product.description}</p>
                //     <div>
                //       <button className="btn btn-warning" onClick={() => {deleteProduct(product)}}>Delete</button>&nbsp;
                //       <button className="btn btn-info" onClick={() => editProduct(product)}>Edit</button>
                //     </div>
                // </div>
            )
        })}

      </div>
    </div>
  );
}
