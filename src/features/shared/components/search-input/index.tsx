import {classNamesFilter} from '@/lib/utils/ui-helper';
import {Container, InputAdornment, TextField} from '@mui/material';
import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';

import styles from './styles.module.scss';
import PrimaryButton from '../primary-button';

type SearchInputProps = {
  searchTerm: string;
  handleChange: (e: any) => void;
};

export default function SearchInput({searchTerm, handleChange}: SearchInputProps) {
  return (
    <Container maxWidth='md' sx={{border: '0px'}}>
      <TextField
        id='search'
        type='search'
        value={searchTerm}
        onChange={handleChange}
        sx={{
          width: 400,
          backgroundColor: '#F9F9FF',
          borderRadius: 10,
          // remove border for every child
          '& > *': {border: '0px !important'},
        }}
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <PrimaryButton>Search</PrimaryButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}
