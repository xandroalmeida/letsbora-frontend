import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ImageContainer from "../ImageContainer";
import config from '../../config';

function CarouselExperiencia(props) {

   const settings = {
      className: "slider variable-width",
      dots: false,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      speed: 500
      // responsive: [
      //    {
      //       breakpoint: 1024,
      //       settings: {
      //          slidesToShow: 3,
      //          slidesToScroll: 3,
      //       }
      //    },
      //    {
      //       breakpoint: 600,
      //       settings: {
      //          slidesToShow: 2,
      //          slidesToScroll: 2
      //       }
      //    },
      //    {
      //       breakpoint: 480,
      //       settings: {
      //          slidesToShow: 1,
      //          slidesToScroll: 1
      //       }
      //    }
      // ]
   };

   //console.log('teste', props.items);

   let contador = 0;

   return (
      <>
         <Slider {...settings}>
            {props.items && props.items.map(item => {
               if(item)
               {
                  contador ++;
                  return (
                     <div key={`item-${contador}`} className="slide">
                        <ImageContainer src={`${item.thumb}`} alt={item.name} />
                     </div>
                  );
               }
            })}
         </Slider>
      </>
   );
}

export default CarouselExperiencia;