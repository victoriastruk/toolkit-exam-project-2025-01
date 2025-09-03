import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOffers, moderateOffer } from '../../store/slices/contestByIdSlice';
import OffersList from '../../components/OffersList/OffersList';
import LoadMoreButton from '../../components/LearnMoreButton/LearnMoreButton';

import styles from './ReviewOffersPage.module.sass';

const ReviewOffersPage = () => {
  const dispatch = useDispatch();
  const { offers, status, isFetching, haveMore } = useSelector(
    (state) => state.contestByIdStore
  );
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getOffers({ limit: 5, offset: page * 5 }));
  }, [page, dispatch]);

  if (isFetching && page === 0) return <div>Loading...</div>;

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Pending Offers</h1>
      <OffersList
        offers={offers}
        status={status}
        className={styles.offersContainer}
        moderateOffer={(command, offerId) =>
          dispatch(moderateOffer({ command, offerId }))
        }
      />
      {haveMore && <LoadMoreButton onClick={() => setPage(page + 1)} />}
    </div>
  );
};

export default ReviewOffersPage;
