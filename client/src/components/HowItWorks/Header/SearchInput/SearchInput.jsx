import styles from './SearchInput.module.sass';

const SearchInput = () => {
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Search Over 300,000+ Premium Names"
      />
      <button className={styles.searchBtn}>
        <span></span>
      </button>
    </div>
  );
};

export default SearchInput;
