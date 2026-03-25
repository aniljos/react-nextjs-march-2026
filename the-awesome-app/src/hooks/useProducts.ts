import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";

export function useProducts(){

    const [products, setProducts] = useState<Product[]>([]);
    const url = "http://localhost:9000/products";
    const controller = new AbortController()
   
    async function fetchProducts() {

    try {
      const response = await axios.get<Product[]>(url, {signal: controller.signal});
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

   useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchProducts();

      return () => {
        controller.abort()
      }
  }, []);

    return {products, setProducts, fetchProducts};
}