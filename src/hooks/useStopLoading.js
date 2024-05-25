import { useEffect, useState } from "react";

export default (loading) => {
  const [status, setStatus] = useState(loading);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setStatus(loading);
      if (loading) setStatus(false);
    }, 10000);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [loading, status]);

  return status;
};
