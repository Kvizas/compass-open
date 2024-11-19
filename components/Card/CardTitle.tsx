import React from "react";
import styles from "./styles.module.scss";

interface CardTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, icon, style }) => {
  return (
    <div className={styles.cardTitle} style={style}>
      {icon}
      {children}
    </div>
  );
};

export default CardTitle;
