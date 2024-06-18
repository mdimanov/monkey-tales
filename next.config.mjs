/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'veracious-kiwi-964.convex.cloud'
            }
        ]
    }
};

export default nextConfig;
