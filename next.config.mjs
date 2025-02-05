/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            //https://i.scdn.co/image/ab67616d000048511dd97e315f3a1ebeb420c1dd
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            },
        ],
    },
};

export default nextConfig;