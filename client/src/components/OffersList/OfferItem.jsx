import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from './Offers.module.sass';

const OfferItem = ({ offer, moderateOffer }) => {
  const { moderatorStatus } = offer;
  const resolveOffer = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            moderateOffer(CONSTANTS.OFFER_STATUS_MODERATOR_APPROVED, offer.id),
        },
        { label: 'No' },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            moderateOffer(CONSTANTS.OFFER_STATUS_MODERATOR_REJECTED, offer.id),
        },
        { label: 'No' },
      ],
    });
  };

  const offerStatus = () => {
    if (moderatorStatus === CONSTANTS.OFFER_STATUS_MODERATOR_REJECTED) {
      return (
        <i
          className={classNames('fas fa-times-circle reject', styles.reject)}
        />
      );
    }
    if (moderatorStatus === CONSTANTS.OFFER_STATUS_MODERATOR_APPROVED) {
      return (
        <i
          className={classNames('fas fa-check-circle resolve', styles.resolve)}
        />
      );
    }
    return null;
  };

  return (
   <div className={styles.wrapperItem}>
  {offerStatus()}
  <div className={styles.wrapperInfo}>
    <div className={styles.contestInfo}>
      <p><strong>Contest:</strong> {offer.Contest.title}</p>
      <p><strong>Industry:</strong> {offer.Contest.industry}</p>
      {offer.Contest?.brandStyle && <p><strong>Style name:</strong> {offer.Contest.brandStyle}</p>}
      {offer.Contest?.styleName && <p><strong>Brand style:</strong> {offer.Contest.styleName}</p>}
    </div>
    <div className={styles.offerContent}>
      {offer.text && <p>{offer.text}</p>}
      {offer.fileName && <img className={styles.img} src={`${CONSTANTS.publicURL}/${offer.fileName}`} alt="offer" />}
    </div>
  </div>
  {moderatorStatus === CONSTANTS.OFFER_STATUS_MODERATOR_PENDING && (
    <div className={styles.btnsContainer}>
      <button className={styles.resolveBtn} onClick={resolveOffer}>Approve</button>
      <button className={styles.rejectBtn} onClick={rejectOffer}>Reject</button>
    </div>
  )}
</div>

  );
};

export default OfferItem;
