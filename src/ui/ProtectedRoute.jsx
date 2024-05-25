import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "../hooks/Authentication/useUser";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/useGlobalContext";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRedirectUrl } = useGlobalContext();
  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      const clientUrlPath = location.pathname + location.search;
      console.log(clientUrlPath);
      setRedirectUrl(clientUrlPath);
      navigate("/login");
      toast.error("Please signin to access the page");
    }
  }, [
    isPending,
    isAuthenticated,
    navigate,
    location.pathname,
    location.search,
    setRedirectUrl,
  ]);

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
