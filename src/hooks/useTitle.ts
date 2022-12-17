import { useRef, useEffect } from "react";

const MAIN_TITLE = 'Foodie Love';

function useTitle(title: string): void {
    const previousTitle = useRef<string>(document?.title ?? 'Foodie Love');

    useEffect(() => {
        if (typeof document === 'undefined') return; 

        document.title = !title || title === MAIN_TITLE 
                    ? MAIN_TITLE 
                    : `${MAIN_TITLE} | ${title}`;

        return () => {
            document.title = previousTitle.current;
        }
    }, []);

};

export default useTitle; 