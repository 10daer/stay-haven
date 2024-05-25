import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";
import GlobalStyle from "./styles/GlobalStyles";

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
import AppLayout from "./ui/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

function App() {
  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : (
          ""
        )}
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            {console.log(Routes)}
            <Route element={<AppLayout />}>
              {console.log(Route)}
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="create-booking" element={<CreateBooking />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
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
