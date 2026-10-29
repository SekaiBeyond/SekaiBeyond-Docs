import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // A fully static site in out/, served by Cloudflare (see wrangler.toml).
  output: 'export',
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
};

export default withMDX(config);
