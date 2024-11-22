import { SentimentAnalysis } from "../../types/Memory";
import styles from "./styles.module.scss";

interface EmpathyBackgroundProps {
  sentimentAnalysis?: SentimentAnalysis;
}

const EmpathyBackground = ({ sentimentAnalysis }: EmpathyBackgroundProps) => {
  if (!sentimentAnalysis) {
    return null;
  }

  const { excitement, happiness, anger, confidence } = sentimentAnalysis;
  const allValuesSum = excitement + happiness + anger + confidence;

  const sentiments = [
    {
      type: "anger",
      percentage: anger / allValuesSum,
      baseClassName: styles.backgroundRed,
      baseOpacity: 0.4,
      highlightClassName: styles.backgroundRedHighlight,
      highlightOpacity: 0.3,
    },
    {
      type: "excitement",
      percentage: excitement / allValuesSum,
      baseClassName: styles.backgroundYellow,
      baseOpacity: 0.5,
      highlightClassName: styles.backgroundYellowHighlight,
      highlightOpacity: 0.3,
    },
    {
      type: "happiness",
      percentage: happiness / allValuesSum,
      baseClassName: styles.backgroundGreen,
      baseOpacity: 0.5,
      highlightClassName: styles.backgroundGreenHighlight,
      highlightOpacity: 0.3,
    },
    {
      type: "confidence",
      percentage: confidence / allValuesSum,
      baseClassName: styles.backgroundPurple,
      baseOpacity: 0.5,
      highlightClassName: styles.backgroundPurpleHighlight,
      highlightOpacity: 0.3,
    },
  ];

  const dominantSentiments = sentiments
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 2);

  return (
    <>
      {dominantSentiments.map((sentiment) => (
        <>
          <div
            key={sentiment.type}
            className={sentiment.baseClassName}
            style={{
              opacity: sentiment.baseOpacity * sentiment.percentage * 0.6,
            }}
          />
          <div
            key={sentiment.type}
            className={sentiment.highlightClassName}
            style={{
              opacity: sentiment.highlightOpacity * sentiment.percentage * 0.6,
            }}
          />
        </>
      ))}
    </>
  );
};

export default EmpathyBackground;
