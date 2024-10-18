// app/page.js (or the appropriate file location)
"use client";
import React, { Suspense, lazy } from "react";
import SignUpSide from "@/components/sign-up/SignUpSide";

// Lazy load the SignUpSide component

function Page() {
  return <SignUpSide />;
}

export default Page;
