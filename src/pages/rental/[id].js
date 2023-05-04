import React from "react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Container, Row, Col, Image} from "react-bootstrap";


export default function Home() {
    const router = useRouter();
    const {id} = router.query;
    const [property, setProperty] = useState({});
    const [darkMode, setDarkMode] = useState(false);


    function handleToggle() {
        setDarkMode(!darkMode);
    }

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
            <br/>
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={handleToggle}
                >
                    {darkMode ? <span>&#x2600; </span> : <span>&#127769;</span>}
                </button>
            </div>
            </div>



    );
}
