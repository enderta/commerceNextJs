import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Carosel(props) {
    const [images, setImages] = useState([]);
    const [randomImageSrc, setRandomImageSrc] = useState([]);
    const [propertyIds, setPropertyIds] = useState([]);
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");

    useEffect(() => {
        // Fetch all images and property ids
        fetch(`/api/rentalImages`)
            .then((res) => res.json())
            .then((data) => {
                setImages(data.image_url);
              const randomNum = Math.floor(Math.random() * data.image_url.length);
              setImage1(data.image_url[randomNum]);
                setImage2(data.image_url[randomNum+1]);
                setImage3(data.image_url[randomNum+2]);


            });
    }, []);


    return (
        <>
            <br />
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image1}
                        alt={image1}
                    />
                    <Carousel.Caption>
                        <h3>Find your next home here</h3>
                        <p>Search for your next home here</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image2}
                       alt={image2}
                    />

                    <Carousel.Caption>
                        <h3>Find your next home here</h3>
                        <p>Search for your next home here</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image3}
                        alt={image3}
                    />

                    <Carousel.Caption>
                        <h3>Find your next home here</h3>
                        <p>Search for your next home here</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </>
    );
}
