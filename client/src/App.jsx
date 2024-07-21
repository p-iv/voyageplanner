import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SpinnerFullPage from "./components/UI/SpinnerFullPage";
import DestinationList from "./components/DestinationList";
import Destination from "./components/Destination";
import Attractions from "./components/Attractions";
import Schedule from "./components/Schedule";
import { DestinationProvider } from "./context/DestinationContext";
import { PlaceProvider } from "./context/PlaceContext";
import Attraction from "./components/Attraction";
import { NewTripProvider } from "./context/NewTripContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <NewTripProvider>
      <PlaceProvider>
        <DestinationProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/product" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<AppLayout />}>
                  <Route
                    index
                    element={<Navigate replace to="destination" />}
                  />
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
                  <Route path="schedule" element={<Schedule />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </DestinationProvider>
      </PlaceProvider>
    </NewTripProvider>
  );
}

export default App;
