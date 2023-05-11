import RatingStars from "@/pages/rental/RatingStars";
import {Container, Row, Col, Image, Carousel} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();
    const {id} = router.query;
    const [property, setProperty] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const [rating, setRating] = useState([]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("dark") === "true") {
         setDarkMode(true)
        } else {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        const getProperty = async () => {


                try {
                    const response = await fetch(`http://localhost:3000/api/single/${id}`);
                    const data = await response.json();
                    if (isMounted) {
                        setProperty(data.property);
                        setLoading(false);
                    }
                    console.log(data);
                    setProperty(data.data[0]);
                    const stars = data.data.map((r) => r.rating);
                    const comments = data.data.map((r) => r.comment);
                    setRating([{stars}, {comments}]);
                    const imgs = data.data.map((r) => r.image_url);
                    setImages([...new Set(imgs)]);
                    setLoading(false);
                } catch (error) {
                    console.error(err);

                    setLoading(false);
                }
            }

        getProperty().then(r => r);
        return () => {
            isMounted = false;
        };
    }, [id]);

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
                    <div>
                        <Button variant="outline" href="/rental/rentalhome">
                            🏠
                        </Button>
                    </div>
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
                                        <RatingStars rating={rating} />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className={"container"}>
                                        <Carousel>
                                            {
                                                images.map((image, index) => {
                                                    return (
                                                        <Carousel.Item key={index}>
                                                            <img
                                                                className="d-block w-100"
                                                                src={image}
                                                                alt={`Slide ${index}`}

                                                            />
                                                            <Carousel.Caption>
                                                            </Carousel.Caption>
                                                        </Carousel.Item>
                                                    );
                                                })
                                            }

                                        </Carousel>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </Container>
                </div>
            )}
        </div>
    );
};
