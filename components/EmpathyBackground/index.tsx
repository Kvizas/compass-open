import React from "react";
import { SentimentAnalysis } from "../../types/Memory";

const baseStyle = (position: "fixed" | "absolute"): React.CSSProperties => ({
  position,
  inset: 0,
  pointerEvents: "none",
});

const sentimentStyles = (position: "fixed" | "absolute") => ({
  red: {
    base: {
      ...baseStyle(position),
      background: "linear-gradient(180deg, #000 0%, #FF0004 100%)",
    },
    highlight: {
      ...baseStyle(position),
      background: "linear-gradient(180deg, #000 0%, #980060 100%)",
    },
  },
  yellow: {
    base: {
      ...baseStyle(position),
      background: "linear-gradient(180deg, #000 0%, #535900 100%)",
    },
    highlight: {
      ...baseStyle(position),
      background: "linear-gradient(180deg, #000 0%, #FD0 100%)",
    },
  },
  green: {
    base: {
      ...baseStyle(position),
      background: "linear-gradient(180deg, #000 0%, #69992D 100%)",
    },
    highlight: {
      ...baseStyle(position),
      background: "linear-gradient(180deg, #000 0%, #00FF00 100%)",
    },
  },
  purple: {
    base: {
      ...baseStyle(position),
      background: "linear-gradient(180deg, #000 0%, #593A95 100%)",
    },
    highlight: {
      ...baseStyle(position),
      background: "linear-gradient(180deg, #000 0%, #873B9C 100%)",
    },
  },
});

interface EmpathyBackgroundProps {
  sentimentAnalysis?: SentimentAnalysis;
  position?: "fixed" | "absolute";
  opacityModifier?: number;
  style?: React.CSSProperties;
}

const EmpathyBackground = ({
  sentimentAnalysis,
  position = "fixed",
  opacityModifier = 1,
  style,
}: EmpathyBackgroundProps) => {
  if (!sentimentAnalysis) {
    return null;
  }

  const styles = sentimentStyles(position);
  const { excitement, happiness, anger, confidence } = sentimentAnalysis;
  const allValuesSum = excitement + happiness + anger + confidence;

  const sentiments = [
    {
      type: "anger",
      percentage: anger / allValuesSum,
      baseStyle: styles.red.base,
      baseOpacity: 0.4,
      highlightStyle: styles.red.highlight,
      highlightOpacity: 0.3,
    },
    {
      type: "excitement",
      percentage: excitement / allValuesSum,
      baseStyle: styles.yellow.base,
      baseOpacity: 0.5,
      highlightStyle: styles.yellow.highlight,
      highlightOpacity: 0.3,
    },
    {
      type: "happiness",
      percentage: happiness / allValuesSum,
      baseStyle: styles.green.base,
      baseOpacity: 0.5,
      highlightStyle: styles.green.highlight,
      highlightOpacity: 0.3,
    },
    {
      type: "confidence",
      percentage: confidence / allValuesSum,
      baseStyle: styles.purple.base,
      baseOpacity: 0.5,
      highlightStyle: styles.purple.highlight,
      highlightOpacity: 0.3,
    },
  ];

  const dominantSentiments = sentiments
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 2);

  return (
    <>
      {dominantSentiments.map((sentiment, index) => (
        <React.Fragment key={sentiment.type}>
          <div
            style={{
              ...sentiment.baseStyle,
              opacity:
                sentiment.baseOpacity *
                sentiment.percentage *
                0.6 *
                (index === 0 ? 1.5 : 1) *
                opacityModifier,
              ...style,
            }}
          />
          <div
            style={{
              ...sentiment.highlightStyle,
              opacity:
                sentiment.highlightOpacity *
                sentiment.percentage *
                0.6 *
                (index === 0 ? 1.5 : 1) *
                opacityModifier,
              ...style,
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default EmpathyBackground;
