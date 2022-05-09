// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const getNewFetchState = ({ result, isLoading, error } = {}) => ({
  result: result || null,
  isLoading: isLoading || false,
  error: error || null,
});

export const RESPONSE_REPRESENTATIONS = {
  ARRAY_BUFFER: 'arrayBuffer',
  BLOB: 'blob',
  FORM_DATA: 'formData',
  JSON: 'json',
  TEXT: 'text',
};

const useFetch = ({
  filePath,
  responseRepresentation = RESPONSE_REPRESENTATIONS.TEXT,
}) => {
  const [fetchState, setFetchState] = useState(
    getNewFetchState({ isLoading: true }),
  );

  useEffect(() => {
    (async () => {
      try {
        setFetchState(getNewFetchState({ isLoading: true }));
        const result = await fetch(filePath);
        setFetchState(
          getNewFetchState({ result: await result[responseRepresentation]() }),
        );
      } catch (error) {
        setFetchState(getNewFetchState({ error }));
      }
    })();
  }, [setFetchState]);

  if (fetchState.error) {
    throw fetchState.error;
  }

  return fetchState;
};

export default useFetch;
