import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ImageContainer from "../ImageContainer";
import ImageContainerAnimated from "../ImageContainer/ImageContainerAnimated";

function Carousel(props) {

   const settings = {
      className: "center",
      centerMode: true,
      dots: false,
      infinite: true,
      speed: 500,
      initialSlide: 0,
      slidesToShow: props.totalShow ? props.totalShow:3,
      slidesToScroll: props.totalShow ? props.totalShow:3,
      centerPadding: "60px",
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ],
      ...props.properties
   };

   let contador = 0;

   return (
      <>
         <Slider {...settings}>
            {props.items && props.items.map(item => {
               contador ++;
               return (
                  <div key={`item-${contador}`} className="slide">
                     {props.animated && <ImageContainerAnimated src={`${item.thumb}`} alt="Intercâmbio" />}
                     {!props.animated && <ImageContainer src={`${item.thumb}`} alt="Intercâmbio" />}
                  </div>
               );
            })}
         </Slider>
      </>
   );
}

export default Carousel;