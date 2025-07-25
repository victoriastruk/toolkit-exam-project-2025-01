import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import styles from './HeaderNavigation.module.sass';

const MenuItem = ({ item }) => {
  return (
    <li className={styles.menuItem}>
      <span>{item.title}</span>
      <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
      <ul>
        {item.items.map(({ title, url, isLast }) => (
          <li key={title} className={isLast ? styles.last : ''}>
            <Link to={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuItem;
