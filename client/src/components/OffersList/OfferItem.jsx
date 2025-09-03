import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from './Offers.module.sass';

const OfferItem = ({ offer, moderateOffer }) => {
 const {status} = offer;
  const resolveOffer = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            moderateOffer('approve', offer.id),
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
            moderateOffer('reject', offer.id),
        },
        { label: 'No' },
      ],
    });
  };

  const offerStatus = () => {
      if (status === CONSTANTS.OFFER_STATUS_MODERATOR_REJECTED) {
        return (
          <i
            className={classNames('fas fa-times-circle reject', styles.reject)}
          />
        );
      }
      if (status === CONSTANTS.OFFER_STATUS_MODERATOR_APPROVED) {
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
        <div>
          <p>Contest: {offer.Contest.title}</p>
          <p>Industry: {offer.Contest.industry}</p>
        </div>

        <div>
          {offer.text && <p>Text: {offer.text}</p>}
          {offer.fileName && (
            <img
              src={`${CONSTANTS.publicURL}/${offer.fileName}`}
              alt="offer"
              style={{ maxWidth: '150px' }}
            />
          )}
        </div>
      </div>
      {status === CONSTANTS.OFFER_STATUS_PENDING && (
        <div className={styles.btnsContainer}>
          <button className={styles.resolveBtn} onClick={resolveOffer}>
            Approve
          </button>
          <button className={styles.rejectBtn} onClick={rejectOffer}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default OfferItem;
