import React from 'react';
import { PromoDto } from '../../../../../common/promoTypes';
import { GetStartedButton } from '../../../common/components/Button';
import '../../../common/styles/styles.css';

interface PromoProps {
  promo: PromoDto;
  countdown: number;
}

const Promo: React.FC<PromoProps> = ({ promo, countdown }) => {
  const formatTime = (time: number): string => {
    const days = Math.floor(time / 86400000);
    let pluralDays = days > 1 ? 'days' : 'day';
    const hoursInMilliSecs = time - (86400000 * days);
    const hours = Math.floor(hoursInMilliSecs / 3600000);
    let pluralHours = hours > 1 ? 'hours' : 'hour';
    const minutesInMilliSecs = hoursInMilliSecs - (hours * 3600000);
    const minutes = Math.floor(minutesInMilliSecs / 60000);
    const secondsInMilliSecs = minutesInMilliSecs - (minutes * 60000);
    const seconds = Math.floor(secondsInMilliSecs / 1000);

    return `${days.toString()} ${pluralDays}: ${hours.toString()} ${pluralHours}: ${minutes.toString()} minutes : ${seconds.toString()} seconds`;
  };

  return (
    <div>
      <div className='px-4'>
        <div className='text-center'>
          <div className='d-flex flex-column align-items-center'>
            <h2>Promotional Offer</h2>
            <div className='primary-line mb-2'></div>
          </div>
          <div className='py-3'>
            <h5>We are pleased to announce a promotional offer!</h5>
            <h5 className='mb-4'>{`Investing before the timer expires results in a ${promo.bonusPercent}% boost in your return on investment.`}</h5>
            <h6>{formatTime(countdown)}</h6>
            <small className='smallest-font mb-2'>**Time remaining till offer close.</small>
            <div className='d-flex justify-content-center'>
              <div className='button-width-narrower'>
                <GetStartedButton/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promo;
