import styles from './styles.module.scss';

export type OurWorkStepsProps = {
  title: string;
  description: string;
  Icon: React.ReactNode;
};

export default function OurWorkSteps({title, description, Icon}: OurWorkStepsProps) {
  return (
    <div className={styles.steps}>
      {Icon}
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
