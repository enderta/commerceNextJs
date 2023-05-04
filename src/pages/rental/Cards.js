import Link from "next/link";


export default function Cards(props){
console.log(props)
    return(
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

    )
}