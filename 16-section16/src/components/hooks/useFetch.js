import { useEffect, useState } from "react";
export function useFetch(fetchfn, intialValue) {
  const [Data, setData] = useState(intialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const places = await fetchfn();
        setData(places);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch Data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchfn]);
  return {
    Data,
    isFetching,
    error,
    setData,
    setIsFetching,
  };
}
