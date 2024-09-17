import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DestinationProvider } from "./context/DestinationContext";
import { PlaceProvider } from "./context/PlaceContext";
import { NewTripProvider } from "./context/NewTripContext";

import SpinnerFullPage from "./components/UI/SpinnerFullPage";
import { SpeedInsights } from "@vercel/speed-insights/react";
import DestinationList from "./components/DestinationList";
import Destination from "./components/Destination";
import Attractions from "./components/Attractions";
import Attraction from "./components/Attraction";
import SignUp from "./pages/SignUp";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <>
      <BrowserRouter>
        <SpeedInsights />
        <NewTripProvider>
          <PlaceProvider>
            <DestinationProvider>
              <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/app" element={<AppLayout />}>
                    <Route path="destination" element={<DestinationList />} />
                    <Route
                      path="destination/:destinationId"
                      element={<Destination />}
                    />
                    <Route path="attractions" element={<Attractions />} />
                    <Route
                      path="attractions/:attractionId"
                      element={<Attraction />}
                    />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </DestinationProvider>
          </PlaceProvider>
        </NewTripProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
