import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SpinnerFullPage from "./UI/SpinnerFullPage";
import DestinationList from "./components/DestinationList";
import Destination from "./components/Destination";
import AttractionsList from "./components/AttractionsList";
import Schedule from "./components/Schedule";
import { DestinationProvider } from "./context/DestinationContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <DestinationProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="destination" />} />
              <Route path="destination" element={<DestinationList />} />
              <Route path="destination/:id" element={<Destination />} />
              <Route path="attractions" element={<AttractionsList />} />
              <Route path="schedule" element={<Schedule />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DestinationProvider>
  );
}

export default App;
