import styles from '../../styles/Card.module.css';

const ArticleCard = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <p>{data.title}</p>
    </div>
  );
};
export default ArticleCard;
