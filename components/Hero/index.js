import Link from 'next/link';
import { pathsMenu } from '../../utils/routes';

function Hero() {
   return (
      <div className="hero">
         <div className="content-hero">
            <h2>Aproximando pessoas e proporcionando experiências inesquecíveis.</h2>
            <Link href={pathsMenu.experiencias}>explorar experiências</Link>
         </div>
      </div>
   );
}

export default Hero;