import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Carosel(props) {
    const [images, setImages] = useState([]);

    //async function
    useEffect(() => {
        async function getImages() {
            const response = await fetch("http://localhost:3000/api/rentalImages");
            const data = await response.json();
            const img=data.image_url;
            const imsShfl=(img.sort(() => Math.random() - 0.5));
            setImages(imsShfl.slice(0, 3));
        }
        getImages().then(() => {
            console.log("Images fetched");
        });
    }, []);

    return (
        <>
            <br />
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
            <br/>

        </>
    );
}
