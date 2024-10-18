// app/page.js (or the appropriate file location)
"use client";
import React, { Suspense, lazy } from "react";
import Reports from "@/components/reports/Reports";

// Lazy load the SignUpSide component

function Page() {
  return <Reports />;
}

export default Page;
