export default function getVercelUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://" + process.env.NEXT_PUBLIC_VERCEL_URL_DEV;
  }

  return "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
}
