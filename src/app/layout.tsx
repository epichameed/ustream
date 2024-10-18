"use client";

// import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import { RoleContext, SelectedRouteContext } from "../../context/context";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// export const metadata: Metadata = {
//   title: "UStreams - Freelancer Activity Tracker",
//   description:
//     "Monitor and manage freelancer activities on platforms like Upwork. Track progress, project engagement, and performance insights with ease.",
// };
interface tokenData {
  role: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [role, setRole] = React.useState<any>("");
  const [selectedRoute, setSelectedRoute] = React.useState<any>(
    role == "admin" ? "/dashboard" : "/reports"
  );
  console.log("route in layout", selectedRoute, role);

  React.useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const data: tokenData = jwtDecode(token);
      console.log(data, "============from cookies");
      setRole(data.role);
    }
    setSelectedRoute(role == "admin" ? "/dashboard" : "/reports");
    console.log("resetting route");
  }, [role]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>SConsultants - Freelancer Activity Tracker</title>
      </head>
      <body>
        <RoleContext.Provider value={[role, setRole]}>
          <SelectedRouteContext.Provider
            value={[selectedRoute, setSelectedRoute]}
          >
            {children}
          </SelectedRouteContext.Provider>
        </RoleContext.Provider>
      </body>
    </html>
  );
}
