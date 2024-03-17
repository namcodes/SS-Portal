export const protectedRoutes = () => {
  return [
    "/charts",
    "/home",
    "/import",
    "/page-management/incident-reports",
    "/settings",
    "/tickets",
    "/users",
    "/",
  ];
};

export const protectedRoutesAdmin = () => {
  return [
    "/charts",
    "/import",
    "/page-management/incident-reports",
    "/tickets",
    "/users",
  ];
};

export const protectedRoutesHR = () => {
  return [
    "/charts",
    "/import",
    "/page-management/incident-reports",
    "/tickets",
    "/users",
    "/home",
    "/",
  ];
};
