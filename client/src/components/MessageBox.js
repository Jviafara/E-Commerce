import React from 'react';

const MessageBox = (props) => {
    return (
        <div className="bg-red-400 rounded-lg p-8 text-white font-bold text-lg text-center w-auto">
            {props.children}
        </div>
    );
};

export default MessageBox;
