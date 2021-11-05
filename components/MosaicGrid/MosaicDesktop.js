import Link from "next/link";
import { pathsMenu } from "../../utils/routes";
import ImageContainer from "../ImageContainer";

function MosaicDesktop({customExpData}) {

   function renderExpColumn(start, end) {
      const arrReturn = [];
      for (let index = start; index <= end; index++) {
         const item = customExpData[index];
         if(!item) return;
         arrReturn.push(
            <Link key={`item-${item.idexperiencias}`} href={`${pathsMenu.experiencias}/${item.slug}`}>
               <div className="item">
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
            {renderExpColumn(0, 2)}
         </div>
         <div className="column">
            {renderExpColumn(3, 4)}
         </div>
         <div className="column">
            {renderExpColumn(5, 7)}
         </div>
         <div className="column">
            {renderExpColumn(8, 10)}
         </div>
      </>
   );
}

export default MosaicDesktop;