import styles from './styles.module.scss';

type Props = {
  resultNumber: number;
  resultDescription: string;
  Icon: React.ReactNode;
};

export default function ResultCard({resultNumber, resultDescription, Icon}: Props) {
  return (
    <div className={styles.result}>
      {Icon}
      <div className={styles.resultDescription}>{resultDescription}</div>
      <div className={styles.resultNumber}>{resultNumber}</div>
    </div>
  );
}
