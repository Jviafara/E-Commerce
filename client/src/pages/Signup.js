import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(
                'api/users/register',
                {
                    name,
                    email,
                    password,
                    confirmPass,
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
                <title>Sign Up</title>
            </Helmet>
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-3/5 lg:w-4/7 xl:w-3/6 h-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-left font-semibold mb-2 lg:mb-8">
                    Sign Up
                </h1>
                <div className="flex flex-col items-start text-2xl">
                    <label htmlFor="name">Name</label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="my-1 md:my-2 lg:my-4 border border-gray-400 rounded-lg px-2 w-full h-12"
                    />
                </div>
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
                <div className="flex flex-col items-start text-2xl">
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPass"
                        id="confirmPass"
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="mb-4 mt-1 border border-gray-400 rounded-lg px-2 w-full h-12"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="rounded-lg border border-blue-500 hover:bg-blue-500 bg-[#ffc000] p-3 
                         text-black font-medium font-serif text-xl">
                        Sign Up
                    </button>
                </div>
                <p className="mt-2 text-lg font-bold">
                    Already have an Account?{' '}
                    <Link to={'/signin'} className="underline text-blue-600">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
