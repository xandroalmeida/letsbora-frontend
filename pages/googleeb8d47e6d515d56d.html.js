
import React from 'react';

const Google = () => {
    return null;
};

export const getServerSideProps = async ({ res }) => {
    const content = 'google-site-verification: googleeb8d47e6d515d56d.html'

    res.setHeader('Content-Type', 'text/html');
    res.write(content);
    res.end();

    return {
        props: {},
    };
};

export default Google;
