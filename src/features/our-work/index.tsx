import OurWorkSteps from './our-work-steps';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import styles from './styles.module.scss';

const steps = [
  {
    title: 'Find a project suitable for your business',
    description:
      "Whether you're looking to support a specific cause or want to explore new projects making a difference, our curated selection of projects makes it easy to find the right fit for your business.",
    icon: ManageSearchIcon,
  },
  {
    title: 'See the impact of your donation',
    description:
      "We believe in transparency and accountability when it comes to donations. When you donate through our platform, you'll receive regular updates on the progress of the projects you support, as well as detailed reports on the impact your contribution is making. ",
    icon: CorporateFareIcon,
  },
  {
    title: 'Donate!',
    description:
      "We understand that making a donation should be a simple and secure process. That's why we've designed our platform to offer multiple payment options, making it easy to support your chosen project.",
    icon: VolunteerActivismIcon,
  },
];

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
