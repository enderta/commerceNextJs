import './RentalSearch'
import React from "react";
import RentalSearch from "./RentalSearch";
import Carosel from "@/pages/Carosel";
export default function RentalHome(props) {

    return (
      //jumbotron
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Welcome to Rental Home</h1>
                <p className="lead">Find your next home here</p>
            </div>
            <div>
                <RentalSearch/>
            </div>
            <div>
                <Carosel/>
            </div>

        </div>
    )
}


