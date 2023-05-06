import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };

        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };

        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
};

const OrderHistory = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [{ loading, orders, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        orders: [],
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    useEffect(() => {
        const fetchOrders = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get('/api/orders/fetch-orders', {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                });
                //console.log(res.data.orders);
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data.orders });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
                navigate('/');
            }
        };
        fetchOrders();
    }, [userInfo, navigate]);

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <h1 className="text-4xl font-bold">Order History</h1>
            <div className="flex flex-wrap justify-center mt-8">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox>{error}</MessageBox>
                ) : orders.length === 0 ? (
                    <MessageBox>
                        Dont Have Any Orders Yet.{' '}
                        <Link to={'/'} className="underline text-blue-600">
                            Go Shoping
                        </Link>
                    </MessageBox>
                ) : (
                    <table className="w-full text-sm text-left text-black ">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th className="px-6 py-3" scope="col">
                                    ID
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    DATE
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    TOTAL
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    PAID
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    DELIVERED
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="bg-white border-b">
                                    <th className="px-6 py-3" scope="row">
                                        {order._id}
                                    </th>
                                    <td className="px-6 py-3">
                                        {order.createdAt.substring(0, 10)}
                                    </td>
                                    <td className="px-6 py-3">
                                        ${order.totalPrice}
                                    </td>
                                    {order.isPaid ? (
                                        <td className="px-6 py-3">
                                            <p
                                                className="border border-green-300 rounded-lg shadow-sm shadow-green-300
                                                 bg-green-200 p-1 font-bold text-green-800 mt-2">
                                                Order Paid
                                            </p>
                                        </td>
                                    ) : (
                                        <td className="px-6 py-3">
                                            <p
                                                className="border border-red-300 rounded-lg shadow-sm shadow-red-300
                                                 bg-red-200 p-1 font-bold text-red-800 mt-2">
                                                Waiting Payment
                                            </p>
                                        </td>
                                    )}
                                    {order.isDelivered ? (
                                        <td className="px-6 py-3">
                                            <p
                                                className="border border-green-300 rounded-lg shadow-sm shadow-green-300 
                                                bg-green-200 p-1 font-bold text-green-800 mt-2">
                                                Order Delivered
                                            </p>
                                        </td>
                                    ) : (
                                        <td className="px-6 py-3">
                                            <p
                                                className="border border-red-300 rounded-lg shadow-sm shadow-red-300 
                                                bg-red-200 p-1 font-bold text-red-800 mt-2">
                                                Not Delivered
                                            </p>
                                        </td>
                                    )}
                                    <td className="px-6 py-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(`/order/${order._id}`)
                                            }
                                            className="rounded-lg border border-blue-500 hover:bg-blue-500 bg-[#ffc000]
                                             p-1 w-full text-white font-bold text-sm">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
