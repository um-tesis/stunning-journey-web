import OurWorkSteps from './our-work-steps';
import {steps} from './steps-helper';
import styles from './styles.module.scss';

export default function OurWork() {
  return (
    <div className={styles.ourWork}>
      <div className={styles.upperTitle}>ABOUT Our process</div>
      <div className={styles.title}>Get started as easy as 1, 2, 3</div>
      <div className={styles.subtitle}>
        Join the Giving Revolution with Libera: Three Simple Steps to Make a Difference Today
      </div>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <OurWorkSteps
            key={index}
            title={step.title}
            description={step.description}
            Icon={<step.icon className={styles.stepIcon} />}
          />
        ))}
      </div>
    </div>
  );
}
