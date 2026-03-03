// import { Routes, Route } from "react-router-dom";
// import authRoutes from "./modules/auth.routes";
// import {superAdminRoutes}  from "./modules/superadmin.routes";

// export default function AppRouter() {
//   return (
//     <Routes>
//       {authRoutes.map((r) => (
//         <Route key={r.path} path={r.path} element={r.element} />
//       ))}

//       {superAdminRoutes.map((r) => (
//         <Route key={r.path} path={r.path} element={r.element} />
//       ))}
//     </Routes>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import authRoutes from "./modules/auth.routes";
// import { superAdminRoutes } from "./modules/superadmin.routes";
// import AdminLayout from "../layouts/adminLayout";

// export default function AppRouter() {
//   return (
//     <Routes>
//       {authRoutes.map((r) => (
//         <Route key={r.path} path={r.path} element={r.element} />
//       ))}

//       <Route path="/superadmin" element={<AdminLayout />}>
//         {superAdminRoutes.map((r) => (
//           <Route
//             key={r.path}
//             path={r.path.replace("/superadmin/", "")}
//             element={r.element}
//           />
//         ))}
//       </Route>

//     </Routes>


//   );
// }


// import { Routes, Route } from "react-router-dom";
// import authRoutes from "./modules/auth.routes";
// import { superAdminRoutes } from "./modules/superadmin.routes";
// import { employeeRoutes } from "./modules/employee.routes";

// import AdminLayout from "../layouts/adminLayout";
// import ManagerLayout from "../layouts/managerLayout";
// import EmployeeLayout from "../layouts/employeeLayout"
// import { landingRoutes } from "./modules/landing.routes";
// export default function AppRouter() {
//   return (
//     <Routes>
//       {/* Auth routes */}
//       {/* LANDING PAGE */}
//         {landingRoutes.map((r, i) => (
//           <Route key={i} path={r.path} element={r.element} />
//         ))}
//       {authRoutes.map((r) => (
//         <Route key={r.path} path={r.path} element={r.element} />
//       ))}

//       {/* Super Admin */}
//       <Route path="/superadmin" element={<AdminLayout />}>
//         {superAdminRoutes.map((r) => (
//           <Route
//             key={r.path}
//             path={r.path.replace("/superadmin/", "")}
//             element={r.element}
//           />
//         ))}
//       </Route>

//       <Route path="/manager" element={<ManagerLayout />}>
//         {superAdminRoutes.map((r) => (
//           <Route
//             key={r.path}
//             path={r.path.replace("/manager/", "")}
//             element={r.element}
//           />
//         ))}
//       </Route>




//       <Route path="/employee" element={<EmployeeLayout />}>
//   {employeeRoutes.map((r) => (
//     <Route key={r.path} path={r.path} element={r.element} />
//   ))}
// </Route>

//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import LandingRedirect from "./guards/LandingRedirect";
import authRoutes from "./modules/auth.routes";
import { superAdminRoutes } from "./modules/superadmin.routes";
import { employeeRoutes } from "./modules/employee.routes";
import { managerRoutes } from "./modules/manager.routes"; // Added this import
import { landingRoutes } from "./modules/landing.routes";
import hrRoutes from "./modules/hr.routes";
import AdminLayout from "../layouts/adminLayout";
import ManagerLayout from "../layouts/managerLayout";
import EmployeeLayout from "../layouts/employeeLayout";
import HrLayout from "../layouts/hrLayout";
import ChiefLayout from "../layouts/ChiefLayout";
import NotFound from "../features/Auth/Pages/NotFound";
import { chiefRoutes } from "./modules/chief.routes";
import ProtectedRoute from "./guards/ProtectedRoutes";
import RoleRoute from "./guards/RoleRoutes";
import { ROLES } from "./configs/roles.config";

export default function AppRouter() {
  return (
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
        path="/chief"
        element={
          <ProtectedRoute>
            <RoleRoute requiredRole={ROLES.CHIEF}>
              <ChiefLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        {chiefRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path.replace("/chief/", "")}
            element={r.element}
          />
        ))}
      </Route>

      {/* Super Admin */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute>
            <RoleRoute requiredRole={ROLES.SUPERADMIN}>
              <AdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        {superAdminRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path.replace("/superadmin/", "")}
            element={r.element}
          />
        ))}
      </Route>

      {/* Manager */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            <RoleRoute requiredRole={ROLES.MANAGER}>
              <ManagerLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        {managerRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path.replace("/manager/", "")}
            element={r.element}
          />
        ))}
      </Route>

      {/* HR */}
      <Route
        path="/hr"
        element={
          <ProtectedRoute>
            <RoleRoute requiredRole={ROLES.HR}>
              <HrLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        {hrRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path.replace("/hr/", "")}
            element={r.element}
          />
        ))}
      </Route>

      {/* Employee */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <RoleRoute requiredRole={ROLES.EMPLOYEE}>
              <EmployeeLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        {employeeRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path.replace("/employee/", "")}
            element={r.element}
          />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}