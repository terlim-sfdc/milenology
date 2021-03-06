import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useWindowSize } from '@react-hook/window-size';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import SEO from '../components/seo';
import TagLink from '../components/tag-link';
import { resizeElements } from '../lib/prism-multiline-numbers';

// the data prop will be injected by the GraphQL query below.
const Template = ({ data, location }) => {
  const [width, height] = useWindowSize();
  const { site, posts } = data; // data.posts holds your post data
  const { fields, frontmatter, excerpt, html } = posts;
  const tags = frontmatter.tags;

  const featuredImg = getImage(frontmatter.featuredImage);
  const imageLink = getSrc(frontmatter.featuredImage);
  const {
    siteMetadata: { siteUrl }
  } = site;

  useEffect(() => {
    resizeElements(Array.prototype.slice.call(document.querySelectorAll('pre.line-numbers')));
  }, [width, height]);

  useEffect(() => {
    // create an Observer instance
    const resizeObserver = new ResizeObserver(() => {
      console.log('resizing elements');
      resizeElements(Array.prototype.slice.call(document.querySelectorAll('pre.line-numbers')));
    });

    resizeObserver.disconnect();
    const contentElement = document.getElementById('post-content');
    // start observing a DOM node
    resizeObserver.observe(contentElement);
  }, []);

  return (
    <Layout className="blog-post-container">
      <SEO
        keywords={['technology', 'travel', 'lifehacks', 'microsoft', 'salesforce'].concat(tags)}
        title={frontmatter.title}
        description={excerpt}
        path={location.pathname}
      />
      <Helmet
        meta={[
          {
            name: 'image',
            content: `${siteUrl}${imageLink}`
          },
          {
            name: 'og:image',
            content: `${siteUrl}${imageLink}`
          },
          {
            name: 'og:image:alt',
            content: frontmatter.title
          },
          {
            name: 'twitter:image',
            content: `${siteUrl}${imageLink}`
          }
        ]}
      />

      <section className="blog-post flex-1">
        <div className="blog-post-meta mb-4">
          <h1 className="text-2xl font-bold">{frontmatter.title}</h1>
          <div className="my-1">
            {tags !== null && tags.map(tag => <TagLink key={tag} tag={tag} />)}
          </div>
          <h2 className="text-sm font-bold">{`${frontmatter.date} ??? ${fields.readingTime.text}`}</h2>
        </div>
        <div className="blog-post-featured-image pb-4">
          <GatsbyImage image={featuredImg} alt={frontmatter.title} />
        </div>
        <div
          id="post-content"
          className="blog-post-content markdown"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    site: site {
      siteMetadata {
        siteUrl
      }
    }
    posts: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 250)
      fields {
        readingTime {
          text
        }
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
`;

Template.propTypes = {
  location: PropTypes.object,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.PropTypes.shape({
        siteUrl: PropTypes.string
      })
    }),
    posts: PropTypes.shape({
      html: PropTypes.string,
      excerpt: PropTypes.string,
      fields: PropTypes.shape({
        readingTime: PropTypes.shape({
          text: PropTypes.string
        })
      }),
      frontmatter: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        date: PropTypes.string,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            gatsbyImageData: PropTypes.any
          })
        })
      })
    })
  })
};

export default Template;
