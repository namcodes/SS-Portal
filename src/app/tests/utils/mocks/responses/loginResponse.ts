const mockGetUserByEmail = async () => {
  const mockResponse = {
    data: {
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
  };

  return mockResponse;
};

export { mockGetUserByEmail };
