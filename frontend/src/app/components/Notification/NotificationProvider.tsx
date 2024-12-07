"use client";

import React from "react";
import dynamic from "next/dynamic";

const NotificationContainer = dynamic(
  () => import("react-notifications").then((mod) => mod.NotificationContainer),
  { ssr: false }
);

const NotificationProvider = () => {
  return (
    <>
      <NotificationContainer />
    </>
  );
};

export default NotificationProvider;
