import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";

import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Checkin from "./pages/Checkin";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";

import NotificationToast from "./features/Notification/NotificationToast";

import CreateBooking from "./pages/CreateBooking";
import GlobalStyle from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

function App() {
  useEffect(() => {
    const checkScheduledUpload = async () => {
      const UPLOAD_INTERVAL = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
      const lastUploadTime = localStorage.getItem('lastUploadTime');
      const currentTime = Date.now();

      if (!lastUploadTime || currentTime - parseInt(lastUploadTime) >= UPLOAD_INTERVAL) {
        const { uploadAll } = await import('./path/to/Uploader');
        try {
          await uploadAll();
          console.log('Scheduled upload completed successfully');
          localStorage.setItem('lastUploadTime', currentTime.toString());
        } catch (error) {
          console.error('Error during scheduled upload:', error);
        }
      }
    };

    checkScheduledUpload();
  }, []);

  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        {!import.meta.env.DEV ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : (
          ""
        )}
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<AppLayout />}>
              <Route
                index
                element={<Navigate replace={true} to="/dashboard" />}
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="bookings" element={<Bookings />}>
                <Route path=":bookingId" element={<Booking />} />
              </Route>
              <Route path="create-booking" element={<CreateBooking />} />
              <Route path="check-in/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <NotificationToast />
      </QueryClientProvider>
    </GlobalProvider>
  );
}

export default App;
