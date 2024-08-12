import { useEffect, useRef, useState } from 'react';

const useComponentVisibility = (clientMaxCount:number, clientIncrement:number, assetMaxCount:number, assetIncrement:number) => {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [clientCount, setClientCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsComponentVisible(true);
        } else {
          setIsComponentVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let clientIntervalId:any;
    let assetIntervalId: any;

    if (isComponentVisible) {
      clientIntervalId = setInterval(() => {
        setClientCount((prevCounter) => (prevCounter < clientMaxCount ? prevCounter + clientIncrement : prevCounter));
      }, 35);

      assetIntervalId = setInterval(() => {
        setAssetCount((prevCounter) => (prevCounter < assetMaxCount ? prevCounter + assetIncrement : prevCounter));
      }, 35);
    } else {
      clearInterval(clientIntervalId);
      clearInterval(assetIntervalId);
    }

    return () => {
      clearInterval(clientIntervalId);
      clearInterval(assetIntervalId);
    };
  }, [isComponentVisible, clientMaxCount, clientIncrement, assetMaxCount, assetIncrement]);

  return { componentRef, clientCount, assetCount };
};

export default useComponentVisibility;
