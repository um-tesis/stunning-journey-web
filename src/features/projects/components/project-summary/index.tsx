import styles from './styles.module.scss';

type Props = {
  project: any;
};

export default function ProjectSummary({project}: Props) {
  console.log('summary', project);

  return (
    <div>
      <div>Project Title</div>
      <div>Project Description</div>
    </div>
  );
}
