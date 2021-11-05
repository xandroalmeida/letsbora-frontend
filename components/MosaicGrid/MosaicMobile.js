import Link from "next/link";
import { pathsMenu } from "../../utils/routes";
import ImageContainer from "../ImageContainer";

function MosaicMobile({customExpData}) {

   function renderExpColumn(start, end, itemLandscape) {
      const arrReturn = [];
      for (let index = start; index <= end; index++) {
         const item = customExpData[index];
         if(!item) return;
         arrReturn.push(
            <Link key={`item-${item.idexperiencias}`} href={`${pathsMenu.experiencias}/${item.slug}`}>
               <div className={`item ${itemLandscape === index ? 'landscape':''} `}>
                  <a href="#">
                     <ImageContainer src={item.thumb} alt={item.name} />
                     <div className="hover">
                        {item.name}
                     </div>
                  </a>
               </div>
            </Link>
         );
      }

      return arrReturn;
   }

   return (
      <>
         <div className="column">
            {renderExpColumn(0, 4, 3)}
         </div>
         <div className="column">
            {renderExpColumn(5, 9, 7)}
         </div>
      </>
   );
}

export default MosaicMobile;