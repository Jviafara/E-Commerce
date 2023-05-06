import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckOutSteps from '../components/CheckOutSteps';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(
                'api/users/login',
                {
                    email,
                    password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                alert('User Login successfully');
                ctxDispatch({
                    type: 'USER_SIGNIN',
                    payload: res.data,
                });
                localStorage.setItem('userInfo', JSON.stringify(res.data));
                if (res.status === 201) {
                    navigate(0);
                    navigate('/');
                }
            })
            .catch((err) => {
                alert(err.response.data.msg);
            });
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    return (
        <div className="flex flex-col sm:items-center">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <CheckOutSteps step1 />
            <div className="w-full md:w-3/5 lg:w-4/7 xl:w-3/6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-left font-semibold my-2 lg:my-8">
                    Sign In
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-3/5 lg:w-4/7 xl:w-3/6 h-auto">
                <div className="flex flex-col items-start text-2xl">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="my-1 md:my-2 lg:my-4 border border-gray-400 rounded-lg px-2 w-full h-12"
                    />
                </div>
                <div className="flex flex-col items-start text-2xl">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 mt-1 border border-gray-400 rounded-lg px-2 w-full h-12"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="rounded-lg border border-blue-500 hover:bg-blue-500 bg-[#ffc000] p-3 
                         text-black font-medium font-serif text-xl">
                        Sign In
                    </button>
                </div>
                <p className="mt-2 text-lg font-bold">
                    Dont have an Account?{' '}
                    <Link to={'/signup'} className="underline text-blue-600">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signin;
