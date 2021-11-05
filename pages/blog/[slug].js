import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
   FacebookIcon, FacebookShareButton,
   LinkedinIcon, LinkedinShareButton,
   TwitterIcon, TwitterShareButton,
   WhatsappIcon, WhatsappShareButton
} from "react-share";
import Posts from '../../components/Blog/posts';
import Loading from '../../components/Loading';
import PageInterna2 from '../../layouts/PageInterna2';

function Post({ post }) {

   // const router = useRouter()
   // console.log('router.query', router.query);
   // console.log('router.query', router);
   // const { slug } = router.query;

   const postFinal = post ? post[0] : null;

   // const [post, setPost] = useState(null);
   const [urlLocation, setUrlLocation] = useState(null);
   const [posts, setPosts] = useState(null);
   const [postsData, setPostsData] = useState(null);

   //tags
   const [title, setTitle] = useState('');
   const [link, setLink] = useState('');
   const [excerpt, setExcerpt] = useState('');
   const [image, setImage] = useState('');
   const [publishDate, setPublishDate] = useState('');
   const [modified, setModified] = useState('');

   useEffect(() => {
      setUrlLocation(window.location.href);
      fetchPosts();
   }, []);

   useEffect(() => {
      const excerptTemp = postFinal.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");

      setTitle(postFinal.title.rendered);
      setLink(postFinal.link);
      setExcerpt(excerptTemp);
      setImage(postFinal.fimg_url);
      setPublishDate(postFinal.date);
      setModified(postFinal.modified);
   }, [postFinal]);


   //consumindo posts do blog em wordpress, blog.lestsborabr.com
   async function fetchPosts() {
      const resp = await axios.get('https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=3')
      if (resp.data) {
         setPosts([...resp.data]);
         const dataClean = postFinal.date.substr(0, postFinal.date.indexOf('T'));
         const arrData = dataClean.split("-");
         const dataFormatted = `${arrData[2]}/${arrData[1]}/${arrData[0]}`;
         setPostsData(dataFormatted);
      }
   }

   return (
      <>
         <Head>
            <title>Let's Bora Blog - {title}</title>

            <link rel="canonical" href={link} />
            <meta property="title" content={title} />
            <meta property="description" content={excerpt} />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={excerpt} />
            <meta property="og:url" content={link} />
            <meta property="og:site_name" content="Let's Bora - Aproximando pessoas e proporcionando experiências inesquecíveis." />
            <meta property="article:published_time" content={publishDate} />
            <meta property="article:modified_time" content={modified} />
            <meta property="og:updated_time" content={modified} />
            <meta property="og:image" content={image} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:image:width" content="359" />
            <meta property="og:image:height" content="250" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={excerpt} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image" content={image} />
         </Head>
         <PageInterna2>
            <article className="post-single">
               <div className="container">
                  {!post && <Loading width={100} height={100} />}
                  {postFinal && <>
                     <h1>{postFinal.title.rendered}</h1>
                     <div className="meta">
                        <author>Escrito por {postFinal._embedded.author[0].name}</author> em {postsData}
                     </div>
                     <img src={postFinal.fimg_url} alt={postFinal.title.rendered} title={postFinal.title.rendered} key={postFinal.fimg_url} className="img-destaque" />
                     <div className="entry-content">{ReactHtmlParser(postFinal.content.rendered)}</div>
                     <div className="share-icons">
                        <h3>Compartilhe:</h3>
                        <FacebookShareButton url={urlLocation}>
                           <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={urlLocation}>
                           <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={urlLocation}>
                           <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <WhatsappShareButton url={urlLocation}>
                           <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                     </div>
                  </>}
               </div>

               <div className="container-blog">
                  <h3 className="title-blog">mais artigos</h3>
                  <div className="wrapper-blog-single-post">
                     <div className="container">
                        <Posts data={posts} totalShow={3} hasDescription={1} />
                     </div>
                  </div>
               </div>
            </article>
         </PageInterna2>
      </>
   )
}

// This function gets called at build time
export async function getStaticPaths() {
   // Call an external API endpoint to get posts
   const res = await axios.get('https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=3')
   const posts = res.data;

   // Get the paths we want to pre-render based on posts
   const paths = posts.map(post => `/blog/${post.slug}`)

   // We'll pre-render only these paths at build time.
   // { fallback: false } means other routes should 404.
   return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
   // params contains the post `id`.
   // If the route is like /posts/1, then params.id is 1
   const res = await fetch(`https://blog.letsborabr.com/?rest_route=/wp/v2/posts&slug=${params.slug}&_embed`)
   const post = await res.json()

   // Pass post data to the page via props
   return { props: { post } }
}

export default Post;