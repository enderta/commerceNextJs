import Link from "next/link";
import {useState,useEffect} from "react";

export default function search(props){


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Search</h5>
                                <div className="form-group">
                                    <label htmlFor="search">Zip Codes/Cities/States</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="search"
                                        value={props.search}
                                        onChange={(e) => props.setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="is_rental">Homes</label>
                                    <select
                                        className="form-control"
                                        id="is_rental"
                                        value={props.is_rental}
                                        onChange={(e) => props.setIs_rental(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="true">Rental</option>
                                        <option value="false">For Sale</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {props.properties.map((property) => (
                                <div className="col-4" key={property.id}>
                                    <div className="card">
                                        <img
                                            src={property.image_url}
                                            className="card-img-top"
                                            alt={property.address_line_1}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{property.address_line_1}</h5>
                                            <p className="card-text">{property.city}</p>
                                            <p className="card-text">{property.price}</p>
                                            <Link href={`/rental/${property.id}`}>
                                               <button className="btn btn-primary">View</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
                </div>
    );


}