import Head from "next/head";
import { useRouter } from "next/router";
import OpeningQuotes from "../../assets/svg/OpeningQuotes";
import { useSharable } from "../../hooks/useSharable";

export default function Page() {
  const router = useRouter();
  const { sharableId } = router.query;

  const { sharedEntity } = useSharable(sharableId as string);

  if (!sharedEntity)
    return (
      <div>
        <Head>
          <meta name="og:title" content={sharedEntity.title} />
          <meta name="og:description" content={sharedEntity.shortSummary} />
          <meta
            name="og:image"
            content={
              // Because OG images must have a absolute URL, we use the
              // `VERCEL_URL` environment variable to get the deployment’s URL.
              // More info:
              // https://vercel.com/docs/concepts/projects/environment-variables
              `${
                process.env.NEXT_PUBLIC_VERCEL_URL
                  ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
                  : ""
              }/api/memory-preview?sharable=${sharableId}`
            }
          />
        </Head>
      </div>
    );

  let sideMultiplier = Math.random() > 0.5 ? 1 : -1;

  return (
    <div>
      <Head>
        <meta name="og:title" content={sharedEntity.title} />
        <meta name="og:description" content={sharedEntity.shortSummary} />
        <meta
          name="og:image"
          content={
            // Because OG images must have a absolute URL, we use the
            // `VERCEL_URL` environment variable to get the deployment’s URL.
            // More info:
            // https://vercel.com/docs/concepts/projects/environment-variables
            `${
              process.env.NEXT_PUBLIC_VERCEL_URL
                ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
                : ""
            }/api/memory-preview?sharable=${sharableId}`
          }
        />
      </Head>
      <h1>Title: {sharedEntity.title}</h1>
      <p>Short Summary: {sharedEntity.shortSummary}</p>
      <p>
        Quotes: {sharedEntity.quotes?.map((quote) => quote.text).join(", ")}
      </p>

      <div
        style={{
          backgroundColor: "#000000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {sharedEntity.quotes &&
            sharedEntity.quotes.map((quote) => {
              const randomRotation = Math.random() * 5 * sideMultiplier;
              sideMultiplier *= -1;
              return (
                <div
                  key={quote.text}
                  style={{
                    borderRadius: 18,
                    background: "#313131",
                    boxShadow: "0px 2px 40px 0px rgba(0, 0, 0, 0.50)",
                    display: "flex",
                    transform: `rotate(${randomRotation}deg)`,
                    padding: "14px 20px 16px 20px",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "380px",
                  }}
                >
                  <div
                    style={{
                      opacity: 0.3,
                      color: "#FFF",
                      fontSize: 24,
                      fontFamily: "Helvetica Now Display",
                      fontStyle: "normal",
                      fontWeight: 510,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <OpeningQuotes />
                    Hello this
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
