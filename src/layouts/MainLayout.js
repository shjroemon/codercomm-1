import React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";

import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <AlertMsg />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
