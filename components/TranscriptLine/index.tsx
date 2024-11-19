import ProfileAvatarIcon12px from "../../assets/svg/ProfileAvatarIcon12px";
import styles from "./styles.module.scss";

interface TranscriptLineProps {
  text: string;
}

const TranscriptLine = ({ text }: TranscriptLineProps) => {
  return (
    <div className={styles.transcriptLine}>
      <div className={styles.transcriptLineAvatar}>
        <ProfileAvatarIcon12px />
      </div>
      <div className={styles.transcriptLineText}>{text}</div>
    </div>
  );
};

export default TranscriptLine;
