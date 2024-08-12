import { useEffect, useState } from "react";

const useIsLargeScreen = () =>{
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isLargeScreen;
}
export default useIsLargeScreen