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
        fetch(`http://localhost:3000/api/rentalImages`)
            .then((res) => res.json())
            .then((data) => {
                setImages(data.image_url);


            });
    }, []);


    return (
        <>
            <br />
            <div className={"container"}>
                <Carousel>
                    {
                        props.properties.map((image, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image.image_url}
                                        alt={`Slide ${index}`}
                                    />
                                    <Carousel.Caption>
                                        <h3>
                                            {image.title}
                                        </h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            );
                        })
                    }

                </Carousel>
            </div>
            <br/>

        </>
    );
}
