import ImageContainer from '../ImageContainer';

function Loading(props) {
   return (
      <div className="loading">
         <ImageContainer 
            {...props} 
            src={props.lighter ? "/assets/imgs/loading_lighter.svg":"/assets/imgs/loading.svg"}
            alt="Loading" 
         />
      </div>
   );
}

export default Loading;