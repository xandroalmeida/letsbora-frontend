import Link from 'next/link';
import { shorten } from '../../utils/utils';

function PostItem(props) {

   function renderPosts() {
      let arrPosts = null;

      arrPosts = props.posts.map(item => {
         let strippedString = item.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");

         return (
            <div key={`post-${item.id}`} className="item-post">
               <Link href={`/blog/${item.slug}`}>
                  <img src={item.fimg_url} alt={item.title.rendered} />
               </Link>
               <h3>{shorten(item.title.rendered,50)}</h3>
               <p>{props.hasDescription && props.hasDescription === 1 && shorten(strippedString, 180)}</p>
               <Link href={`/blog/${item.slug}`}>SAIBA MAIS</Link>
            </div>
         );
      });

      return arrPosts;
   }

   return renderPosts();
}

export default PostItem;