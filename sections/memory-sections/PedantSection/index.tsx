import { motion } from "framer-motion";
import NewMemoryPedant from "../../../components/NewMemoryPedant";
import styles from "./styles.module.scss";

interface PedantSectionProps {
  authorName: string;
}

const PedantSection: React.FC<PedantSectionProps> = ({ authorName }) => {
  return (
    <motion.div
      className={styles.pedantSection}
      initial={{ height: "100vh" }}
      animate={{ height: "max(45vh, 300px)" }}
      transition={{
        delay: 1.3,
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.25],
        type: "spring",
        stiffness: 100,
        damping: 13,
      }}
    >
      <NewMemoryPedant authorName={authorName} />
    </motion.div>
  );
};

export default PedantSection;
