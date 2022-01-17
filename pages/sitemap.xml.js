
import axios from 'axios';

const SitemapXml = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.letsborabr.com</loc>
        <lastmod>2022-01-12</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
        </url>
        <url>
        <loc>https://www.letsborabr.com/experiencias</loc>
        <lastmod>2022-01-12</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
        </url>
  `;

  const configHeaderJsonLd = {
    headers: {
      // Authorization: `Bearer ${config.tokenAuth}`,
      'Content-Type': 'application/ld+json',
      Accept: 'application/ld+json'
    },
  };

  const urlFinal = `https://gerenciador.letsborabr.com/api/experiencias`;
  const type = 'json-ld';
  const allExperiences = await axios.get(urlFinal, type && type === 'json-ld' ? configHeaderJsonLd : configHeader)
    .then(r => { return r; })
    .catch(error => { return error; });

  if (allExperiences.data['hydra:member']) {
    let arrAllExperiences = [...allExperiences.data['hydra:member']];
    const totalItems = allExperiences.data['hydra:totalItems'];
    const totalPages = Math.ceil(totalItems / 12);
    arrAllExperiences.forEach(experience => {
      sitemap += `<url>
        <loc>https://www.letsborabr.com/experiencias/${experience['slug']}</loc>
        <lastmod>${experience['createdAt']}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
      </url>`;
    });
  }

  let currentPage = 1;
  let resp = await axios.get(`https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=9&page=${currentPage}`)
  if (resp.data) {
    const totalPages = resp.headers['x-wp-totalpages'];
    while (totalPages >= currentPage) {
      resp.data.forEach(post => {
        sitemap += `\n<url>
        <loc>https://www.letsborabr.com/blog/${post['slug']}</loc>
        <lastmod>${post['date']}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
        </url>`;
      });
      currentPage++;
      if (totalPages >= currentPage)
        resp = await axios.get(`https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=9&page=${currentPage}`)
    }
  }

  sitemap += `\n</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SitemapXml;
