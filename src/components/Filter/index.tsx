import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import styles from './Filter.module.scss';
import { todoItem } from '../../App';
import { useMemo } from 'react';
import FilterList from './FilterList';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// const FILTERS_ITEMS = [
//   { id: 'all', label: 'All', iconPath: '/icons/inbox.png' },
//   { id: 'important', label: 'Impotant', iconPath: '/icons/flag.png' },
//   { id: 'completed', label: 'Completed', iconPath: '/icons/check.png' },
//   { id: 'deleted', label: 'Deleted', iconPath: '/icons/delete.png' },
// ];

type FilterProps = {
  filterItemId: string;
  setFilterItemId: React.Dispatch<React.SetStateAction<string>>;
  todoList: Array<todoItem>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};
function Filter({
  filterItemId,
  setFilterItemId,
  todoList,
  searchText,
  setSearchText,
}: FilterProps) {
  const countFilterType: { [key: string]: number } = useMemo(() => {
    return todoList.reduce(
      (acc, item) => {
        let newAcc = { ...acc };
        if (item.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (item.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (item.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }
        return newAcc;
      },
      { all: todoList.length, important: 0, completed: 0, deleted: 0 }
    );
  }, [todoList]);

  const handleChanges = (e: { target: { value: string } }) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchText}
            onChange={handleChanges}
          />
        </Search>
      </div>
      <FilterList
        countFilterType={countFilterType}
        filterItemId={filterItemId}
        setFilterItemId={setFilterItemId}
      />
      {/* <div className={styles.filterContainer}>
        {FILTERS_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`${styles.filterItem} ${
              filterItemId === item.id ? styles.selected : ''
            }`}
            onClick={() => setFilterItemId(item.id)}
          >
            <div className={styles.filterName}>
              <img src={item.iconPath} alt="" />
              <p>{item.label}</p>
            </div>
            <p>{countFilterType[item.id]}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Filter;
