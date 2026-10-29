import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // A fully static site in out/, served by GitHub Pages at docs.sekaibeyond.com.
  output: 'export',
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
};

export default withMDX(config);
