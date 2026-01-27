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
import authRoutes from "./modules/auth.routes";
import { superAdminRoutes } from "./modules/superadmin.routes";
import { employeeRoutes } from "./modules/employee.routes";
import { managerRoutes } from "./modules/manager.routes"; // Added this import
import { landingRoutes } from "./modules/landing.routes";

import AdminLayout from "../layouts/adminLayout";
import ManagerLayout from "../layouts/managerLayout";
import EmployeeLayout from "../layouts/employeeLayout";

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

      {/* Super Admin - Using relative paths in the map if possible */}
      <Route path="/superadmin" element={<AdminLayout />}>
        {superAdminRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path.replace("/superadmin/", "")} 
            element={r.element}
          />
        ))}
      </Route>

      {/* Manager - Fixed to use managerRoutes */}
      <Route path="/manager" element={<ManagerLayout />}>
        {managerRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path.replace("/manager/", "")}
            element={r.element}
          />
        ))}
      </Route>

      {/* Employee */}
      <Route path="/employee" element={<EmployeeLayout />}>
        {employeeRoutes.map((r) => (
          <Route 
            key={r.path} 
            path={r.path.replace("/employee/", "")} // Added replacement for consistency
            element={r.element} 
          />
        ))}
      </Route>
    </Routes>
  );
}