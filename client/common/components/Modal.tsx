import styles from '../../styles/Modal.module.css';
interface ModalProp {
  children: React.ReactNode;
}
const Modal = ({ children }: ModalProp) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.main}> {children}</div>
    </div>
  );
};

export default Modal;
