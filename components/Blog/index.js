import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import Posts from './posts';
import {pathsMenu} from '../../utils/routes';

function Blog() {

   const [posts, setPosts] = useState(null);

   useEffect(() => {
      fetchPosts();
   }, []);

   //consumindo posts do blog em wordpress, blog.lestsborabr.com
   async function fetchPosts() {
      const resp = await axios.get('https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=3&categories=41')
      if(resp.data)
      {
         setPosts([...resp.data]);
      }
   }

   function renderPostsEmpty() {
      return (
         <>
            <Loading width={100} height={100} style={{marginTop:'9rem'}} />
         </>
      );
   }

   return (
      <div className="section blog">
         <div className="container">
            <h2>Let's Blog</h2>

            <div className="wrapper-blog">
               <Posts data={posts} totalShow={3} hasDescription={1} />
            </div>

            {posts && posts === 0 && renderPostsEmpty()}
            {!posts && renderPostsEmpty()}
            <Link href={pathsMenu.blog}>
               <a className="more">mais artigos</a>
            </Link>
         </div>
      </div>
   );
}

export default Blog;