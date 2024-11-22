import Image from "next/image";
import GlowingFieldy from "../../assets/images/GlowingFieldy.webp";
import styles from "./styles.module.scss";

interface NewMemoryPedantProps {
  authorName: string;
}

const NewMemoryPedant: React.FC<NewMemoryPedantProps> = ({ authorName }) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.pedant}
        src={GlowingFieldy}
        alt="Fieldy Glowing"
        width={65}
        height={67}
      />
      <div className={styles.text}>
        You've got a Memory
        <br />
        from {authorName}
      </div>
    </div>
  );
};

export default NewMemoryPedant;
