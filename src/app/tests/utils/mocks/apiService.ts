import { mockGetUserByEmail } from "./responses/loginResponse";
import { mockLoginUsingOtp } from "./responses/loginUsingOtpResponse";

const mockAxios = jest.requireActual("axios");

const mockedApiService = jest.fn(() => {
  const getUserByEmail = jest.fn(async (params) => {
    mockAxios.post = jest.fn().mockImplementation(() => mockGetUserByEmail());
    const response = await mockAxios.post(
      `mockendpoint/users/user-by-email`,
      params
    );
    return response;
  });

  const loginUsingOtp = jest.fn(async (params) => {
    mockAxios.post = jest.fn().mockImplementation(() => mockLoginUsingOtp());
    const response = await mockAxios.post(
      `mockendpoint/users/login-by-otp`,
      params
    );

    return response;
  });

  return Object.freeze({
    getUserByEmail,
    loginUsingOtp,
  });
});

export default mockedApiService;
