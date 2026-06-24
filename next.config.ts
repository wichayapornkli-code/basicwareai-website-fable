import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:locale(en|zh)/press-releases/3hk-alibaba-basicware-alliance",
        destination: "/:locale/news/3hk-alibaba-basicware-alliance",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
