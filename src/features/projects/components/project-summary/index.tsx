import styles from './styles.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import TabBar from '@/features/shared/components/tab-bar';
import ProjectInformationCard from '../project-information-card';
import VolunteeringInformationCard from '../volunteering-information-card';
import {Box, IconButton} from '@mui/material';
import {Share as ShareIcon} from '@mui/icons-material';
import useCopyToClipboard from '@/lib/hooks/useCopyToClipboard';
import ProjectMetrics from '../project-metrics';
import ProjectSingleDonations from '../project-single-donations';
import ProjectSubscriptions from '../project-subscriptions';

type Props = {
  project: any;
  handleOpenUpdateProjectDrawer: () => void;
};

export default function ProjectSummary({project, handleOpenUpdateProjectDrawer}: Props) {
  const [_, copy] = useCopyToClipboard();

  const [selectedSection, setSelectedSection] = useState<number>(0);

  const {name, description, coverPhoto, acceptsVolunteers, organizationId} = project;

  const navSections = [
    {key: 0, value: 'Información del Proyecto'},
    {key: 1, value: 'Métricas'},
    {key: 2, value: 'Donaciones Puntuales'},
    {key: 3, value: 'Suscripciones'},
    acceptsVolunteers && {key: 4, value: 'Voluntariado'},
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
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor='rgba(0, 0, 0, 0.37)'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        />
        <CardContent className={styles.content}>
          <Typography className={styles.title} variant='h6' component='h3'>
            {name}
          </Typography>
          <Typography className={styles.description} variant='body2' component='p'>
            {description}
          </Typography>
          <IconButton className={styles.copyToClipboard} onClick={handleCopyToClipboard}>
            <ShareIcon />
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
      {selectedSection === 1 && <ProjectMetrics project={project} />}
      {selectedSection === 2 && <ProjectSingleDonations projectId={project.id} />}
      {selectedSection === 3 && <ProjectSubscriptions projectId={project.id} />}
      {selectedSection === 4 && (
        <VolunteeringInformationCard projectId={project.id} organizationId={project.organizationId} />
      )}
    </div>
  );
}
