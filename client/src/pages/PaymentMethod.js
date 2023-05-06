import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckOutSteps from '../components/CheckOutSteps';

const PaymentMethod = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        userInfo,
        cart: { shippingAddress, paymentMethod },
    } = state;

    const [paymentMethodName, setPaymentMethodName] = useState(
        paymentMethod || 'PayPal'
    );

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shippingAddress');
        } else if (!userInfo) {
            navigate('/signin');
        }
    }, [shippingAddress, userInfo, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_PAYMENT_METHOD',
            payload: paymentMethodName,
        });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/place-order');
    };

    return (
        <div className="flex flex-col items-center">
            <Helmet>
                <title>Payment Methods</title>
            </Helmet>
            <CheckOutSteps step1 step2 step3 />
            <div className="w-full md:w-3/5 lg:w-4/7 xl:w-3/6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-left font-semibold my-2 lg:my-8">
                    Payment Methods
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-3/5 lg:w-4/7 xl:w-3/6">
                <div className="flex text-2xl mb-4 gap-2">
                    <input
                        type="checkbox"
                        name="paypal"
                        id="paypal"
                        value="PayPal"
                        checked={paymentMethodName === 'PayPal'}
                        onChange={(e) => setPaymentMethodName(e.target.value)}
                        className="border rounded-lg bg-gray-50 p-3"
                    />
                    <label htmlFor="paypal" className="my-2">
                        PayPal
                    </label>
                </div>
                <div className="flex text-2xl mb-4 gap-2">
                    <input
                        type="checkbox"
                        name="stripe"
                        id="stripe"
                        value="Stripe"
                        checked={paymentMethodName === 'Stripe'}
                        onChange={(e) => setPaymentMethodName(e.target.value)}
                        className="border rounded-lg bg-gray-50 p-3"
                    />
                    <label htmlFor="stripe" className="my-2">
                        Stripe
                    </label>
                </div>
                <button
                    type="submit"
                    className="rounded-lg border border-blue-500 hover:bg-blue-500 bg-[#ffc000] py-3 px-4 
                         text-black font-medium font-serif text-2xl">
                    Countinue
                </button>
            </form>
        </div>
    );
};

export default PaymentMethod;
