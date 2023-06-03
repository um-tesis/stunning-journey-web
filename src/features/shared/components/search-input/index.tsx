import {Container, InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles.module.scss';
import PrimaryButton from '../primary-button';

type SearchInputProps = {
  searchTerm: string;
  handleChange: (e: any) => void;
  handleSearch: () => void;
};

export default function SearchInput({searchTerm, handleChange, handleSearch}: SearchInputProps) {
  return (
    <Container maxWidth='md'>
      <TextField
        id='search'
        type='search'
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleChange}
        sx={{
          width: 400,
          height: 45,
          backgroundColor: '#F9F9FF',
          borderRadius: 10,
          '& .MuiInputBase-input': {
            marginTop: 0.5,
          },
        }}
        variant='standard'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon className={styles.searchIcon} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <PrimaryButton auxClassNames={styles.searchButton} onClick={handleSearch}>
                Buscar
              </PrimaryButton>
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
      />
    </Container>
  );
}
