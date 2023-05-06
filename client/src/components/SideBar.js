import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';

const SideBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${
                open ? 'w-52 h-screen fixed top-0' : 'w-12 h-12 fixed top-0'
            } duration-300 bg-[#404040] z-20`}>
            <button onClick={() => setOpen(!open)} type="button">
                <BiMenu
                    size={32}
                    color="white"
                    className={`absolute cursor-pointer rounded-full ${
                        open ? 'right-4' : 'right-0'
                    } top-2 w-7`}
                />
            </button>
            {open && (
                <nav className="mt-20">
                    <ul>
                        <li>link1</li>
                        <li>link2</li>
                        <li>link3</li>
                        <li>link4</li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default SideBar;
