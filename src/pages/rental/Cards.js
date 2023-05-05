import Link from "next/link";
import {useEffect, useState} from "react";

export default function Cards(props){
    const [dark,setDark]=useState(false);

    useEffect(()=>{
        if(props.dark){
            setDark(true);
        }
    },[props.dark]);

    console.log(props);

    return (
        <div className={`col-9 ${dark ? "text-white" : "text-dark"}`}>
            <div className="row">
                {props.properties.map((property) => (
                    <div className="col-4" key={property.id}>
                        <div className={`card ${dark ? "bg-dark" : ""}`}>
                            <img
                                src={property.image_url}
                                className="card-img-top"
                                alt={property.address_line_1}
                            />
                            <div className="card-body">
                                <h5 className={`card-title ${dark ? "text-white" : ""}`}>{property.address_line_1}</h5>
                                <p className={`card-text ${dark ? "text-white" : ""}`}>{property.city}</p>
                                <p className={`card-text ${dark ? "text-white" : ""}`}>{property.price}</p>
                                <Link href={`/rental/${property.property_id}`}>
                                    <button className={`btn ${dark ? "btn-light" : "btn-primary"}`}>View</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
