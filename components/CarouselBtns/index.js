import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ImageContainer from "../ImageContainer";
import config from '../../config';
import { shorten } from '../../utils/utils';

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
               
               const thumbHorizontal = item.thumb.filter((item)=>{
                  if(item.type==="thumb-horizontal")
                  {
                     return item;
                  }
               });

               // console.log('thumbHorizontal.length', thumbHorizontal.length);

               return (
                  <Link key={`experiencias-${contador}`} href={`/experiencias/${item.slug}`}>
                     <a>
                        <div key={`item-${contador}`} className="slide">
                           {thumbHorizontal && thumbHorizontal.length > 0 && <ImageContainer src={`${thumbHorizontal[0].path}`} alt="Intercâmbio" />}
                           {thumbHorizontal && thumbHorizontal.length === 0 && <ImageContainer src={`/assets/imgs/post3.jpg`} alt="Intercâmbio" />}
                           
                           {item.name ? <h4>{shorten(item.name, 36)}</h4>:null}
                        </div>
                     </a>
                  </Link>
               );
            })}
         </Slider>
      </>
   );
}

export default Carousel;