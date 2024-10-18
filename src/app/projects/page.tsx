// app/page.js (or the appropriate file location)
"use client";
import React, { Suspense, lazy } from "react";
import Projects from "@/components/projects/Projects";

// Lazy load the SignUpSide component

function Page() {
  return <Projects />;
}

export default Page;
