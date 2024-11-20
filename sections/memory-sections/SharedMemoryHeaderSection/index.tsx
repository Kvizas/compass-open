import { Memory } from "../../../types/Memory";
import { toPovilasTimeFormat } from "../../../utils/timeformats";
import styles from "./styles.module.scss";

interface SharedMemoryContentSectionProps {
  memory: Memory;
}

const SharedMemoryContentSection: React.FC<SharedMemoryContentSectionProps> = ({
  memory,
}) => {
  return (
    <div className={styles.sharedMemoryHeaderSection}>
      <div className={styles.date}>
        {toPovilasTimeFormat(new Date(memory.startTime))}
      </div>
      <div className={styles.title}>{memory.title}</div>
    </div>
  );
};

export default SharedMemoryContentSection;
