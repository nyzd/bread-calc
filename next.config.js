/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname:"avatars.githubusercontent.com",
            port: "",
            pathname:"/**"
        }],
    },
    headers: () => [
        {
            source: '/repo/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
    cacheComponents: true,
}

module.exports = nextConfig
