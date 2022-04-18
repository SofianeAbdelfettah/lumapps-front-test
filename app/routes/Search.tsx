import { Outlet } from "@remix-run/react";

export default function Search() {

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Outlet />
    </div>
  );
}
