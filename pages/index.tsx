import Head from "next/head";

export default function Page() {
  return (
    <div>
      <Head>
        <meta name="og:title" content="Vercel Edge Network" />
        <meta name="og:description" content="Vercel Edge Network" />
        <meta
          name="og:image"
          content={`${
            process.env.NEXT_PUBLIC_VERCEL_URL
              ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
              : ""
          }/api/vercel`}
        />
      </Head>
      <h1>
        A page with Open Graph Image. url: {process.env.NEXT_PUBLIC_VERCEL_URL}
      </h1>
    </div>
  );
}
