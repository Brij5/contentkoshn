import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ConnectionError from './ConnectionError';
import ErrorFallback from './ErrorFallback';

const withApiHandler = (WrappedComponent) => {
  return function WithApiHandlerComponent(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isConnectionError, setIsConnectionError] = useState(false);

    const handleApiCall = async (apiCall, onSuccess) => {
      try {
        setIsLoading(true);
        setError(null);
        setIsConnectionError(false);
        
        const result = await apiCall();
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (err) {
        if (!navigator.onLine || err.message === 'Failed to fetch') {
          setIsConnectionError(true);
        } else {
          setError(err);
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    const resetError = () => {
      setError(null);
      setIsConnectionError(false);
    };

    if (isLoading) {
      return <LoadingSpinner fullScreen text="Loading..." />;
    }

    if (isConnectionError) {
      return <ConnectionError onRetry={resetError} />;
    }

    if (error) {
      return <ErrorFallback error={error} resetErrorBoundary={resetError} />;
    }

    return (
      <WrappedComponent
        {...props}
        handleApiCall={handleApiCall}
        isLoading={isLoading}
        error={error}
      />
    );
  };
};

export default withApiHandler; 