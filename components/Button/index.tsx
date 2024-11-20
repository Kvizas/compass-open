import styles from "./styles.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon, onClick, href }) => {
  return (
    <a className={styles.button} href={href} onClick={onClick}>
      <div className={styles.buttonIcon}>{icon}</div>
      <div className={styles.buttonText}>{children}</div>
    </a>
  );
};

export default Button;
