import styles from '../Filter.module.scss';
type FilterListProps = {
  countFilterType: {
    [key: string]: number;
  };
  filterItemId: string;
  setFilterItemId: React.Dispatch<React.SetStateAction<string>>;
};

const FILTERS_ITEMS = [
  { id: 'all', label: 'All', iconPath: '/icons/inbox.png' },
  { id: 'important', label: 'Impotant', iconPath: '/icons/flag.png' },
  { id: 'completed', label: 'Completed', iconPath: '/icons/check.png' },
  { id: 'deleted', label: 'Deleted', iconPath: '/icons/delete.png' },
];

function FilterList({
  countFilterType,
  filterItemId,
  setFilterItemId,
}: FilterListProps) {
  return (
    <div className={styles.filterContainer}>
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
    </div>
  );
}

export default FilterList;
