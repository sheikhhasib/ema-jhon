import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    const [loading,setLoading] = useState(true);
    document.title = "Product Details"
    useEffect(() => {
        fetch('https://shrouded-scrubland-16377.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
            setLoading(false);
        })
    },[productKey])
    
    return (
        <div>
            <h1>Your Product Details.</h1>
            {
                loading ? <p>loading...</p> : <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;