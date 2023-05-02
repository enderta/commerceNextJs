import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [property, setProperty] = useState({});

    useEffect(() => {
        const getProperty = async () => {
            const response = await fetch(`http://localhost:3000/api/single/${id}`);
            const data = await response.json();
            setProperty(data.data[0]);
        }
        getProperty().then(r => console.log(r));
    }, [id]);

    return (
        <div>
            <h1>Details</h1>
            {property.id &&
                <>
                    <h2>{property.id}</h2>
                    <p>{property.description}</p>
                    <p>Price: {property.price} {property.currency}</p>
                    <p>{property.is_rental ? 'For rent' : 'For sale'}</p>
                    <img src={property.image_url} alt={property.title} />
                </>
            }
        </div>
    );
}
