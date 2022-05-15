import styles from '../../../styles/RoundButton.module.css';
import ICustomButtonProp from '../../types/ICustomButtonProps';

const RoundButton = ({
  button,
  onClick,
  color,
  textColor,
}: ICustomButtonProp) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      style={{ backgroundColor: color, color: textColor }}
    >
      {button}
    </button>
  );
};

export default RoundButton;
