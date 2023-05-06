import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const UserProfile = () => {
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [name, setName] = useState(userInfo.user.name || '');
    const [email, setEmail] = useState(userInfo.user.email || '');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .put(
                'api/users/update',
                {
                    name,
                    email,
                    password,
                    confirmPass,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                alert('User Updated Successfully');
                ctxDispatch({
                    type: 'USER_UPDATE',
                    payload: res.data,
                });
                localStorage.setItem('userInfo', JSON.stringify(res.data));
                if (res.status === 201) {
                    navigate(0);
                    navigate('/profile');
                }
            })
            .catch((err) => {
                alert(err.response.data.msg);
            });
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo, navigate]);

    return (
        <div>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 className="text-4xl font-bold">User Profile</h1>
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
                    <label htmlFor="email" className="my-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg bg-gray-50 p-3"
                    />
                </div>
                <div className="flex flex-col text-2xl mb-4">
                    <label htmlFor="password" className="my-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg bg-gray-50 p-3"
                    />
                </div>
                <div className="flex flex-col text-2xl mb-4">
                    <label htmlFor="confirmPass" className="my-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPass"
                        id="confirmPass"
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="border rounded-lg bg-gray-50 p-3"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-lg border border-blue-500 hover:bg-blue-500 bg-[#ffc000] py-3 px-4 
                         text-black font-medium font-serif text-2xl">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
