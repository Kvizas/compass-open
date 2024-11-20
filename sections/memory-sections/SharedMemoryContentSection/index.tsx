import OpeningQuotes from "../../../assets/svg/OpeningQuotesIcon10px";
import StarIcon15px from "../../../assets/svg/StarIcon15px";
import ThoughtIcon15px from "../../../assets/svg/ThoughtIcon15px";
import TranscriptIcon15px from "../../../assets/svg/TranscriptIcon15px";
import Card from "../../../components/Card";
import CardText from "../../../components/Card/CardText";
import CardTitle from "../../../components/Card/CardTitle";
import CollapsibleCard from "../../../components/Card/CollapsibleCard";
import Map from "../../../components/Map";
import TranscriptFeed from "../../../components/TranscriptFeed";
import { Memory } from "../../../types/Memory";
import styles from "./styles.module.scss";

interface SharedMemoryContentSectionProps {
  memory: Memory;
}

const SharedMemoryContentSection: React.FC<SharedMemoryContentSectionProps> = ({
  memory,
}) => {
  // Check if each column has any content
  const hasLeftColumn = memory.longSummary;
  const hasMiddleColumn = memory.quotes || memory.transcriptions;
  const hasRightColumn = memory.insight || memory.location;

  return (
    <div className={styles.sharedMemoryContentSection}>
      {hasLeftColumn && (
        <div className={styles.column}>
          <Card>
            <CardTitle icon={<StarIcon15px pathProps={{ fill: "#fff" }} />}>
              Summary
            </CardTitle>
            <CardText>{memory.longSummary}</CardText>
          </Card>
        </div>
      )}

      {hasMiddleColumn && (
        <div className={styles.column}>
          {memory.quotes && (
            <Card>
              <CardTitle icon={<ThoughtIcon15px fill="#fff" />}>
                Quotes
              </CardTitle>
              {memory.quotes.map((quote, index) => (
                <div key={index} style={{ display: "flex", gap: 3 }}>
                  <OpeningQuotes
                    style={{ marginTop: 5 }}
                    pathProps={{ fill: "#fff" }}
                  />
                  <CardText>{quote.text}</CardText>
                </div>
              ))}
            </Card>
          )}

          {memory.transcriptions && (
            <CollapsibleCard
              title="Transcript"
              titleIcon={<TranscriptIcon15px fill="#fff" />}
              defaultExpanded={false}
            >
              <TranscriptFeed transcriptions={memory.transcriptions} />
            </CollapsibleCard>
          )}
        </div>
      )}

      {hasRightColumn && (
        <div className={styles.column}>
          {memory.insight && (
            <Card>
              <CardTitle>Insight</CardTitle>
              <CardText>{memory.insight?.context}</CardText>
            </Card>
          )}

          {memory.location && (
            <Map
              address={memory.location.address}
              coordinates={memory.location.coordinates}
            />
          )}
        </div>
      )}
      {/* <h1 style={{ margin: 0, color: "#fff" }}>Title: {memory.title}</h1>
      <p>Short Summary: {memory.shortSummary}</p>
      <p>Quotes: {memory.quotes?.map((quote) => quote.text).join(", ")}</p> */}
    </div>
  );
};

export default SharedMemoryContentSection;
