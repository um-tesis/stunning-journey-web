import {useState, useCallback, useEffect} from 'react';

export type AsyncHookProps = {
  execute: (...args: any) => Promise<void>;
  status: 'idle' | 'pending' | 'success' | 'error';
  value: any;
  error: any;
  reset: () => void;
};

const useAsync = <T, E = string>(
  asyncFunction: (...args: any) => Promise<T>,
  immediate = true
): AsyncHookProps => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response: any) => {
        setValue(response);
        setStatus('success');
      })
      .catch((error: any) => {
        setError(error.message && error.status ? `${error.status} - ${error.message}` : error);
        setStatus('error');
      });
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setValue(null);
    setError(null);
    setStatus('idle');
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return {execute, status, value, error, reset};
};

export default useAsync;
