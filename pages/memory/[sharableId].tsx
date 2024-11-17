import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import OpeningQuotes from "../../assets/svg/OpeningQuotes";
import { fetchSharable } from "../../hooks/useSharable";

export default function Page({ sharedEntity }) {
  const router = useRouter();
  const { sharableId } = router.query;

  let sideMultiplier = 1;

  if (!sharedEntity) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <meta name="og:title" content={sharedEntity.title} />
        <meta name="og:description" content={sharedEntity.shortSummary} />
        <meta
          name="og:image"
          content={`${
            process.env.NEXT_PUBLIC_VERCEL_URL
              ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
              : ""
          }/api/memory-preview?sharable=${sharableId}`}
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

// Fetch data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sharableId } = context.query;
  const sharedEntity = await fetchSharable(sharableId as string); // Fetch data here

  return {
    props: {
      sharedEntity, // Pass the fetched data as props
    },
  };
};
