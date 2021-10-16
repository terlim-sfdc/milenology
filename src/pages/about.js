import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import SEO from '../components/seo';

function AboutPage({ location }) {
  return (
    <Layout>
      <SEO
        keywords={['terencelim', 'technology', 'travel', 'life hacks', 'microsoft', 'salesforce']}
        title="About"
        path={location.pathname}
      />

      <section className="flex flex-1 items-center md:flex-row">
        <div className="md:m-1">
          <p>Hello World!</p>
          <p>I&apos;m a Developer Evangelist at Salesforce!</p>
        </div>
      </section>
    </Layout>
  );
}

AboutPage.propTypes = {
  location: PropTypes.object
};

export default AboutPage;
