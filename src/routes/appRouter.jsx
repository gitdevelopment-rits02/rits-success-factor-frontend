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


import { Routes, Route } from "react-router-dom";
import authRoutes from "./modules/auth.routes";
import { superAdminRoutes } from "./modules/superadmin.routes";
import { employeeRoutes } from "./modules/employee.routes";

import AdminLayout from "../layouts/adminLayout";
import EmployeeLayout from "../layouts/employeeLayout";
import { landingRoutes } from "./modules/landing.routes";
export default function AppRouter() {
  return (
    <Routes>
      {/* Auth routes */}
      {/* LANDING PAGE */}
        {landingRoutes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
      {authRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}

      {/* Super Admin */}
      <Route path="/superadmin" element={<AdminLayout />}>
        {superAdminRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path.replace("/superadmin/", "")}
            element={r.element}
          />
        ))}
      </Route>

      
      <Route path="/employee" element={<EmployeeLayout />}>
  {employeeRoutes.map((r) => (
    <Route key={r.path} path={r.path} element={r.element} />
  ))}
</Route>

    </Routes>
  );
}
