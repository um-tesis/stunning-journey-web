import styles from './styles.module.scss';
import {classNamesFilter} from '@utils/ui-helper';
import {Dispatch, SetStateAction} from 'react';

type Props = {
  sections: {key: number; value: string}[];
  selectedSection: number;
  setSelectedSection: Dispatch<SetStateAction<number>>;
  auxClassNames?: string;
};

export default function TabBar({sections, selectedSection, setSelectedSection, auxClassNames}: Props) {
  return (
    <div
      data-testid='tab-bar'
      id={styles.nav}
      className={classNamesFilter(styles.tabBar, auxClassNames ?? '')}
    >
      <ul>
        {sections.map((section) => (
          <li
            data-testid={`section-${section.key}`}
            className={classNamesFilter(selectedSection === section.key && styles.selected)}
            key={section.key}
            onClick={() => setSelectedSection(section.key)}
          >
            {section.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
