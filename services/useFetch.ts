// Global custom hook
import { useEffect, useState } from "react";

const useFetch = (fetchFunction: () => Promise<any>, autoFetch: boolean = true) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try{
      setIsPending(true);
      setError(null);

      const response = await fetchFunction();
      setData(response);
    }catch (error: any) {
      setError(error);
      setIsPending(false);
    }finally{
      setIsPending(false);
    }
  }

  const reset = () => {
    setData(null);
    setError(null);
    setIsPending(false);
  };

  useEffect(() => {
    if(autoFetch){
      fetchData();
    }
  }, [autoFetch]);

  return {
    data,
    isPending,
    error,
    refetch:fetchData,
    reset
  }
}

export default useFetch;