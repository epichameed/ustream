"use client";
import { createContext } from "react";
interface RoleContextValue {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}
interface SelectedRouteContext {
  selectedRoute: string;
  setSelectedRoute: React.Dispatch<React.SetStateAction<string>>;
}
export const RoleContext = createContext<RoleContextValue | any>("");
export const SelectedRouteContext = createContext<SelectedRouteContext | any>(
  ""
);
