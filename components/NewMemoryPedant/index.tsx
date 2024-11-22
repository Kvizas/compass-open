import { motion } from "framer-motion";
import Image from "next/image";
import GlowingFieldyNew from "../../assets/images/Fieldy_glowy_icon.webp";
import styles from "./styles.module.scss";

interface NewMemoryPedantProps {
  authorName: string;
}

const NewMemoryPedant: React.FC<NewMemoryPedantProps> = ({ authorName }) => {
  return (
    <div className={styles.container}>
      <motion.div
        animate={{ rotate: [50, 0], scale: [0.1, 1] }}
        transition={{
          duration: 2,
          type: "spring",
          stiffness: 100,
          damping: 13,
        }}
      >
        <Image
          className={styles.pedant}
          src={GlowingFieldyNew}
          alt="Fieldy Glowing"
          width={65}
          height={67}
        />
      </motion.div>
      <div className={styles.text}>
        You've got a Memory
        <br />
        from {authorName}
      </div>
    </div>
  );
};

export default NewMemoryPedant;
