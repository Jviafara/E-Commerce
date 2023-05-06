import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckOutSteps from '../components/CheckOutSteps';
import { getError } from '../utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };

        case 'CREATE_SUCCESS':
            return { ...state, loading: false };

        case 'CREATE_FAIL':
            return { ...state, loading: false };

        default:
            return state;
    }
};

const PlaceOrder = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [{ loading, error }, dispatch] = useReducer(reducer, {
        loading: false,
        error: '',
    });
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo, cart } = state;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' });
            const result = await axios.post(
                '/api/orders/create',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            const order = result.data.order;
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${order._id}`);
        } catch (error) {
            dispatch({ type: 'CREATE_FAIL' });
            alert(getError(error));
        }
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment-methods');
        }
    }, [cart, navigate]);

    return (
        <div>
            <Helmet>
                <title>Order Preview</title>
            </Helmet>
            <CheckOutSteps step1 step2 step3 step4 />
            <div className="w-full md:w-3/5 lg:w-4/7 xl:w-3/6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-left font-semibold my-2 lg:my-8">
                    Order Preview
                </h1>
            </div>
            <div className="flex gap-8 justify-between">
                <section className="max-w-2/3 shrink-0 flex flex-col gap-4 ">
                    <div
                        class="flex flex-col gap-3 p-6 bg-white border border-gray-200 rounded-lg shadow
                 dark:border-gray-300">
                        <h1 className="text-2xl font-medium ">Shipping</h1>
                        <div>
                            <p className="text-lg">
                                <strong>Name:</strong> {userInfo.user.name}
                            </p>
                            <p>
                                <strong>Address:</strong>{' '}
                                {cart.shippingAddress.address}
                            </p>
                        </div>
                        <Link
                            to={'/shippingAddress'}
                            className="underline text-blue-600 text-lg mt-2 ">
                            Edit
                        </Link>
                    </div>
                    <div
                        class="flex flex-col gap-3 p-6 bg-white border border-gray-200 rounded-lg shadow
                 dark:border-gray-300">
                        <h1 className="text-2xl font-medium ">Payment</h1>
                        <div>
                            <p className="text-lg">
                                <strong>Method:</strong> {cart.paymentMethod}
                            </p>
                        </div>
                        <Link
                            to={'/payment-methods'}
                            className="underline text-blue-600 text-lg mt-2 ">
                            Edit
                        </Link>
                    </div>
                    <div
                        class="flex flex-col gap-3 p-6 bg-white border border-gray-200 rounded-lg shadow
                 dark:border-gray-300">
                        <h1 className="text-2xl font-medium ">Items</h1>
                        <div className="w-full">
                            {cart.cartItems.length === 0 ? (
                                <div className="w-full rounded-lg h-fit bg-cyan-100 p-6">
                                    <p className="text-2xl text-cente line text-blue-900">
                                        Cart Is Empty.{'  '}
                                        <Link
                                            to="/"
                                            className="underline text-blue-700">
                                            Go Shopping
                                        </Link>
                                    </p>
                                </div>
                            ) : (
                                <ul className=" flex flex-col w-full border rounded-lg ">
                                    {cart.cartItems.map((item) => (
                                        <div className="border-b last-of-type:border-none h-full">
                                            <li className="flex flex-col md:flex-row  items-center gap-4 p-4">
                                                <div className="flex-grow">
                                                    <Link
                                                        to={`/product/slug/${item.slug}`}>
                                                        <img
                                                            src={item.images}
                                                            alt={item.name}
                                                            className=" max-w-full min-w-[96px] h-24 "
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="text-xl text-center font-bold flex-grow-3 w-full">
                                                    <Link
                                                        to={`/product/slug/${item.slug}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <div className="flex flex-col items-center gap-2 lg:flex-row w-full px-4">
                                                    <div className="flex justify-center gap-2 text-2xl flex-grow w-[135px]">
                                                        <span>
                                                            {item.quantity}
                                                        </span>{' '}
                                                    </div>
                                                    <div className="flex-grow w-full text-center">
                                                        <p className="text-xl font-bold">
                                                            ${item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Link
                            to={'/cart'}
                            className="underline text-blue-600 text-lg mt-2 ">
                            Edit
                        </Link>
                    </div>
                </section>
                <section className="max-w-1/3 grow-0 w-full">
                    <div
                        className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow
                 dark:border-gray-300">
                        <h1 className="text-2xl font-medium mb-2">
                            Order Summary
                        </h1>
                        <div className="flex justify-start px-4 text-2xl">
                            <div className="w-2/3">
                                <p>Items</p>
                            </div>
                            <p>${cart.itemsPrice}</p>
                        </div>
                        <hr />
                        <div className="flex justify-start px-4 text-2xl">
                            <div className="w-2/3">
                                <p>Shipping</p>
                            </div>
                            <p>${cart.shippingPrice}</p>
                        </div>
                        <hr />
                        <div className="flex justify-start px-4 text-2xl font-bold">
                            <div className="w-2/3">
                                <p>Order Total</p>
                            </div>
                            <p>${cart.totalPrice}</p>
                        </div>
                        <hr />
                        <button
                            onClick={placeOrderHandler}
                            type="button"
                            className="rounded-lg border border-blue-500 hover:bg-blue-600 bg-[#ffc000] p-2 w-full text-white font-bold text-lg">
                            Place Order
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PlaceOrder;
