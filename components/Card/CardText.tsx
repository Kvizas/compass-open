import React from "react";
import styles from "./styles.module.scss";

interface CardTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const CardText: React.FC<CardTextProps> = ({ children, style }) => {
  return (
    <div className={styles.cardText} style={style}>
      {children}
    </div>
  );
};

export default CardText;
