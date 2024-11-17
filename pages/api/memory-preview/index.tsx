import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import LogoForSharable from "../../../assets/svg/LogoForSharable";
import OpeningQuotes from "../../../assets/svg/OpeningQuotes";
import getVercelUrl from "../../../urls";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL(
    "../../../public/fonts/HelveticaNowDisplay-Medium.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());

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

  const memoryData = await memory.json();

  console.log("memoryData", memoryData);

  let sideMultiplier = Math.random() > 0.5 ? 1 : -1;

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {memoryData.quotes &&
            memoryData.quotes.map((quote) => {
              const randomRotation = (1 + Math.random() * 4) * sideMultiplier;
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
                    padding: "6px 20px 12px 20px",
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
                      lineHeight: "125%",
                      flexDirection: "row",
                      gap: 3,
                    }}
                  >
                    <OpeningQuotes
                      style={{
                        transform: `scale(1.1)`,
                        marginTop: 12,
                      }}
                    />
                    Hello this
                  </div>
                </div>
              );
            })}
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
          <LogoForSharable />
        </div>
      </div>
    ),
    {
      width: 440,
      height: 440,
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