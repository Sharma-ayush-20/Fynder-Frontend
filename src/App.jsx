import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";

function App() {
  return (
    <Provider store={appStore}>
      <Toaster
        position="top-right"
        containerStyle={{ top: 70 }}
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "14px",
            padding: "12px 18px",
            fontSize: "0.9rem",
            animation: "fadeSlideIn 0.45s ease",
            color: "#ffffff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
          },
          success: {
            style: {
              background: "#00D27F",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#00A868",
            },
          },
          error: {
            style: {
              background: "#FF3B30",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#C4001D",
            },
          },
        }}
      />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
