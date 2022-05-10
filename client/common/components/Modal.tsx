import styles from '../../styles/Modal.module.css';

const Modal = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.main}> Modal</div>
    </div>
  );
};

export default Modal;
