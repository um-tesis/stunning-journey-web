import styles from './styles.module.scss';

type Props = {
  project: any;
};

export default function ProjectSummary({project}: Props) {
  const {name, description} = project;
  return (
    <div className={styles.projectContainer}>
      <div>Project {name}</div>
      <div>Project {description}</div>
    </div>
  );
}
