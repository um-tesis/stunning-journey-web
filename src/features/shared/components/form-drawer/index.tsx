import React, {ReactNode} from 'react';
import Drawer from '../drawer';
import styles from './styles.module.scss';
import PrimaryButton from '../primary-button';
import CloseIcon from '@mui/icons-material/Close';
import {classNamesFilter} from '@/lib/utils/ui-helper';

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  submitButtonText: string;
  isOpen: boolean;
  onCloseDrawer: () => void;
  canSubmit: boolean;
  onSubmit: () => void;
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
      <div className={styles.drawerHeader}>
        <div className={styles.crossButtonContainer}>
          <CloseIcon onClick={onCloseDrawer} />
        </div>

        <h3 className={styles.title}>{title}</h3>

        {subtitle && <h4 className={classNamesFilter(styles.subtitle)}>{subtitle}</h4>}

        {description && (
          <p
            className={classNamesFilter(styles.description)}
            dangerouslySetInnerHTML={{__html: description}}
          />
        )}
      </div>

      <div className={styles.contentContainer}>{children}</div>

      <div className={styles.drawerFooter}>
        <PrimaryButton disabled={!canSubmit} onClick={onSubmit} auxClassNames={styles.submitButton}>
          {submitButtonText}
        </PrimaryButton>
      </div>
    </Drawer>
  );
}
