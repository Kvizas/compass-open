import React from "react";
import { useListTimeSeparators } from "../../hooks/useListTimeSeparators";
import { Transcription } from "../../types/Memory";
import TranscriptLine from "../TranscriptLine";
import styles from "./styles.module.scss";

interface TranscriptFeedProps {
  transcriptions: Transcription[];
}

const roundToNearestFiveMinutes = (date: Date): string => {
  const coeff = 1000 * 60 * 5;
  const rounded = new Date(Math.floor(date.getTime() / coeff) * coeff);
  return rounded.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const TranscriptFeed: React.FC<TranscriptFeedProps> = ({ transcriptions }) => {
  const timeSeparatorSystem = useListTimeSeparators(
    transcriptions,
    (item) => new Date(item.created),
    (date) =>
      date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    (date) => roundToNearestFiveMinutes(date)
  );

  return (
    <div className={styles.transcriptFeed}>
      {transcriptions.map((transcription, index) => (
        <React.Fragment key={index}>
          {Object.values(timeSeparatorSystem.separators).includes(
            transcription
          ) && (
            <div className={styles.dateSeparator}>
              {timeSeparatorSystem.dateFormatter(
                timeSeparatorSystem.itemDateExtractor(transcription)
              )}
            </div>
          )}

          <TranscriptLine text={transcription.text} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TranscriptFeed;
