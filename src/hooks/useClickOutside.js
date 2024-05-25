import { useEffect, useRef } from "react";

function useClickOutside(handleClick, listenCapture = true) {
  const ref = useRef();

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) handleClick();
    }

    document.addEventListener("click", handler, listenCapture);

    return () => {
      document.removeEventListener("click", handler, listenCapture);
    };
  }, [handleClick, listenCapture]);

  return ref;
}

export default useClickOutside;
