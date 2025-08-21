import styles from './DomainList.module.sass';

const DomainList = ({ title, items, padding, width, columns }) => {
  return (
    <div
      className={styles.topCollections}
      style={{ padding: `${padding}`, width: `${width}` }}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      <ul
        className={`${styles.listDomain} ${
          columns === 2 ? styles.twoColumns : ''
        }`}
      >
        {items.map(({ name, href = '#', bage }) => (
          <li key={name}>
            <a className={styles.listDomain_Link} href={href}>
              {name}
            </a>
            {bage && <span className={styles.popularBage}>{bage}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainList;
