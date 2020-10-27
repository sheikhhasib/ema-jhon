import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    document.title = "Shop More"
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState([]);
    const [cart, setCart] = useState('');

    useEffect(() => {
        fetch('https://shrouded-scrubland-16377.herokuapp.com/products?search='+search)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, [search])
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://shrouded-scrubland-16377.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                setCart(data)
            })

    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                <input type="text" onBlur={handleSearch} className="product-container" placeholder="search products"/>
                {
                    products.length === 0 && <div className="container">
                        <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                            <circle cx="170" cy="170" r="160" stroke="#E2007C" />
                            <circle cx="170" cy="170" r="135" stroke="#404041" />
                            <circle cx="170" cy="170" r="110" stroke="#E2007C" />
                            <circle cx="170" cy="170" r="85" stroke="#404041" />
                        </svg>
                    </div>
                }
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;