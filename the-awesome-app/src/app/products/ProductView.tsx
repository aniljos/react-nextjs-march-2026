//<ProductView product={product}/>

import { Product } from "@/models/Product"
import styles from './products.module.css';
import React from "react";

type ProductViewProps = {
    product: Product;
    onDelete: (product: Product) => void;
    onEdit: (product: Product) => void;
}

export const ProductView: React.FC<ProductViewProps> 
                        = React.memo(function ProductViewFC({product, onDelete, onEdit}) {
    console.log("rendering ProductView: " + product.id);
    return (
        <div key={product.id} className={styles.product}>
            <p>Id: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Desc: {product.description}</p>
            <div>
                <button className="btn btn-warning" onClick={() => {onDelete(product)}}>Delete</button>&nbsp;
                <button className="btn btn-info" onClick={() => onEdit(product)}>Edit</button>
            </div>
    </div>
    )

})