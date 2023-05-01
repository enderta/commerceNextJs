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
               </Carousel.Item>
               <Carousel.Item>
                   <img
                       className="d-block w-100"
                       src={"https://www.homeswapper.me/wp-content/uploads/2019/02/home-page-full.svg"}
                       style={{height: "400px"}}
                       alt="Second slide"
                   />

               </Carousel.Item>
               <Carousel.Item>
                   <img
                       className="d-block w-100"
                       src={"https://www.homeswapper.me/wp-content/uploads/2019/02/home-page-full.svg"}
                       style={{height: "400px"}}
                       alt="Third slide"
                   />

               </Carousel.Item>
           </Carousel>
       </>
    )
}