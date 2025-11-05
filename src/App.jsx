import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.jsx";
import Body from "./components/Body";
import Login from "./components/Login.jsx";
import LandingPage from "./components/LandingPage.jsx";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Toaster />
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />}/>
              <Route path="/landingpage" element={<LandingPage />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
