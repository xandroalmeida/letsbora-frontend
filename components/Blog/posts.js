import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {shorten} from '../../utils/utils';
import PostItem from '../PostItem';

function Posts(props) {

   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      initialSlide: 0,
      slidesToShow: props.totalShow,
      slidesToScroll: props.totalShow,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: props.totalShow,
               slidesToScroll: props.totalShow,
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
      ]
   };

   function renderPosts() {
      let arrPosts = null;

      arrPosts = props.data.map(item => {
         let strippedString = item.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");
         
         return (
            <div key={`post-${item.id}`} className="item-post">
               <Link href={`/blog/${item.slug}`}>
                  <img src={item.fimg_url} alt={item.title.rendered} />
               </Link>
               <h3>{shorten(item.title.rendered,50)}</h3>
               {props.hasDescription && props.hasDescription === 1 && <p>{shorten(strippedString,180)}</p>}
               <Link href={`/blog/${item.slug}`}>SAIBA MAIS</Link>
            </div>
         );
      });

      return arrPosts;
   }

   return (
      <>
         <Slider {...settings}>
            {props.data && renderPosts()}
         </Slider>
      </>
   );
}

export default Posts;