import '../RentalSearch'
import React, {useEffect, useState} from "react";
import RentalSearch from "../RentalSearch";
import Carosel from "@/pages/rental/Carosel";

export default function RentalHome(props) {
    const [search, setSearch] = useState("");
    const [is_rental, setIs_rental] = useState("");
    const [properties, setProperties] = useState([]);
    const [darkMode, setDarkMode] = useState(false);


    function handleToggle() {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        fetch(`/api/rental?search=${search}&is_rental=${is_rental}`)
            .then((res) => res.json())
            .then((data) => {
                    setProperties(data.data.rows);

                }
            );
    }, [search, is_rental]);
    return (
      //jumbotron
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen`}>
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={handleToggle}
                >
                    {darkMode ? <span>&#x2600; </span> : <span>&#127769;</span>}
                </button>
            </div>

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Welcome to Rental Home</h1>
                    <p className="lead">Find your next home here</p>
                </div>
                <div>
                    <Carosel properties={properties} dark={darkMode} />
                </div>
                <br/>
                <div>
                    <RentalSearch dark={true} properties={properties} setSearch={setSearch} search={search} is_rental={is_rental} setIs_rental={setIs_rental}/>
                </div>
                <div>

                </div>
                <br/>
            </div>

        </div>


    )
}

