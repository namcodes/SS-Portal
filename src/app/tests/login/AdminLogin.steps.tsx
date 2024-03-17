`use client`;

import React from "react";
import "../setUpDomTests";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Provider } from "react-redux";
import store from "../../_utils/redux/store";
import Login from "../../_modules/login";
import mockRouter from "next-router-mock";
import { act, render, waitFor } from "@testing-library/react";
import ReactQueryProvider from "@/app/_utils/_provider/ReactQueryProvider";
import mockedApiService from "../utils/mocks/apiService";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"));

const feature = loadFeature("./feature/AdminLogin.feature");
class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

defineFeature(feature, (test) => {
  window.ResizeObserver = ResizeObserver;
  const user = userEvent.setup();
  test("Admin should be able to login using email", ({ given, when, then }) => {
    beforeEach(() => {
      render(
        <ReactQueryProvider>
          <Provider store={store}>
            <Login apiService={mockedApiService} />
          </Provider>
        </ReactQueryProvider>
      );
    });

    given("an Admin is valid", () => {
      expect(true).toBe(true);
    });

    when("Admin navigates to the Login Page", () => {
      act(() => {
        mockRouter.push("/login");
      });

      expect(mockRouter.pathname).toBe("/login");
    });

    when("logs in using a email", async () => {
      const emailInput = document.getElementById("email-input-login");
      const loginButton = document.getElementById("login-button");
      await user.type(emailInput, "test@gmail.com");
      await waitFor(() => user.click(loginButton));
    });

    when("otp modal must show", async () => {
      const otpModal = document.getElementById("otp-modal");
      expect(otpModal).toBeDefined;
    });

    when("inputted OTP", async () => {
      const otpModal = document.getElementById("otp-modal");
      const otpModalInputs = otpModal.getElementsByTagName("input");
      await user.type(otpModalInputs[0], "1");
      await user.type(otpModalInputs[1], "2");
      await user.type(otpModalInputs[2], "3");
      await user.type(otpModalInputs[3], "4");
      await user.type(otpModalInputs[4], "5");
      await user.type(otpModalInputs[5], "6");
      expect(otpModalInputs[0].value).toBe("1");
      expect(otpModalInputs[1].value).toBe("2");
      expect(otpModalInputs[2].value).toBe("3");
      expect(otpModalInputs[3].value).toBe("4");
      expect(otpModalInputs[4].value).toBe("5");
      expect(otpModalInputs[5].value).toBe("6");
    });

    then("the Admin clicked submit otp", async () => {
      const submitOtpButton = document.getElementById("submit-otp-login");
      await waitFor(() => user.click(submitOtpButton));
    });

    then("is redirected to home route", () => {
      expect(mockRouter.pathname).toBe("/home");
    });
  });
});
