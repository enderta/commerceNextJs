import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingStars = ({ rating }) => {
    const maxStars = 5;
    const stars = [];

    // Calculate the number of full and half stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const halfStar = hasHalfStar ? 1 : 0;
    const emptyStars = maxStars - fullStars - halfStar;

    // Add the full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon icon={faStar} flip style={{color: "#dcd504",}} />);
    }

    // Add the half star
    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon icon={faStar} flip style={{color: "#dcd504",}} />);
    }

    // Add the empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesomeIcon icon={faStar} flip style={{color: "#dcd504",}} />);
    }

    return <div>{stars}</div>;
};

export default RatingStars;
