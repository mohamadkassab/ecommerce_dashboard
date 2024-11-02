/* eslint-disable react/jsx-key */
"use client";
import * as React from "react";
import RoleDataGrid from "./RoleDataGrid";
import { useAppSelector } from "@/utils/redux/hooks";

export default function RolePage() {
    const { user } = useAppSelector((state: any) => state.reducer);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
    React.useEffect(() => {
      if (user) {
        setIsAuthenticated(
          user?.permission?.includes("role_crud") ||
            user?.username === "root@e.com"
        );
      } else {
        setIsAuthenticated(false);
      }
    }, [user]);

    return <>{isAuthenticated ? <RoleDataGrid /> : <></>}</>;

}
