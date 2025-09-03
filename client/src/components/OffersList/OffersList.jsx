import React from 'react';
import OfferItem from './OfferItem';
import styles from './Offers.module.sass'

const OffersList = ({ offers, status, moderateOffer }) => {
  return (
    <div className={styles.offersWrapper}>
      {offers.map(offer => (
        <OfferItem
          key={offer.id}
          offer={offer}
          status={status}
          moderateOffer={moderateOffer}
        />
      ))}
    </div>
  );
};

export default OffersList;
