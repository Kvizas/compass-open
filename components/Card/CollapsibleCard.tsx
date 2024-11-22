import { useState } from "react";
import CollapsibleArrowIcon15px from "../../assets/svg/CollapsibleArrowIcon15px";
import CardTitle from "./CardTitle";
import styles from "./styles.module.scss";

interface CollapsibleCardProps {
  title: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  titleIcon,
  children,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div
      className={`${styles.collapsibleCard} ${
        isExpanded ? "" : styles.clickable
      }`}
      onClick={handleClick}
    >
      <div
        className={`${styles.headerWrapper} ${
          isExpanded ? styles.expanded : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        <CardTitle icon={titleIcon}>
          {title}
          <span className={styles.arrow}>
            <CollapsibleArrowIcon15px style={{ transform: "rotate(180deg)" }} />
          </span>
        </CardTitle>
      </div>
      <div
        className={`${styles.cardContent} ${isExpanded ? styles.expanded : ""}`}
      >
        <div className={styles.cardText}>{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleCard;
