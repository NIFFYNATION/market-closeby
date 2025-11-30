import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen ">
      <Outlet />
      {/* Recommended: React Router scroll restoration */}
      <ScrollRestoration />
    </div>
  );
}

export default App;
