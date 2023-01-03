import {useState, useEffect} from "react";

interface ISize {
    width: number;
    height: number;
}

export const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState<ISize>({
        width: 0,
        height: 0,
    });

    useEffect(() => {

        function handleResize() {

            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default useWindowSize;