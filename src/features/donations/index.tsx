import {useState} from 'react';
import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import TabBar from '../shared/components/tab-bar';
import SingleDonationTable from './single-donation-table';
import {Grid, Typography} from '@mui/material';
import SubscriptionsTable from './subscriptions-table';

type Props = {
  user: UserData;
};

export default function Donations({user}: Props) {
  const [selectedSection, setSelectedSection] = useState<number>(0);
  const navSections = [
    {key: 0, value: 'Donaciones Puntuales'},
    {key: 1, value: 'Subscripciones'},
  ];

  const title = selectedSection === 0 ? 'Donaciones' : 'Subscripciones';

  return (
    <div className={styles.donationsContainer}>
      <TabBar
        sections={navSections}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        auxClassNames={styles.donationsTabBar}
      />
      <Grid container spacing={5} justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h3' fontWeight='bold' color='primary' className={styles.title}>
            {title}
          </Typography>
        </Grid>
        {selectedSection === 0 && <SingleDonationTable user={user} />}
        {selectedSection === 1 && <SubscriptionsTable user={user} />}
      </Grid>
    </div>
  );
}
