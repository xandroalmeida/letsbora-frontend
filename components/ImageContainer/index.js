import {baseUrl} from '../../utils/utils';

function ImageContainer(props) {
   let baseurl = baseUrl();

   if(props.src.indexOf("/") > 0)
   {
      baseurl += "/";
   }

   return (
      <img {...props} 
      src={`${baseurl}${props.src}`} />
   );
}

export default ImageContainer;