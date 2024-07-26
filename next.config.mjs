/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    GOOGLE_ID:process.env.GOOGLE_ID,
    GOOGLE_Secret:process.env.GOOGLE_Secret,
    GITHUB_ID:process.env.GITHUB_ID,
    GITHUB_Secret:process.env.GITHUB_Secret,
    NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_URL:process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_URL:process.env.NEXTAUTH_URL
  }
};

export default nextConfig;
