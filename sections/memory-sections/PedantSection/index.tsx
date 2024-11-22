import NewMemoryPedant from "../../../components/NewMemoryPedant";
import styles from "./styles.module.scss";

interface PedantSectionProps {
  authorName: string;
}

const PedantSection: React.FC<PedantSectionProps> = ({ authorName }) => {
  return (
    <div className={styles.pedantSection}>
      <NewMemoryPedant authorName={authorName} />
    </div>
  );
};

export default PedantSection;
