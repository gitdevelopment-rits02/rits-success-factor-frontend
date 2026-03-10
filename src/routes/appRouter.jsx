import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingRedirect from "./guards/LandingRedirect";
import authRoutes from "./modules/auth.routes";
import { landingRoutes } from "./modules/landing.routes";
import NotFound from "../features/Auth/Pages/NotFound";
import ProtectedRoute from "./guards/ProtectedRoutes";
import RoleRoute from "./guards/RoleRoutes";
import { ROLES } from "./configs/roles.config";
import PageLoader from "../components/PageLoader";

// Lazy load the route groups to prevent eager loading of all code on the landing page
const ChiefRoutesGroup = React.lazy(() => import("./groups/ChiefRoutesGroup"));
const SuperAdminRoutesGroup = React.lazy(() => import("./groups/SuperAdminRoutesGroup"));
const ManagerRoutesGroup = React.lazy(() => import("./groups/ManagerRoutesGroup"));
const HrRoutesGroup = React.lazy(() => import("./groups/HrRoutesGroup"));
const EmployeeRoutesGroup = React.lazy(() => import("./groups/EmployeeRoutesGroup"));

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public & Auth Routes */}
        {landingRoutes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
        {authRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        <Route path="/redirect" element={<LandingRedirect />} />

        {/* Chief Routes */}
        <Route
          path="/chief/*"
          element={
            <ProtectedRoute>
              <RoleRoute requiredRole={ROLES.CHIEF}>
                <ChiefRoutesGroup />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Super Admin */}
        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute>
              <RoleRoute requiredRole={ROLES.SUPERADMIN}>
                <SuperAdminRoutesGroup />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Manager */}
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute>
              <RoleRoute requiredRole={ROLES.MANAGER}>
                <ManagerRoutesGroup />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* HR */}
        <Route
          path="/hr/*"
          element={
            <ProtectedRoute>
              <RoleRoute requiredRole={ROLES.HR}>
                <HrRoutesGroup />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Employee */}
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute>
              <RoleRoute requiredRole={ROLES.EMPLOYEE}>
                <EmployeeRoutesGroup />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}