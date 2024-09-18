
import React, { ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {DRAWERWIDTH, SECTIONS} from '@/utils/constants';
import { useRouter } from 'next/navigation';



interface PermanentDrawerProps {
    pathName: string;
    children?: ReactNode;
  }

  type OpenSectionsProps = {
    [key: string]: boolean; 

  };
  



  const PermanentDrawerLeft: React.FC<PermanentDrawerProps> = ({ pathName = "Dashboard", children }) => {
    const router = useRouter();
    let pathNameToUpper = pathName?.split("/")[1];
    pathNameToUpper = pathNameToUpper ? pathNameToUpper.charAt(0).toUpperCase() + pathNameToUpper.slice(1).toLowerCase() : "";
  
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({}); 
  
    const handleToggle = (sectionTitle: string) => {
      setOpenSections((prev) => ({
        ...prev,
        [sectionTitle]: !prev[sectionTitle],
      }));
    };

    const handleRouting = (route: string) =>{
      router.push(route);
    }


  

  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Drawer
          sx={{
            width: DRAWERWIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWERWIDTH,
              boxSizing: 'border-box',
              backgroundColor: 'secondary.main',
              borderRadius: '0 8px 8px 0',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar sx={{ borderBottom: '2px solid white' }}>
            {/* <Typography variant="h5" noWrap component="div" sx={{ color: 'white', fontWeight:"bold" }}>
              {pathNameToUpper}
            </Typography> */}
          </Toolbar>
          <Divider />
          <List>
            {SECTIONS.map((section, sectionIndex) => (
              <div key={section.title}>
                <ListItem disablePadding sx={{ display: 'block', color: 'white' }}>
                  <ListItemButton
                    onClick={  () => { section.subsections ? handleToggle(section.title) : handleRouting(String(section.path))}}
                    sx={{
                      minHeight: 48,
                      justifyContent: 'initial',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center',
                      }}
                    />
                    <p className='font-semibold text-base'>{section.title}</p>
                    {/* <ListItemText primary={section.title} sx={{ opacity: 1, color: 'white',}} /> */}
                    {section.subsections && (openSections[section.title] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
  
                {/* Collapsible Subsections */}
                <Collapse in={openSections[section.title]} timeout="auto" unmountOnExit>
                  {section?.subsections?.map((subsection, subIndex) => (
                    <ListItem key={subsection.title} disablePadding sx={{ display: 'block', pl: 2, color: 'white' }}>
                      <ListItemButton
                      onClick={ () => handleRouting(String(subsection.path))}
                        sx={{
                          minHeight: 36,
                          justifyContent: 'initial',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 3,
                            justifyContent: 'center',
                          }}
                        />
                           <p className='font-medium text-base'>{subsection.title}</p>
                        {/* <ListItemText primary={subsection} sx={{ opacity: 1, color: 'white' }} /> */}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </Collapse>
              </div>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, pt: 4,  }}>
     
        {children}
      </Box>
   
      </Box>
    );
  };
  
  export default PermanentDrawerLeft;