import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";
import {Card} from "react-bootstrap";

const RatingStars = ({rating}) => {
    const maxStars = 5;
    const stars = [];

    // Calculate the number of full and half stars
    const fullStars = Math.floor(rating[0].stars.reduce((a, b) => a + b, 0) / rating[0].stars.length);
    const halfStars = Math.round(rating[0].stars.reduce((a, b) => a + b, 0) / rating[0].stars.length - fullStars);
    const emptyStars = maxStars - fullStars - halfStars;

    //yellow stars fa
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} color="yellow"/>);
    }

    //half stars fa
    for (let i = 0; i < halfStars; i++) {
        stars.push(<FontAwesomeIcon  icon={faStarHalf} color="yellow"/>);
    }

    //empty stars fa


    // Add the full stars

    return (
        <div>
            <h6 style={{color:'goldenrod'}}>Ratings</h6>
            <div>
                {stars}
            </div>
            <br/>
            <h6 style={{color:'goldenrod'}}>Comments</h6>
            {
                rating[1].comments.map((comment, index) => {
                    return (
                        <div key={index}>

                            <Card className="mb-3">
                                <Card.Body>

                                    <Card.Text style={{color:"goldenrod"}}>
                                        {comment}
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default RatingStars;
