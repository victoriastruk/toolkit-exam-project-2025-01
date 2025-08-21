import styles from './Search.module.sass';

const Search = () => {
  return (
    <>
      <div className={styles.searchForm}>
        <div className={styles.icon}></div>
        <input type="text" placeholder="Search Over 300,000+ Premium Names" />
        <button>
          <span></span>
        </button>
      </div>
      <div className={styles.listTags}>
        <a href="#">Tech</a>
        <a href="#">Clothing</a>
        <a href="#">Finance</a>
        <a href="#">Real Estate</a>
        <a href="#">Crypto</a>
        <a href="#">Short</a>
        <a href="#">One Word</a>
      </div>
    </>
  );
};

export default Search;
