import {Carousel} from "react-bootstrap";


export default function Carosel(props) {

    return (
       <>
<br/>
           {props.properties.length > 0 &&
           <Carousel>
               {props.properties.map((property) => (
                   <Carousel.Item key={property.id}>
                          <img
                                className="d-block w-100"
                                src={property.image_url}
                                alt={property.address_line_1}
                            />
                            <Carousel.Caption>
                                <h3>{property.address_line_1}</h3>
                                <p>{property.city}</p>
                                <p>{property.price}</p>
                            </Carousel.Caption>
                     </Carousel.Item>
                ))}
            </Carousel>
              }
       </>
    )
}