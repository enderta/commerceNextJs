import {Carousel} from "react-bootstrap";
import {useEffect, useState} from "react";
import {log} from "next/dist/server/typescript/utils";


export default function Carosel(props) {
    const [images, setImages] = useState([]);
    const [id, setId] = useState("");
    const [property_id, setProperty_id] = useState("");
    const [randomId, setRandomId] = useState("");
    useEffect(() => {
        fetch(`api/rentalImages`)
            .then((res) => res.json())
            .then((data) => {
                setImages(data.data.rows);
            });
    },[]);

    console.log(images);
    const unique = [...new Set(images.map(item => item.property_id))];
    console.log(unique);
    const random = Math.floor(Math.random() * unique.length);
    console.log(random);
    const randomPropertyId = unique[random];
    console.log(randomPropertyId);
    const randomImages = images.filter((image) => image.property_id === randomPropertyId);
    console.log(randomImages);
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    console.log(randomImage);
    const randomImageId = randomImage.id;
    console.log(randomImageId);
    const randomImageName = randomImage.image_name;
    console.log(randomImageName);
    const randomImageSrc = randomImage.image_src;
    console.log(randomImageSrc);

    return (
       <>
<br/>
              <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={randomImageSrc}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>{randomImageName}</h3>
                            <p>First slide</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={randomImageSrc}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>{randomImageName}</h3>
                            <p>Second slide</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={randomImageSrc}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>{randomImageName}</h3>
                            <p>Third slide</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>


        </>
    )
}
