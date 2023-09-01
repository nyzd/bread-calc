/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true,
    },
    images: {
        domains: ['avatars.githubusercontent.com'],
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
}

module.exports = nextConfig
