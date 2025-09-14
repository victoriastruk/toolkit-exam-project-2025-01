import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getOffers, moderateOffer } from '../../store/slices/contestByIdSlice';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import OffersList from '../../components/OffersList/OffersList';
import Pagination from '../../components/Pagination/Pagination';
import styles from './ReviewOffersPage.module.sass';

const ReviewOffersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { offers, status, error, isFetching, totalCount } = useSelector(
    (state) => state.contestByIdStore
  );

  const limit = 5;
  const totalPages = Math.max(1, Math.ceil((totalCount || 0) / limit));

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const safePageFromUrl = Number.isNaN(pageFromUrl) ? 1 : Math.max(1, pageFromUrl);
  const [page, setPage] = useState(safePageFromUrl);

  useEffect(() => {
    const offset = (page - 1) * limit;
    dispatch(getOffers({ limit, offset }));

    if (page === 1) setSearchParams({});
    else setSearchParams({ page });
  }, [page, dispatch, setSearchParams]);

  const handleModerateOffer = (command, offerId) => {
    dispatch(moderateOffer({ command, offerId }));
  };

  return (
    <div className={styles.mainContainer}>
      {isFetching && offers.length === 0 ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : error ? (
        <div className={styles.tryContainer}>
          <TryAgain getData={() => dispatch(getOffers({ limit, offset: (page - 1) * limit }))} />
        </div>
      ) : (
        <>
          <h1 className={styles.title}>Pending Offers</h1>
          <OffersList
            offers={offers}
            status={status}
            className={styles.offersContainer}
            moderateOffer={handleModerateOffer}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default ReviewOffersPage;
