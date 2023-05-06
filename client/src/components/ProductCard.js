import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Ratings from './Ratings';

const ProductCard = (data) => {
    const product = data.product;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Product out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
    };

    return (
        <div className="border border-[#404040] my-4 mx-0 md:m-4 w-full sm:w-auto">
            <Link to={`/product/slug/${product.slug}`}>
                <img
                    className="w-full md:max-w-[200px] xl:max-w-[300px] "
                    src={product.images}
                    alt={product.name}
                />
            </Link>
            <div className="p-4">
                <Link to={`/product/slug/${product.slug}`}>
                    <p>{product.name}</p>
                </Link>
                <Ratings
                    rating={product.rating}
                    numReviews={product.numReviews}
                />
                <p>
                    <strong>${product.price}</strong>
                </p>
                {product.countInStock === 0 ? (
                    <button
                        onClick={addToCartHandler}
                        type="button"
                        disabled
                        className="rounded-lg border bg-gray-300 mt-2 p-2 w-full text-gray-500 font-bold text-lg">
                        Out of Stock
                    </button>
                ) : (
                    <button
                        onClick={addToCartHandler}
                        type="button"
                        className="rounded-lg border border-blue-500 hover:bg-blue-500 bg-[#ffc000] mt-2 p-2 w-full text-white font-bold text-lg">
                        Add to Car
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
