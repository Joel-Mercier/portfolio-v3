/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const bundleAnalyzer = require("@next/bundle-analyzer");
// const mdx = require("@next/mdx");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

module.exports = withMDX(withPlugins(
  [
    [
      bundleAnalyzer,
      {
        enabled: process.env.ANALYZE === "true",
      },
    ],
    // [
    //   mdx,
    //   {
    //     extension: /\.mdx?$/,
    //     options: {
    //       // If you use remark-gfm, you'll need to use next.config.mjs
    //       // as the package is ESM only
    //       // https://github.com/remarkjs/remark-gfm#install
    //       remarkPlugins: [],
    //       rehypePlugins: [],
    //       // If you use `MDXProvider`, uncomment the following line.
    //       // providerImportSource: "@mdx-js/react",
    //     },
    //   },
    // ],
  ],
  nextConfig
));
