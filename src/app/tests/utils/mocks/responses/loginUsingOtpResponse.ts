const mockLoginUsingOtp = async () => {
  const mockResponse = {
    data: {
      message: "Login successful",
      user: {
        _id: "65b09a4d363c9c167f922f6a",
        firstName: "Paul Leandro",
        lastName: "Lanot",
        middleName: "Lamac",
        email: "planot@enshored.com",
        alternativeEmail: "paullanot@gmail.com",
        imageLink: "",
        position: "Application Support Engineer",
        employeeId: "535302023",
        access: "ss_admin",
        jcId: "6576ad58a73482ceda87e22e",
        department: "IT",
        employeeType: "Manager",
      },
      access_key:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgQWNjb3VudCIsImVtYWlsIjoidGVzdEBlbnNob3JlZC5jb20iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjAwNjk3OTM2NSwiYXV0aCI6InVzZXIiLCJhY2Nlc3MiOiJVMkZzZEdWa1gxL0JzTHhwMTRmcHRqY05Xc2RWUUxSZkRFRVNYNGRJU3dzPSJ9.P3J-VR9XG6Z9XipRdyIWQeR4C6ewZyBR4CSkUA595Z0",
    },
  };

  return mockResponse;
};

export { mockLoginUsingOtp };
