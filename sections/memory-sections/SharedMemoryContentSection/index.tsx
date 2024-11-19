import OpeningQuotes from "../../../assets/svg/OpeningQuotesIcon10px";
import StarIcon15px from "../../../assets/svg/StarIcon15px";
import ThoughtIcon15px from "../../../assets/svg/ThoughtIcon15px";
import TranscriptIcon15px from "../../../assets/svg/TranscriptIcon15px";
import Card from "../../../components/Card";
import CardText from "../../../components/Card/CardText";
import CardTitle from "../../../components/Card/CardTitle";
import TranscriptLine from "../../../components/TranscriptLine";
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
      <div className={styles.column}>
        <Card>
          <CardTitle icon={<StarIcon15px pathProps={{ fill: "#fff" }} />}>
            Summary
          </CardTitle>
          <CardText>{memory.longSummary}</CardText>
        </Card>
      </div>

      <div className={styles.column}>
        {memory.insight && (
          <Card>
            <CardTitle>Insight</CardTitle>
            <CardText>{memory.insight?.context}</CardText>
          </Card>
        )}

        {memory.quotes && (
          <Card>
            <CardTitle icon={<ThoughtIcon15px fill="#fff" />}>Quotes</CardTitle>
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
          <Card>
            <CardTitle icon={<TranscriptIcon15px fill="#fff" />}>
              Transcript
            </CardTitle>
            {memory.transcriptions.map((transcription) => (
              <TranscriptLine text={transcription.text} />
            ))}
          </Card>
        )}
      </div>

      <div className={styles.column}>
        {memory.location && (
          <iframe
            style={{
              borderRadius: "24px",
              outline: "none",
              border: "none",
            }}
            width="318"
            height="200"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBBJaRc9ltRzIJFEG2MuboTAbqYNe6jLns&q=${memory.location.address}`}
          ></iframe>
        )}
      </div>
      {/* <h1 style={{ margin: 0, color: "#fff" }}>Title: {memory.title}</h1>
      <p>Short Summary: {memory.shortSummary}</p>
      <p>Quotes: {memory.quotes?.map((quote) => quote.text).join(", ")}</p> */}
    </div>
  );
};

export default SharedMemoryContentSection;
