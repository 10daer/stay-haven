import { Toaster } from "react-hot-toast";

function NotificationToast() {
  return (
    <Toaster
      position="top-right"
      gutter={10}
      containerStyle={{ margin: " 4px" }}
      toastOptions={{
        success: {
          duration: 3000,
          style: { backgroundColor: "green", color: "pink" },
        },
        error: {
          duration: 3000,
          style: { backgroundColor: "green", color: "pink" },
        },
        style: { fontSize: "16px", maxWidth: "500px", padding: "8px 12px" },
      }}
    />
  );
}

export default NotificationToast;
