import { useState } from 'react';
import { makeRequest } from '../services/api';
import { SearchRequest, SearchResponse } from '../types/api';

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SearchResponse | null>(null);

  const search = async (searchData: SearchRequest): Promise<SearchResponse | null> => {
    setError(null);
    setLoading(true);

    try {
      // Call the centralized `/search` endpoint
      const result = await makeRequest<SearchResponse>('/search', 'POST', searchData);
      setData(result); // Store the results
      return result;
    } catch (err) {
      setError('Failed to fetch search results.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { search, data, loading, error };
};

export default useSearch;
