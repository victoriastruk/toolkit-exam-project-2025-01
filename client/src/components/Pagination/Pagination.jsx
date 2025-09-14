import React from 'react';
import BackButton from '../BackButton/BackButton';
import NextButton from '../NextButton/NextButton';
import styles from './Pagination.module.sass';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <BackButton
        submit={() => onPageChange(page - 1)}
        disabled={page === 1}
      />
      <span>
        Page {page} of {totalPages}
      </span>
      <NextButton
        submit={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      />
    </div>
  );
};

export default Pagination;
