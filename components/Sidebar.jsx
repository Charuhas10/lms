/* eslint-disable react/jsx-key */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { CgProfile } from "react-icons/cg";
import { FaWallet, FaBookOpen } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import Link from "next/link";

const drawerWidth = 70; // Adjusted to make the drawer minimized

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...{
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      overflowX: "hidden",
    },
  },
}));

const iconList = [
  <CgProfile />,
  <FaWallet />,
  <FaBookOpen />,
  <IoInformationCircle />,
];

export default function MiniDrawer() {
  const links = ["/profile", "/wallet", "/mycourses", "/about"];
  const theme = useTheme();
  const titles = ["profile", "wallet", "mycourses", "about"]; // Titles corresponding to the links

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent">
        <Divider />
        <List>
          {iconList.map((icon, index) => (
            <ListItem key={index} disablePadding>
              <Link href={links[index]} passHref>
                <ListItemButton
                  title={titles[index]} // Add title attribute here
                  sx={{
                    minHeight: 48,
                    justifyContent: "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
