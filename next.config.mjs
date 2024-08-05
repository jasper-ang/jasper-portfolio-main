/** @type {import('next').NextConfig} */
import withMDX from '@next/mdx';

const nextConfig = withMDX({
  extension: /\.mdx?$/,
})({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'hooks', 'src/app'], // Add other directories as needed
  },
});

export default nextConfig;
