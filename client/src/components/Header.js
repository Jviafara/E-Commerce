import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Header = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const handleSignOut = () => {
        ctxDispatch({
            type: 'USER_SIGNOUT',
        });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
    };

    return (
        <div>
            <header className="flex items-center bg-orange py-2 h-10 lg:h-14 text-white fixed top-0 z-10 w-full">
                <nav className="w-full mx-4 md:mx-[10%] xl:mx-[15%]">
                    <ul className="flex justify-between items-center">
                        <li>
                            <Link to="/">
                                <div className="flex gap-2 items-end">
                                    <img
                                        className="w-8 h-8 lg:w-10 lg:h-10"
                                        src="./p_logo.png"
                                        alt="logo"
                                    />
                                    <p className="invisible md:visible font-bold text-xl lg:text-2xl">
                                        PATONTAS
                                    </p>
                                </div>
                            </Link>
                        </li>
                        <div className="flex items-center gap-2 lg:gap-3">
                            <li>
                                <Link className="flex" to="/cart">
                                    <AiOutlineShoppingCart className="w-6 h-6 md:h-6 lg:h-8 lg:w-8" />
                                    {cart.cartItems.length > 0 && (
                                        <span className="bg-red-600 text-white text-xs ms:text-sm lg:text-md font-bold px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full h-full relative -top-1.5 -left-1.5  dark:bg-red-600 dark:text-white">
                                            {cart.cartItems.reduce(
                                                (a, c) => a + c.quantity,
                                                0
                                            )}
                                        </span>
                                    )}
                                </Link>
                            </li>
                            {userInfo ? (
                                <li>
                                    <Menu
                                        as="div"
                                        className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="hidden md:inline-flex w-full justify-center items-center gap-x-1 bg-orange rounded-lg px-1 text-md font-bold text-white lg:hover:bg-[#F7A858]">
                                                {
                                                    userInfo.user.name
                                                        .toUpperCase()
                                                        .split(' ')[0]
                                                }
                                                <ChevronDownIcon
                                                    className="-mr-1 h-8 w-8  text-white"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                            <Menu.Button className="inline-flex md:hidden w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-bold text-white">
                                                <GiHamburgerMenu
                                                    className="h-8 w-8 -ml-4 -mr-2 text-white"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items className="absolute right-0 z-10 mt-2 lg:mt-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-orange shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to={'/profile'}
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-orange text-white rounded-lg'
                                                                        : 'bg-orange',
                                                                    'block px-4 py-2 text-sm lg:text-lg lg:font-bold hover:bg-[#F7A858]'
                                                                )}>
                                                                User Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to={
                                                                    '/orders-history'
                                                                }
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-orange text-white rounded-lg'
                                                                        : 'bg-orange',
                                                                    'block px-4 py-2 text-sm lg:text-lg lg:font-bold hover:bg-[#F7A858]'
                                                                )}>
                                                                Orders
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/signin"
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-orange text-white rounded-lg'
                                                                        : 'bg-orange',
                                                                    'block px-4 py-2 text-sm lg:text-lg lg:font-bold hover:bg-[#F7A858]'
                                                                )}
                                                                onClick={
                                                                    handleSignOut
                                                                }>
                                                                Sign Out
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </li>
                            ) : (
                                <li className="hover:bg-gray-900 rounded-lg p-2">
                                    <Link to="/signin">Sign In</Link>
                                </li>
                            )}
                        </div>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
