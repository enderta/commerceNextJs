import '../RentalSearch'
import React, {useEffect, useState} from "react";
import RentalSearch from "../RentalSearch";
import Carosel from "@/pages/Carosel";

export default function RentalHome(props) {
    const [search, setSearch] = useState("");
    const [is_rental, setIs_rental] = useState("");
    const [properties, setProperties] = useState([]);

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
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Welcome to Rental Home</h1>
                <p className="lead">Find your next home here</p>
            </div>
            <div>
                <Carosel properties={properties} />
            </div>
            <br/>
            <div>
                <RentalSearch properties={properties} setSearch={setSearch} search={search} is_rental={is_rental} setIs_rental={setIs_rental}/>
            </div>
            <div>

            </div>
            <br/>
        </div>
    )
}


