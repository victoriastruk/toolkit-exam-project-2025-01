import styles from './HeaderNavigation.module.sass';
import CONSTANTS from '../../../constants';

const MenuItem = ({ item }) => {
  return (
    <li className={styles.menuItem}>
      <span>{item.title}</span>
      <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
      <ul>
        {item.items.map(({ title, url, isLast }) => (
          <li key={title} className={isLast ? styles.last : ''}>
            <a href={url}>{title}</a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuItem;
