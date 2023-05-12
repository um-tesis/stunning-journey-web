import {classNamesFilter} from '@/lib/utils/ui-helper';
import styles from './styles.module.scss';
import React from 'react';

type Props = {
  onChange: (e: any) => void;
  name?: string;
  value: string;
  placeholder: string;
  auxClassNames?: string;
  maxLength?: number;
};

export default function TextBox({onChange, name, value, placeholder, auxClassNames, maxLength}: Props) {
  return (
    <textarea
      className={classNamesFilter(styles.textBox, auxClassNames ?? '')}
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength || 500}
    ></textarea>
  );
}
