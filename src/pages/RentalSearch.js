import Link from "next/link";
import {useState,useEffect} from "react";

export default function search(){
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
    console.log(properties)
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
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="is_rental">Homes</label>
                                    <select
                                        className="form-control"
                                        id="is_rental"
                                        value={is_rental}
                                        onChange={(e) => setIs_rental(e.target.value)}
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
                            {properties.map((property) => (
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
                                            <Link href={`/property/${property.id}`}>
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