import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckOutSteps from '../components/CheckOutSteps';

const ShippingAddress = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    const [name, setName] = useState(shippingAddress.name || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(
        shippingAddress.postalCode || ''
    );
    const [country, setCountry] = useState(shippingAddress.country || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { name, address, city, postalCode, country },
        });
        const direccion = { name, address, city, postalCode, country };
        localStorage.setItem('shippingAddress', JSON.stringify(direccion));
        navigate('/payment-methods');
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo, navigate]);

    return (
        <div className="flex flex-col items-center">
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckOutSteps step1 step2 />
            <div className="w-full max-w-2xl p-4">
                <h1 className="text-2xl lg:text-4xl  xl:text-6xl font-medium mb-6">
                    Shipping Address
                </h1>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex flex-col text-2xl mb-4">
                        <label htmlFor="name" className="my-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-lg bg-gray-50 p-3"
                        />
                    </div>
                    <div className="flex flex-col text-2xl mb-4">
                        <label htmlFor="address" className="my-2">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border rounded-lg bg-gray-50 p-3"
                        />
                    </div>
                    <div className="flex flex-col text-2xl mb-4">
                        <label htmlFor="city" className="my-2">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border rounded-lg bg-gray-50 p-3"
                        />
                    </div>
                    <div className="flex flex-col text-2xl mb-4">
                        <label htmlFor="postalCode" className="my-2">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="border rounded-lg bg-gray-50 p-3"
                        />
                    </div>
                    <div className="flex flex-col text-2xl mb-4">
                        <label htmlFor="country" className="my-2">
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="border rounded-lg bg-gray-50 p-3"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-lg border border-blue-500 hover:bg-blue-500 bg-[#ffc000] py-3 px-4 
                         text-black font-medium font-serif text-2xl">
                        Countinue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingAddress;
