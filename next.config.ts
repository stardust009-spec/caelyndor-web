import type { NextConfig } from "next";

/**
 * CSP base (sección 10.3 del diseño del Aura Mágica). 'unsafe-inline' en
 * script-src es el compromiso pragmático con Next sin nonces; endurecer a
 * nonces/strict-dynamic es una mejora futura, no un bloqueo de esta fase.
 * Los orígenes remotos coinciden con images.remotePatterns + Google Analytics.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://raw.githubusercontent.com https://stardust009-spec.github.io https://www.google-analytics.com https://www.googletagmanager.com",
  "media-src 'self' https://raw.githubusercontent.com https://stardust009-spec.github.io",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'"
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  },
  // Redundante con frame-ancestors, pero cubre navegadores antiguos.
  { key: "X-Frame-Options", value: "DENY" }
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/stardust009-spec/Caelyndor-Assets/main/**"
      },
      {
        protocol: "https",
        hostname: "stardust009-spec.github.io",
        pathname: "/Caelyndor-Assets/**"
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;
