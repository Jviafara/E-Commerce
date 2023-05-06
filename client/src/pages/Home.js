import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductCard from '../components/ProductCard';
import { getError } from '../utils';
// import data from '../data';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };

        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };

        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
};

const Home = () => {
    const [{ loading, products, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        products: [],
    });

    useEffect(() => {
        const fetchData = async (req, res) => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Helmet>
                <title>E-Commerce</title>
            </Helmet>
            <h1 className="text-4xl font-bold">Features Products</h1>
            <div className="flex flex-wrap justify-center">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox>{error}</MessageBox>
                ) : (
                    products.map((product) => (
                        <ProductCard key={product.slug} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
