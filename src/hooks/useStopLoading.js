import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// export default (loading) => {
//   const [status, setStatus] = useState(loading);
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   console.log(isOnline);

//   useEffect(() => {
//     const checkNetworkSpeed = async () => {
//       const startTime = new Date().getTime();

//       try {
//         if (!isOnline)
//           return toast.error("You are not connected to the internet");
//         await fetch("https://google.com/favicon.png");
//         const endTime = new Date().getTime();
//         const elapsedTime = endTime - startTime;

//         if (elapsedTime > 10000 && loading) {
//           setStatus(false);
//           toast.error("Slow connection detected. Try again");
//         }
//       } catch (error) {
//         toast.error("Unable to connect to server");
//       }
//     };

//     const loadingTimeout = setTimeout(() => {
//       setStatus(loading);

//       window.addEventListener("online", setIsOnline(true));
//       window.addEventListener("offline", setIsOnline(false));
//       checkNetworkSpeed();
//     }, 5000);

//     return () => {
//       window.removeEventListener("online", setIsOnline(true));
//       window.removeEventListener("offline", setIsOnline(false));
//       clearTimeout(loadingTimeout);
//     };
//   }, [loading, isOnline, status]);

//   return status;
// };

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
