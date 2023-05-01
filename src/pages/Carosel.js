import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Carosel(props) {
    const [images, setImages] = useState([]);
    const [randomImageSrc, setRandomImageSrc] = useState([]);
    const [propertyIds, setPropertyIds] = useState([]);

    useEffect(() => {
        // Fetch all images and property ids
        fetch(`/api/rentalImages`)
            .then((res) => res.json())
            .then((data) => {
                setImages(data.data.rows);
                setPropertyIds([...new Set(data.data.rows.map((item) => item.property_id))]);
            });
    }, []);

    useEffect(() => {
        if (propertyIds.length > 0) {
            const randomPropertyIds = [];
            while (randomPropertyIds.length < 3) {
                const randomIndex = Math.floor(Math.random() * propertyIds.length);
                const randomPropertyId = propertyIds[randomIndex];
                if (!randomPropertyIds.includes(randomPropertyId)) {
                    randomPropertyIds.push(randomPropertyId);
                }
            }
            const randomImageUrls = images
                .filter((image) => randomPropertyIds.includes(image.property_id))
                .map((image) => image.image_url);
            setRandomImageSrc(randomImageUrls);
        }
    }, [propertyIds, images]);

    return (
        <>
            <br />
            <Carousel nextLabel="Next" prevLabel="Prev">
                {randomImageSrc.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={image}
                            alt={`Slide ${index + 1}`}
                        />
                        <Carousel.Caption>
                            <h3>{`Slide ${index + 1}`}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}
