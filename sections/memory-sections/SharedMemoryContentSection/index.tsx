import FieldyIcon18px from "../../../assets/svg/FieldyIcon18px";
import OpeningQuotes from "../../../assets/svg/OpeningQuotesIcon10px";
import QuotesIcon15px from "../../../assets/svg/QuotesIcon15px";
import StarIcon15px from "../../../assets/svg/StarIcon15px";
import TranscriptIcon17px from "../../../assets/svg/TranscriptIcon17px";
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
  return (
    <div className={styles.sharedMemoryContentSection}>
      {memory.longSummary && (
        <Card>
          <CardTitle icon={<StarIcon15px pathProps={{ fill: "#fff" }} />}>
            Summary
          </CardTitle>
          <CardText>{memory.longSummary}</CardText>
        </Card>
      )}

      {memory.location && (
        <Map
          address={memory.location.address}
          coordinates={memory.location.coordinates}
        />
      )}

      {memory.insight && (
        <Card>
          <CardTitle icon={<FieldyIcon18px />}>Insight</CardTitle>
          <CardText>{memory.insight?.context}</CardText>
        </Card>
      )}

      {memory.quotes && (
        <Card>
          <CardTitle icon={<QuotesIcon15px fill="#fff" />}>Quotes</CardTitle>
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
          titleIcon={<TranscriptIcon17px fill="#fff" />}
          defaultExpanded={false}
        >
          <TranscriptFeed transcriptions={memory.transcriptions} />
        </CollapsibleCard>
      )}
    </div>
  );
};

export default SharedMemoryContentSection;
