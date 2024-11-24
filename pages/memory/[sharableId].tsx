import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { GetServerSideProps } from "next";
import EmpathyBackground from "../../components/EmpathyBackground";
import { fetchSharable, Sharable } from "../../hooks/useSharable";
import PedantSection from "../../sections/memory-sections/PedantSection";
import PromoSection from "../../sections/memory-sections/PromoSection";
import SharedMemoryContentSection from "../../sections/memory-sections/SharedMemoryContentSection";
import SharedMemoryHeaderSection from "../../sections/memory-sections/SharedMemoryHeaderSection";
import { Memory } from "../../types/Memory";
import styles from "./styles.module.scss";

interface PageProps {
  sharedEntity: Sharable<Memory>;
}

export default function Page({ sharedEntity }: PageProps) {
  const router = useRouter();
  const { sharableId } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
    : "";

  useEffect(() => {
    window.scrollTo(0, 0);

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "unset";
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!sharedEntity) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>{sharedEntity.target?.title || "Shared memory"}</title>
        <meta
          property="og:title"
          content={sharedEntity.target?.title || "Shared memory"}
        />
        <meta
          property="og:description"
          content={sharedEntity.target.shortSummary}
        />

        <meta
          property="og:image"
          content={`${baseUrl}/api/memory-preview?sharable=${sharableId}`}
        />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta property="og:image:type" content="image/png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={sharedEntity.target?.title || "Shared memory"}
        />
        <meta
          name="twitter:description"
          content={sharedEntity.target.shortSummary}
        />
        <meta
          name="twitter:image"
          content={`${baseUrl}/api/memory-preview?sharable=${sharableId}`}
        />
      </Head>

      <EmpathyBackground
        sentimentAnalysis={
          sharedEntity.target?.sentiment ||
          sharedEntity.target?.insight?.sentiment
        }
      />

      <div className={styles.body}>
        <PedantSection authorName={sharedEntity.authorName} />

        <SharedMemoryHeaderSection memory={sharedEntity.target} />

        <SharedMemoryContentSection memory={sharedEntity.target} />

        <PromoSection />
      </div>
    </>
  );
}

// Fetch data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sharableId } = context.query;
  const sharedEntity = await fetchSharable<Memory>(sharableId as string); // Fetch data here

  return {
    props: {
      sharedEntity, // Pass the fetched data as props
    },
  };
};
