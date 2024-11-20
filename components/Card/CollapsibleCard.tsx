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

  return (
    <div className={styles.collapsibleCard}>
      <div
        className={`${styles.headerWrapper} ${
          isExpanded ? styles.expanded : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle icon={titleIcon}>
          {title}
          <span className={styles.arrow}>
            <CollapsibleArrowIcon15px />
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
