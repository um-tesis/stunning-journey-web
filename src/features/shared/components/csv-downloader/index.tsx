import styles from './styles.module.scss';
import React from 'react';
import {CSVLink} from 'react-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {useRef, useEffect} from 'react';
import {IconButton} from '@mui/material';

type Props = {
  data: any[];
  columnLabels: {label: string; key: string}[];
  handleDownload: () => void;
  filename: string;
};

export default function CsvDownloader({data, columnLabels, handleDownload, filename}: Props) {
  const csvLink = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      // @ts-ignore
      csvLink.current.link.click();
    }
  }, [data]);

  return (
    <>
      <CSVLink data={data} headers={columnLabels} ref={csvLink} filename={filename} asyncOnClick></CSVLink>
      <IconButton onClick={handleDownload}>
        <FileDownloadIcon className={styles.iconButton} />
      </IconButton>
    </>
  );
}
