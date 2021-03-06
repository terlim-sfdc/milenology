import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import PostLink from '../components/post-link';
import SEO from '../components/seo';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges }
  },
  location
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <SEO
        keywords={['terencelim', 'technology', 'travel', 'life hacks', 'microsoft', 'salesforce']}
        title="Home"
        path={location.pathname}
      />

      <section className="flex-1">
        <h2 className="text-2xl font-bold">Posts</h2>

        <div className="flex-1 items-center">{Posts}</div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            urlPath
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            slug
            title
            tags
            featuredImage {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  location: PropTypes.object,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default IndexPage;
