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
                let num2 = Math.floor(Math.random() * data.image_url.length);
                while (num2 === randomNum) {
                    num2 = Math.floor(Math.random() * data.image_url.length);
                }
                let num3 = Math.floor(Math.random() * data.image_url.length);
                while (num3 === randomNum || num3 === num2) {
                    num3 = Math.floor(Math.random() * data.image_url.length);
                }
                setImage1(data.image_url[randomNum]);
                setImage2(data.image_url[num2]);
                setImage3(data.image_url[num3]);
            });
    }, []);
    console.log(image1, image2, image3);

    return (
        <>
            <br />
            <div className={"container"}>
                <Carousel>
                    <Carousel.Item>

                        <img
                            className="d-block w-100"
                            src={image1}
                            alt="First slide"

                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image2}
                            alt="Second slide"

                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image3}
                            alt="Third slide"

                        />
                    </Carousel.Item>

                </Carousel>
            </div>
            <br/>

        </>
    );
}
