import { useEffect, useState } from "react";

export const useFetch = (url, header) => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch();
      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (errors) {
      setErrors(errors);
    }
  };

  useEffect(()=> {
    fetchData()
  }, [url, header])
  
  return { data, isLoading, errors };
};
