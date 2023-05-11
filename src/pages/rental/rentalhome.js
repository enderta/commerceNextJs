import React, { useEffect, useState } from "react";
import RentalSearch from "./RentalSearch";
import Carosel from "@/pages/rental/Carosel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

export default function RentalHome(props) {
    const [search, setSearch] = useState("");
    const [isRental, setIsRental] = useState("");
    const [properties, setProperties] = useState([]);
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [cacheBuster, setCacheBuster] = useState(0);

    function handleToggle() {
        setDarkMode(!darkMode);
        localStorage.setItem("dark", !darkMode);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/rental?search=${search}&is_rental=${isRental}`
                );
                const data = await res.json();
                const obj = {};
                data.data.rows.forEach((property) => {
                    if (!obj[property.property_id]) {
                        obj[property.property_id] = [];
                    }
                    obj[property.property_id].push(property);
                });
                setProperties(
                    Object.values(obj).map((property) => {
                        return property[0];
                    })
                );
                setLoading(false);
                localStorage.setItem("dark", darkMode);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [search, isRental, cacheBuster]);

    function refreshData() {
        setCacheBuster((prevValue) => prevValue + 1);
    }

    return loading ? (
        <div>loading</div>
    ) : (
        <div
            className={`${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            } min-h-screen`}
        >
            <div className="flex items-center justify-between">
                <button type="button" onClick={handleToggle}>
                    {darkMode ? <span>&#x2600; </span> : <span>&#127769;</span>}
                </button>
            </div>
            <div className="container">
                <h1 className="display-4">Welcome to Rental Home</h1>
                <p className="lead">Find your next home here</p>
                <div>
                    <Carosel properties={properties} />
                </div>
                <div>
                    <RentalSearch
                        dark={darkMode}
                        properties={properties}
                        setSearch={setSearch}
                        search={search}
                        is_rental={isRental}
                        setIs_rental={setIsRental}
                    />
                </div>
                <br />
            </div>
        </div>
    );
}
