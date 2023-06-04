import React, {ReactNode} from 'react';
import Drawer from '../drawer';
import PrimaryButton from '../primary-button';
import CloseIcon from '@mui/icons-material/Close';
import {Grid, IconButton, Typography} from '@mui/material';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  submitButtonText: string;
  isOpen: boolean;
  onCloseDrawer: () => void;
  canSubmit: boolean;
  onSubmit: () => Promise<void>;
};

export default function FormDrawer({
  children,
  title,
  subtitle,
  description,
  submitButtonText,
  isOpen,
  onCloseDrawer,
  canSubmit,
  onSubmit,
}: Props) {
  return (
    <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
      <Grid container padding={5} spacing={3}>
        <Grid container item xs={12} justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h4' color='primary'>
              {title}
            </Typography>
            {subtitle && <Typography variant='subtitle2'>{subtitle}</Typography>}
          </Grid>
          <Grid item>
            <IconButton onClick={onCloseDrawer} color='primary' size='large'>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          </Grid>
        </Grid>

        {description && (
          <Grid item xs={12}>
            <Typography variant='body1'>{description}</Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <PrimaryButton disabled={!canSubmit} onClick={onSubmit} auxClassNames={styles.submitButton}>
            {submitButtonText}
          </PrimaryButton>
        </Grid>
      </Grid>
    </Drawer>
  );
}
