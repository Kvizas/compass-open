import Head from "next/head";
import { useRouter } from "next/router";

import { GetServerSideProps } from "next";
import { fetchSharable } from "../../hooks/useSharable";
import PedantSection from "../../sections/memory-sections/PedantSection";
import SharedMemoryContentSection from "../../sections/memory-sections/SharedMemoryContentSection";
import styles from "./styles.module.scss";

export default function Page({ sharedEntity }) {
  const router = useRouter();
  const { sharableId } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
    : "";

  if (!sharedEntity) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <meta property="og:title" content={sharedEntity.title} />
        <meta property="og:description" content={sharedEntity.shortSummary} />

        <meta
          property="og:image"
          content={`${baseUrl}/api/memory-preview?sharable=${sharableId}`}
        />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta property="og:image:type" content="image/png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={sharedEntity.title} />
        <meta name="twitter:description" content={sharedEntity.shortSummary} />
        <meta
          name="twitter:image"
          content={`${baseUrl}/api/memory-preview?sharable=${sharableId}`}
        />
      </Head>

      <div className={styles.background2} />
      <div className={styles.background} />

      <div className={styles.body}>
        <PedantSection />

        <SharedMemoryContentSection memory={sharedEntity} />
      </div>
    </>
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
