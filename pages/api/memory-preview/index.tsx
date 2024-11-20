import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import OpeningQuotes from "../../../assets/svg/OpeningQuotesIcon10px";
import { Memory } from "../../../types/Memory";
import getVercelUrl from "../../../utils/urls";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL(
    "../../../public/fonts/HelveticaNowDisplay-Medium.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());

// Sorts keywords by length. Longest one in the middle, shortest ones on the outside
function sortKeywords(keywords: string[]) {
  const filtered = keywords
    .filter((word) => word.length <= 35)
    .sort((a, b) => b.length - a.length)
    .slice(0, 4);

  while (filtered.length < 4) {
    filtered.push(undefined);
  }

  return [filtered[2], filtered[0], filtered[1], filtered[3]].filter(
    (word) => word !== undefined
  );
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const sharableId = searchParams.get("sharable");

  const fontData = await font;

  if (!sharableId) {
    return new ImageResponse(<>{"No sharable id found"}</>, {
      width: 1200,
      height: 630,
    });
  }

  const memory = await fetch(
    `${getVercelUrl()}/api/getSharedEntity?id=${sharableId}`
  );

  const memoryData = (await memory.json()) as Memory;

  let sideMultiplier = Math.random() > 0.5 ? 1 : -1;

  const sortedKeywords =
    memoryData.keywords && sortKeywords(memoryData.keywords);

  return new ImageResponse(
    (
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column-reverse",
            padding: "0 48px",
            gap: -3,
            transform: `scale(${1.3 - (sortedKeywords?.length || 0) * 0.07})`,
          }}
        >
          {sortedKeywords ? (
            sortedKeywords.map((keyword) => {
              const randomRotation = (2 + Math.random() * 4) * sideMultiplier;
              const randomTranslation =
                Math.floor(Math.random() * 40 + 10) * sideMultiplier;
              sideMultiplier *= -1;
              return (
                <div
                  key={keyword}
                  style={{
                    borderRadius: 18,
                    background: "#FFF",
                    // boxShadow: "0px 2px 40px 0px rgba(0, 0, 0, 0.50)",
                    boxShadow:
                      "0px 0px 22.2px 0px rgba(255, 255, 255, 0.41), 0px 20px 20px 0px rgba(0, 0, 0, 0.18)",
                    display: "flex",
                    transform: `rotate(${randomRotation}deg) translateX(${randomTranslation}px)`,
                    padding: "6px 20px 12px 20px",
                    maxWidth: "380px",
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      opacity: 0.6,
                      color: "#000",
                      fontSize: 24,
                      fontFamily: "Helvetica Now Display",
                      fontStyle: "normal",
                      fontWeight: 510,
                      textAlign: "center",
                      display: "flex",
                      lineHeight: "125%",
                      flexDirection: "row",
                      gap: 3,
                    }}
                  >
                    <OpeningQuotes
                      style={{
                        transform: `scale(1.1)`,
                        marginTop: 12,
                        opacity: 0.9,
                      }}
                    />
                    {keyword}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                color: "#FFF",
                fontSize: 24,
                fontFamily: "Helvetica Now Display",
                fontStyle: "normal",
                fontWeight: 510,
                textAlign: "center",
                padding: "48px",
              }}
            >
              {memoryData.title || "Shared memory"}
            </div>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            left: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={`${getVercelUrl()}/images/FieldyGlowing.png`}
            alt="Fieldy Device Icon"
          />
        </div>
      </div>
    ),
    {
      width: 600,
      height: 315,
      fonts: [
        {
          name: "Helvetica Now Display",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
