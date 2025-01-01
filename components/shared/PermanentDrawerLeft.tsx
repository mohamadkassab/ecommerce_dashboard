import React, { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { DRAWERWIDTH, SECTIONS } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { StatusModel } from "@/models/StatusModel";
import { setUser, signout } from "@/utils/redux/actions/user";

interface PermanentDrawerProps {
  pathName: string;
  children?: ReactNode;
}

const PermanentDrawerLeft: React.FC<PermanentDrawerProps> = ({
  pathName = "Dashboard",
  children,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((state: any) => state.reducer);

  let pathNameToUpper = pathName?.split("/")[1];
  pathNameToUpper = pathNameToUpper
    ? pathNameToUpper.charAt(0).toUpperCase() +
      pathNameToUpper.slice(1).toLowerCase()
    : "";

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleToggle = (sectionTitle: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const handleRouting = (route: string) => {
    router.push(route);
  };

  const signoutUser = () => {
    dispatch(signout());
  };

  React.useEffect(() => {
    if (status === StatusModel.SIGNOUTSUCCESSFUL) {
      router.replace("/signin");
    }
  }, [status]);

  React.useEffect(() => {
    dispatch(setUser());
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: DRAWERWIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWERWIDTH,
            boxSizing: "border-box",
            backgroundColor: "secondary.main",
            borderRadius: "0 8px 8px 0",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ borderBottom: "2px solid white" }}>
          {/* <Typography variant="h5" noWrap component="div" sx={{ color: 'white', fontWeight:"bold" }}>
              {pathNameToUpper}
            </Typography> */}
        </Toolbar>
        <Divider />
        <List
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Main List Items */}
          <Box sx={{ flexGrow: 1 }}>
            {SECTIONS.map((section, sectionIndex) => {
              if (
                section.requiredPermissions &&
                section.requiredPermissions.length > 0
              ) {
                if (
                  !section.requiredPermissions.some((permission) =>
                    user?.permission?.includes(permission)
                  ) &&
                  user?.username !== "root@e.com"
                ) {
                  return;
                }
              }
              return (
                <div key={section.title}>
                  <ListItem
                    disablePadding
                    sx={{
                      display: "block",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#cceaff",
                        borderRadius: 2,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        section.subsections
                          ? handleToggle(section.title)
                          : handleRouting(String(section.path));
                      }}
                      sx={{
                        minHeight: 48,
                        justifyContent: "initial",

                        color: "white", // Default text color
                        "&:hover": {
                          color: "primary.dark", // Change text color on hover
                        },
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 20,
                          top: "50%",
                          transform: "translateY(-50%)",
                          height: "70%",
                          width: "3px",
                          backgroundColor: "#cceaff",
                          borderRadius: "2px",
                        },
                        "&:hover::before": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          justifyContent: "center",
                        }}
                      />
                      <p className="font-semibold text-base">{section.title}</p>
                      {section.subsections &&
                        (openSections[section.title] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        ))}
                    </ListItemButton>
                  </ListItem>

                  {/* Collapsible Subsections */}
                  <Collapse
                    in={openSections[section.title]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {section?.subsections?.map((subsection, subIndex) => {
                      if (
                        subsection.requiredPermissions &&
                        subsection.requiredPermissions.length > 0
                      ) {
                        if (
                          !subsection.requiredPermissions.some((permission) =>
                            user?.permission?.includes(permission)
                          ) &&
                          user?.username !== "root@e.com"
                        ) {
                          return;
                        }
                      }
                      return (
                        <ListItem
                          key={subsection.title}
                          disablePadding
                          sx={{
                            display: "block",
                            pl: 3,
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#cceaff",
                              borderRadius: 2,
                            },
                          }}
                        >
                          <ListItemButton
                            onClick={() => {
                              if ("path" in subsection) {
                                handleRouting(String(subsection.path));
                              }
                            }}
                            className="group min-h-[36px] justify-start px-2.5 text-white hover:text-primary-dark"
                            sx={{
                              "&:hover": {
                                color: "primary.dark",
                              },
                              position: "relative",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                left: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                height: "70%",
                                width: "3px",
                                backgroundColor: "#FF9900",
                                borderRadius: "2px",
                              },
                              "&:hover::before": {
                                backgroundColor: "white",
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 2,
                                justifyContent: "center",
                              }}
                            />
                            <p className="font-semibold text-base">
                              {subsection.title}
                            </p>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </Collapse>
                </div>
              );
            })}
          </Box>

          {/* Sign Out Item at the Bottom */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              color: "white",
              "&:hover": {
                backgroundColor: "error.main",
                borderRadius: 2,
              },
            }}
          >
            <ListItemButton
              onClick={() => signoutUser()}
              sx={{
                minHeight: 42,
                justifyContent: "initial",
                px: 2.5,
                color: "white",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "70%",
                  width: "3px",
                  backgroundColor: "error.main",
                  borderRadius: "2px",
                },
                "&:hover::before": {
                  backgroundColor: "white",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                }}
              />
              <p className="font-semibold text-base">{`Sign Out`}</p>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <Box sx={{}}>{children}</Box>
      </Box>
    </Box>
  );
};

export default PermanentDrawerLeft;
