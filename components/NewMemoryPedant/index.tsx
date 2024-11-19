import Image from "next/image";
import GlowingFieldy from "../../assets/images/GlowingFieldy.webp";
import styles from "./styles.module.scss";

const NewMemoryPedant = () => {
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
        from Simon
      </div>
    </div>
  );
};

export default NewMemoryPedant;
