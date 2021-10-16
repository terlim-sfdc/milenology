import React from 'react';
import { Link } from 'gatsby';

function Footer() {
  return (
    <footer className="bg-gray-800">
      <nav className="flex justify-between max-w-4xl p-4 mx-auto text-sm md:p-8">
        <p className="text-white">
          <Link className="font-bold no-underline" key={'terencelim-main'} to={'/'}>
            &#169; milenology.com {new Date().getFullYear()}
          </Link>
        </p>
        <nav>
          {[
            {
              route: 'https://github.com/terlim-sfdc',
              title: 'GitHub'
            },
            {
              route: 'https://twitter.com/terlimws',
              title: 'Twitter'
            },
            {
              route: 'https://www.linkedin.com/in/terlimws/',
              title: 'LinkedIn'
            }
          ].map(link => (
            <a
              className="block mt-4 font-bold text-white no-underline md:inline-block md:mt-0 md:ml-6"
              key={link.title}
              href={link.route}
              target="_blank"
              rel="nofollow noopener noreferrer">
              {link.title}
            </a>
          ))}
        </nav>
      </nav>
    </footer>
  );
}

export default Footer;
