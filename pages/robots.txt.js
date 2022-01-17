
import React from 'react';

const RobotTxt = () => {
    return null;
};

export const getServerSideProps = async ({ res }) => {
    const robottxt = `
User-agent: *
Allow: /

Sitemap: https://www.letsborabr.com/sitemap.xml
  `;

    res.setHeader('Content-Type', 'text/text');
    res.write(robottxt);
    res.end();

    return {
        props: {},
    };
};

export default RobotTxt;
