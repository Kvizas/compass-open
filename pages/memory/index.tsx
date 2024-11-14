import Head from "next/head";

export default function Page() {
  return (
    <div>
      <Head>
        <meta name="og:title" content="Vercel Edge Network" />
        <meta name="og:description" content="Memory" />
        <meta
          name="og:image"
          content={
            // Because OG images must have a absolute URL, we use the
            // `VERCEL_URL` environment variable to get the deployment’s URL.
            // More info:
            // https://vercel.com/docs/concepts/projects/environment-variables
            `https://compass-open.vercel.app/api/vercel`
          }
        />
      </Head>
      <h1>A page with Open Graph Image.</h1>
    </div>
  );
}
