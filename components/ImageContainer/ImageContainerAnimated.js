import { baseUrl } from '../../utils/utils';
import { CSSTransition, TransitionGroup } from "react-transition-group";

function ImageContainerAnimated(props) {
   let baseurl = baseUrl();

   if (props.src.indexOf("/") > 0) {
      baseurl += "/";
   }

   return (
      <TransitionGroup>
         <CSSTransition
            key={props.src}
            timeout={1000}
            classNames="animatedImg"
         >
            <img {...props}
               src={`${baseurl}${props.src}`} />

         </CSSTransition>
      </TransitionGroup>
   );
}

export default ImageContainerAnimated;