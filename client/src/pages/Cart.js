import axios from 'axios';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaMinusCircle, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const Cart = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Product out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };

    const removeItem = async (item) => {
        ctxDispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item,
        });
        console.log(cartItems);
    };

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shippingAddress');
        } else {
            navigate('/signin');
        }
    };

    return (
        <div>
            <Helmet>
                <title>Shipping Cart</title>
            </Helmet>
            <h1 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">
                Shipping Cart
            </h1>
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
                {cartItems.length === 0 ? (
                    <div className="w-full rounded-lg h-fit bg-cyan-100 p-6">
                        <p className="text-2xl text-cente line text-blue-900">
                            Cart Is Empty.{'  '}
                            <Link to="/" className="underline text-blue-700">
                                Go Shopping
                            </Link>
                        </p>
                    </div>
                ) : (
                    <ul className=" flex flex-col w-full border rounded-lg ">
                        {cartItems.map((item) => (
                            <div
                                key={item.slug}
                                className="border-b last-of-type:border-none h-full">
                                <li className="flex flex-col md:flex-row  items-center gap-4 p-4">
                                    <div className="flex-grow">
                                        <Link to={`/product/slug/${item.slug}`}>
                                            <img
                                                src={item.images}
                                                alt={item.name}
                                                className=" max-w-full min-w-[96px] h-24 "
                                            />
                                        </Link>
                                    </div>
                                    <div className="text-xl text-center font-bold flex-grow-3 w-full">
                                        <Link to={`/product/slug/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 lg:flex-row w-full px-4">
                                        <div className="flex justify-center gap-2 text-2xl flex-grow w-[135px]">
                                            <button
                                                onClick={() =>
                                                    updateCartHandler(
                                                        item,
                                                        item.quantity - 1
                                                    )
                                                }
                                                type="button"
                                                disabled={item.quantity === 1}>
                                                {item.quantity === 1 ? (
                                                    <FaMinusCircle
                                                        color="#AAAAAA"
                                                        size={24}
                                                    />
                                                ) : (
                                                    <FaMinusCircle size={24} />
                                                )}
                                            </button>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <button
                                                onClick={() =>
                                                    updateCartHandler(
                                                        item,
                                                        item.quantity + 1
                                                    )
                                                }
                                                type="button"
                                                disabled={
                                                    item.quantity ===
                                                    item.countInStock
                                                }>
                                                {item.quantity ===
                                                item.countInStock ? (
                                                    <FaPlusCircle
                                                        color="#AAAAAA"
                                                        size={24}
                                                    />
                                                ) : (
                                                    <FaPlusCircle size={24} />
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex-grow w-full text-center">
                                            <p className="text-xl font-bold">
                                                ${item.price}
                                            </p>
                                        </div>
                                        <div className="flex-grow">
                                            <button
                                                onClick={() => removeItem(item)}
                                                type="button">
                                                <FaTrash size={32} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                )}
                <div className="flex-shrink-0 w-auto h-fit mx-4 p-6 border rounded-lg">
                    <h1 className="text-2xl font-bold">
                        SubTotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
                    </h1>
                    <p className="text-2xl font-bold">
                        $
                        {cartItems.reduce(
                            (a, c) => a + c.quantity * c.price,
                            0
                        )}
                    </p>
                    <hr className="my-4" />
                    {cartItems.length === 0 ? (
                        <button
                            onClick={checkoutHandler}
                            type="button"
                            disabled
                            className="rounded-lg borde bg-gray-300 p-2 w-full text-gray-500 font-bold text-lg">
                            Checkout
                        </button>
                    ) : (
                        <button
                            onClick={checkoutHandler}
                            type="button"
                            className="rounded-lg border border-blue-500 hover:bg-blue-600 bg-[#ffc000] p-2 w-full text-white font-bold text-lg">
                            Checkout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
