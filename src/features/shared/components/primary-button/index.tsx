import {classNamesFilter} from '@/lib/utils/ui-helper';
import {Button} from '@mui/material';

import styles from './styles.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  inverted?: boolean;
  auxClassNames?: string;
  hideOutlined?: boolean;
};

export default function PrimaryButton({
  children,
  inverted,
  hideOutlined,
  onClick,
  auxClassNames,
}: ButtonProps) {
  return (
    <Button
      variant={'outlined'}
      color='primary'
      onClick={onClick}
      className={classNamesFilter(
        styles.primaryButton,
        inverted && styles.inverted,
        hideOutlined && styles.hideOutlined,
        auxClassNames ?? ''
      )}
    >
      {children}
    </Button>
  );
}
