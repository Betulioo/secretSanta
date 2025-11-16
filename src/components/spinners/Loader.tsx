import { useEffect, useRef, useState } from "react"


interface Props {
    loading: boolean;
};

export const Loader:React.FC<Props> = ({loading}) =>{
const [isLoading, setIsLoading] = useState<Boolean>(loading);
const isMounted = useRef<boolean>(false);

useEffect(() => {
    isMounted.current = true;
    return () => {
        isMounted.current = false;
    };
}, []);

    useEffect(() => {
        if (isMounted.current) {
            setIsLoading(loading);
        } else {
            setIsLoading(loading);
        }
    }, [loading]);

    if (!isLoading) return null;
    
    return    (
      <div className="relative m-auto">
        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-red-600 border-dashed"></div> */}
            <img src="/star.png" alt="" className="animate-spin" />
      </div>)
}