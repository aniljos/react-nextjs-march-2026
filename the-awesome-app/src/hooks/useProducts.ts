import { Product } from "@/models/Product";
import axios from "axios";
import { config } from "process";
import { useEffect, useState } from "react";

export function useProducts(){

    const [products, setProducts] = useState<Product[]>([]);
    const url = "http://localhost:9000/products";
   
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

    return {products, setProducts, fetchProducts};
}