"use client";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useGetUserInfoQuery();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore
  const isAdmin = data?.data?.isAdmin;
  if (!data && !isLoading) redirect("/login");
  if (!isAdmin && !isLoading)
    return (
      <h2 className="text-error text-lg font-bold">Unauthorized Access</h2>
    );
  if (isAdmin && !isLoading) return children;
  return <span className="loading loading-spinner"></span>;
};

export default AdminRoute;
