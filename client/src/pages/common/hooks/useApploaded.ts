
import { useEffect, useState } from 'react';

const useAppLoaded = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('cassockVisitToken');

    if (token) {
      localStorage.removeItem('cassockVisitToken');
      setIsLoaded(true);
      return;
    } else {
      localStorage.setItem('cassockVisitToken', 'token');
    }

    const handleLoad = () => {
      setIsLoaded(true);
    };

    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Add event listener to handle when the document is fully loaded
      window.addEventListener('load', handleLoad);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return isLoaded;
};

export default useAppLoaded;


