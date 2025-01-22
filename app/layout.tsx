"use client";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import muiTheme from "../styles/muiTheme";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/utils/constants";
import "../styles/global.css";
import AlertStack from "@/components/shared/NotificationStack";
import StoreProvider from "./StoreProvider";
import PermanentDrawerLeft from "@/components/shared/PermanentDrawerLeft";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <StoreProvider>
        <html lang="en">
          <body className="bg-white">
            {(() => {
              // Find matching section or subsection
              const matchedSection =
                SECTIONS.find((section) => section.path === pathname) ||
                SECTIONS.find((section) =>
                  section.subsections?.some(
                    (sub: any) => sub?.path === pathname
                  )
                );

              // Determine if the route is protected
              const isProtected =
                matchedSection?.protected ||
                matchedSection?.subsections?.find(
                  (sub: any) => sub?.path === pathname
                )?.protected;

              // Render based on protection status
              return isProtected ? (
                <PermanentDrawerLeft pathName={pathname}>
                  {children}
                </PermanentDrawerLeft>
              ) : (
                <Box>{children}</Box>
              );
            })()}
            <AlertStack />
          </body>
        </html>
      </StoreProvider>
    </ThemeProvider>
  );
}
