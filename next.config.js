const { withContentlayer } = require("next-contentlayer");

const REDIRECT_SEGMENTS = [
  "pricing",
  "blog",
  "help",
  "changelog",
  "tools",
  "stats",
  "_static",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    useDeploymentId: true,
    serverActions: true,
    useDeploymentIdServerActions: true,
  },
  images: {
    domains: [
      "www.google.com",
      "avatar.vercel.sh",
      "faisalman.github.io",
      "avatars.dicebear.com",
      "res.cloudinary.com",
      "pbs.twimg.com",
      "d2vwwcvoksz7ty.cloudfront.net",
      "lh3.googleusercontent.com",
      "media.cleanshot.cloud", // only for staging purposes
    ],
  },
  webpack: (config, { }) => {
    // https://github.com/auth0/node-auth0/blob/master/FAQ.md?plain=1#L9
    config.resolve.alias['aws-crt'] = false;
    config.resolve.alias['typeorm'] = false;
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "app.letsfind.my",
          },
        ],
        destination: "https://app.letsfind.my",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "app.letsfind.my",
          },
        ],
        destination: "https://app.letsfind.my/:path*",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "api.letsfind.my",
          },
        ],
        destination: "https://api.letsfind.my",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "api.letsfind.my",
          },
        ],
        destination: "https://api.letsfind.my/:path*",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "letsfind.my",
          },
        ],
        destination: "https://letsfind.my",
        permanent: true,
        statusCode: 301,
      },
      ...REDIRECT_SEGMENTS.map(
        (segment) => (
          {
            source: `/${segment}`,
            has: [
              {
                type: "host",
                value: "letsfind.my",
              },
            ],
            destination: `https://letsfind.my/${segment}`,
            permanent: true,
            statusCode: 301,
          },
          {
            source: `/${segment}/:path*`,
            has: [
              {
                type: "host",
                value: "letsfind.my",
              },
            ],
            destination: `https://letsfind.my/${segment}/:path*`,
            permanent: true,
            statusCode: 301,
          }
        ),
      ),
      {
        source: "/metatags",
        has: [
          {
            type: "host",
            value: "letsfind.my",
          },
        ],
        destination: "https://letsfind.my/tools/metatags",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/metatags",
        has: [
          {
            type: "host",
            value: "letsfind.my",
          },
        ],
        destination: "/tools/metatags",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "staging.letsfind.my",
          },
        ],
        destination: "https://letsfind.my",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "preview.letsfind.my",
          },
        ],
        destination: "https://preview.letsfind.my",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "admin.letsfind.my",
          },
        ],
        destination: "https://admin.letsfind.my",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
