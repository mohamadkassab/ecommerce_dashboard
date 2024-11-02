/* eslint-disable react/jsx-key */
"use client";
import * as React from "react";
import UserDataGrid from "@/app/(webApp)/user/UserDataGrid";
import { useAppSelector } from "@/utils/redux/hooks";

export default function UserPage() {
  const { user } = useAppSelector((state: any) => state.reducer);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setIsAuthenticated(
        user?.permission?.includes("user_crud") ||
          user?.username === "root@e.com"
      );
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return <>{isAuthenticated ? <UserDataGrid /> : <></>}</>;
}
