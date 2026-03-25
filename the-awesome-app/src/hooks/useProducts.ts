import { Product } from "@/models/Product";
import { AppState } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useProducts(){

    const [products, setProducts] = useState<Product[]>([]);
    //const url = "http://localhost:9000/products";
    const url = "http://localhost:9000/secure_products";
    const controller = new AbortController()
    const auth = useSelector((state: AppState) => state.auth);
    const router = useRouter();

    async function fetchProducts() {

      if(!auth.isAuthenticated){
        router.push("/login");
        return;
      }

      try {
        const headers = {"Authorization" : `Bearer ${auth.accessToken}`}
        const response = await axios.get<Product[]>(url, {signal: controller.signal, headers});
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