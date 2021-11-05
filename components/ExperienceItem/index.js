import Link from 'next/link';
import { pathsMenu } from '../../utils/routes';
import { shorten } from '../../utils/utils';
import ImageContainer from '../ImageContainer';

function ExperienceItem(props) {

   function renderPosts() {
      let arrPosts = null;

      arrPosts = props.experiences.map(item => {
         let strippedString = item.description.replace(/(<([^>]+)>)/gi, "");

         console.log('item', item);
         return (
            <div key={`post-${item.idexperiencias}`} className="item-post">
               <Link href={`${pathsMenu.experiencias}/${item.slug}`}>
                  <ImageContainer src={`${item.thumb}`} alt={item.name} />
               </Link>
               <h3>{shorten(item.name,50)}</h3>
               <p>{item.description && shorten(strippedString, 180)}</p>
               <Link href={`${pathsMenu.experiencias}/${item.slug}`}>SAIBA MAIS</Link>
            </div>
         );
      });

      return arrPosts;
   }

   return renderPosts();
}

export default ExperienceItem;