import styles from './styles.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import TabBar from '@/features/shared/components/tab-bar';
import ProjectInformationCard from '../project-information-card';
import VolunteeringInformationCard from '../volunteering-information-card';
import {IconButton} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopyToClipboard from '@/lib/hooks/useCopyToClipboard';
import ProjectMetrics from '../project-metrics';

type Props = {
  project: any;
  handleOpenUpdateProjectDrawer: () => void;
};

export default function ProjectSummary({project, handleOpenUpdateProjectDrawer}: Props) {
  const [_, copy] = useCopyToClipboard();

  const [selectedSection, setSelectedSection] = useState<number>(0);

  const {name, description, coverPhoto, acceptsVolunteers} = project;

  const navSections = [
    {key: 0, value: 'Información del Proyecto'},
    {key: 1, value: 'Métricas'},
    acceptsVolunteers && {key: 2, value: 'Voluntariado'},
  ];

  const handleCopyToClipboard = () => {
    copy(window.location.href);
  };

  return (
    <div className={styles.projectContainer}>
      <Card
        className={styles.projectHeader}
        sx={{backgroundImage: `url(${coverPhoto ? coverPhoto : '/collaboration.jpeg'})`}}
      >
        <div className={styles.overlay} />
        <CardContent className={styles.content}>
          <Typography className={styles.title} variant='h6' component='h3'>
            {name}
          </Typography>
          <Typography className={styles.description} variant='body2' component='p'>
            {description}
          </Typography>
          <IconButton className={styles.copyToClipboard} onClick={handleCopyToClipboard}>
            <ContentCopyIcon />
          </IconButton>
        </CardContent>
      </Card>
      <br />
      <TabBar
        sections={navSections}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <br />
      {selectedSection === 0 && (
        <ProjectInformationCard
          project={project}
          handleOpenUpdateProjectDrawer={handleOpenUpdateProjectDrawer}
        />
      )}
      {selectedSection === 1 && <ProjectMetrics />}
      {selectedSection === 2 && (
        <VolunteeringInformationCard projectId={project.id} organizationId={project.organizationId} />
      )}
    </div>
  );
}
