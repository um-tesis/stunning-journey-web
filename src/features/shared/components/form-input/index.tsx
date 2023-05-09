import {classNamesFilter} from '@/lib/utils/ui-helper';
import styles from './styles.module.scss';
import {FC, useState} from 'react';
import {FieldError} from 'react-hook-form';

type Props = {
  label?: string;
  value?: string | number;
  name?: string;
  handleChange?: (event: any) => any;
  type?: 'text' | 'password' | 'email' | 'number';
  error?: FieldError | string;
  optional?: boolean;
  unit?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  [x: string]: any;
};

const FormInput: FC<Props> = ({
  name,
  handleChange,
  value,
  label,
  type = 'text',
  error,
  className,
  optional = false,
  unit,
  disabled = false,
  size = 'lg',
  ...otherProps
}) => {
  const [hidePassword, setHidePassword] = useState(type === 'password');

  const inputType = type === 'password' && !hidePassword ? 'text' : type;
  // If we show the unit label or the eye icon, shorten the input so it doesn't overlap them
  const shortInput = unit || type === 'password';

  return (
    <div className={classNamesFilter(styles.container, styles[size], className)}>
      <div className={styles.group}>
        <input
          name={name}
          className={classNamesFilter(
            styles.input,
            disabled && styles.disabled,
            error && styles.error,
            shortInput && styles.shortInput
          )}
          value={value || ''}
          type={inputType}
          onChange={handleChange}
          disabled={disabled}
          {...otherProps}
        />

        {type === 'password' && (
          <i
            className={classNamesFilter(!hidePassword && styles.active)}
            onClick={() => setHidePassword((state) => !state)}
          />
        )}

        {label && <label className={classNamesFilter(styles.label, !!value && styles.shrink)}>{label}</label>}

        {error && (
          <span className={styles.errorLabel}>{typeof error === 'string' ? error : error.message}</span>
        )}

        {!error && optional && <label className={styles.optionalLabel}>&#40;Optional&#41;</label>}

        {type !== 'password' && unit && (
          <label className={classNamesFilter(styles.unitLabel, !!value && styles.show)}>{unit}</label>
        )}
      </div>
    </div>
  );
};

export default FormInput;
