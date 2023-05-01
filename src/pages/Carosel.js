import {Carousel} from "react-bootstrap";


export default function Carosel(props) {

    return (
       <>
<br/>
           <Carousel>
               <Carousel.Item>
                   <img
                       className="d-block w-100"
                       src={"https://www.homeswapper.me/wp-content/uploads/2019/02/home-page-full.svg"}
                       style={{height: "400px"}}
                       alt="First slide"
                   />
                   <Carousel.Caption>
                       <h3>First slide label</h3>
                       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                   </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
                   <img
                       className="d-block w-100"
                       src={"https://www.homeswapper.me/wp-content/uploads/2019/02/home-page-full.svg"}
                       style={{height: "400px"}}
                       alt="Second slide"
                   />

                   <Carousel.Caption>
                       <h3>Second slide label</h3>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                   </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
                   <img
                       className="d-block w-100"
                       src={"https://www.homeswapper.me/wp-content/uploads/2019/02/home-page-full.svg"}
                       style={{height: "400px"}}
                       alt="Third slide"
                   />

                   <Carousel.Caption>
                       <h3>Third slide label</h3>
                       <p>
                           Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                       </p>
                   </Carousel.Caption>
               </Carousel.Item>
           </Carousel>
       </>
    )
}