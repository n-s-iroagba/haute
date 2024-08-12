import { useState, useEffect } from "react";
import { getPromoRemainingTime } from "../helpers/helpers";
import { PromoDto } from "../../../../../common/promoTypes";
import { getAdPromo } from "../../promo/helpers/promoApiHelpers";

export const useGetAdvertPromo = () => {
  const [promo, setPromo] = useState<PromoDto | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const receivedPromo = await getAdPromo();
        if (receivedPromo) {
          setPromo(receivedPromo);
          const remainingHours: number | null = getPromoRemainingTime(receivedPromo.startDate, receivedPromo.endDate);
          if (typeof remainingHours === 'number') {
            setCountdown(remainingHours);
          }
        }
      } catch (error) {
        console.error('Error fetching promo:', error);
      }
    };

    fetchPromoData();
  }, []);

  useEffect(() => {
    if (countdown !== null) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown !== null ? prevCountdown - 1000 : null));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  return { promo, countdown };
};

export default useGetAdvertPromo;
