import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Ratings = (data) => {
    const { rating, numReviews } = data;
    return (
        <div className="flex items-center">
            <div className="flex">
                <span>
                    {rating >= 1 ? (
                        <FaStar color="#ffc000" />
                    ) : rating >= 0.5 ? (
                        <FaStarHalfAlt color="#ffc000" />
                    ) : (
                        <FaRegStar color="#ffc000" />
                    )}
                </span>
                <span>
                    {rating >= 2 ? (
                        <FaStar color="#ffc000" />
                    ) : rating >= 1.5 ? (
                        <FaStarHalfAlt color="#ffc000" />
                    ) : (
                        <FaRegStar color="#ffc000" />
                    )}
                </span>
                <span>
                    {rating >= 3 ? (
                        <FaStar color="#ffc000" />
                    ) : rating >= 2.5 ? (
                        <FaStarHalfAlt color="#ffc000" />
                    ) : (
                        <FaRegStar color="#ffc000" />
                    )}
                </span>
                <span>
                    {rating >= 4 ? (
                        <FaStar color="#ffc000" />
                    ) : rating >= 3.5 ? (
                        <FaStarHalfAlt color="#ffc000" />
                    ) : (
                        <FaRegStar color="#ffc000" />
                    )}
                </span>
                <span>
                    {rating >= 5 ? (
                        <FaStar color="#ffc000" />
                    ) : rating >= 4.5 ? (
                        <FaStarHalfAlt color="#ffc000" />
                    ) : (
                        <FaRegStar color="#ffc000" />
                    )}
                </span>
            </div>
            <div>
                <span className="m-1 text-[#ffc000] font-bold">
                    {numReviews} reviews
                </span>
            </div>
        </div>
    );
};

export default Ratings;
