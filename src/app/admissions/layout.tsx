import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admissions",
};

const layout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default layout;
