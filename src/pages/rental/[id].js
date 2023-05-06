import React from "react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Container, Row, Col, Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RatingStars from "@/pages/rental/RatingStars";


export default function Home() {
    const router = useRouter();
    const {id} = router.query;
    const [property, setProperty] = useState({});
    const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
}, [localStorage.getItem("dark")]);



    useEffect(() => {
        const getProperty = async () => {
            const response = await fetch(`http://localhost:3000/api/single/${id}`);
            const data = await response.json();
            setProperty(data.data[0]);
        };
        getProperty().then((r) => console.log(r));
    }, [id]);

    return (


            <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen`}>
                <div>
                    <h1 className="text-center text-4xl font-bold">Property Details</h1>
                </div>
                <Container className="d-flex justify-content-center">
                    {property.id && (
                        <Row>
                            <Col md={8}>
                                <h2>{property.title}</h2>
                                <p>{property.description}</p>
                                <p>
                                    Price: {property.price} {property.currency}
                                </p>
                                <p>{property.is_rental ? "For rent" : "For sale"}</p>
                                <div>
                                    <RatingStars rating={property.rating} />
                                    <p> Review: {property.comment} </p>
                                </div>

                            </Col>
                            <Col md={4}>
                                <Image src={property.image_url} alt={property.title} thumbnail />
                            </Col>
                        </Row>
                    )}

                </Container>
                <div>

                    <Button variant="outline" href="/rental/rentalhome">
                        <FontAwesomeIcon icon="arrow-left" /> 🏠
                    </Button>

                </div>
            </div>



    );
}
