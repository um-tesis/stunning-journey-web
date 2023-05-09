import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './styles.module.scss';

type Props = {
  data: any[];
  columnLabels: string[];
  onClickRow?: (row: any) => void;
};

export default function CustomTable({data, columnLabels, onClickRow}: Props) {
  const getObjectKeys = (object: object) => {
    return Object.keys(object).filter((key) => key !== '__typename');
  };

  const rows = data.map((item: any) => {
    const keys = getObjectKeys(item);
    return keys.reduce((acc: any, key: string) => {
      acc[key] = item[key];
      return acc;
    }, {});
  });

  const handleRowClick = (index: number) => {
    const row = rows[index];
    onClickRow && onClickRow(row);
  };

  return (
    <TableContainer>
      <Table aria-label='simple table' className={styles.table}>
        <TableHead>
          <TableRow>
            {columnLabels.map((label) => (
              <TableCell
                key={label}
                align='left'
                sx={{
                  color: '#333',
                  fontWeight: 'bold',
                }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
              className={styles.data}
              onClick={() => handleRowClick(index)}
            >
              {getObjectKeys(row).map((key) => (
                <TableCell
                  key={key}
                  component={key === columnLabels[0] ? 'th' : 'td'}
                  scope={key === columnLabels[0] ? 'row' : undefined}
                  align='left'
                >
                  {row[key] || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
