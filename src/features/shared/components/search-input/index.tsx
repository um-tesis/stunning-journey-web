import {Grid, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PrimaryButton from '../primary-button';
import {styled, alpha} from '@mui/material/styles';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: 30,
  backgroundColor: alpha(theme.palette.common.white, 0.7),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  minWidth: 250,
  width: '100%',
  height: '100% !important',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: 44,
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

type SearchInputProps = {
  searchTerm: string;
  handleChange: (e: any) => void;
  handleSearch: () => void;
};

export default function SearchInput({searchTerm, handleChange, handleSearch}: SearchInputProps) {
  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item>
        <Search>
          <SearchIconWrapper>
            <SearchIcon color='primary' />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='e.g. Oratorio Tacurú'
            inputProps={{'aria-label': 'search'}}
            id='search'
            type='search'
            value={searchTerm}
            onChange={handleChange}
          />
        </Search>
      </Grid>
      <Grid item>
        <PrimaryButton onClick={handleSearch}>Buscar</PrimaryButton>
      </Grid>
    </Grid>
  );
}
