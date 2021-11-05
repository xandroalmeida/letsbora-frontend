import ImageContainer from '../ImageContainer';
import ReactPlayer from 'react-player'
import { useEffect } from 'react';

function SectionVideo() {

   useEffect(()=>{
      document.getElementById('myVideo').play();
   }, [])

   return (
      <section className="bg-video">
         <div className="wrapper-video">
            <video autoPlay muted loop id="myVideo">
               <source src="https://letsborafrontend.s3.amazonaws.com/assets/videos/lets_bora_noaudio.mp4" type="video/mp4" />
            </video>
            {/* <ReactPlayer
               className='react-player'
               url= 'https://letsborafrontend.s3.amazonaws.com/assets/videos/lets_bora_noaudio.mp4'
               width='100%'
               height='100%'
               controls = {false}
               loop = {true}
               playing = {true}
            /> */}
         </div>
      </section>
   );

}

export default SectionVideo;