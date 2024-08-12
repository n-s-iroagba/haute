import React from 'react';
import Promo from '../components/Promo';
import useGetAdvertPromo from '../hooks/useGetAdvertPromo';


const PromoAdvert: React.FC = () => {
  const { promo, countdown } = useGetAdvertPromo();

  return <>{promo && countdown !== null && <Promo promo={promo} countdown={countdown} />}</>;
};

export default PromoAdvert;
