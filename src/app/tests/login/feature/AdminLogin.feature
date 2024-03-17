Feature: Login via email

Scenario: Admin should be able to login using email

Given an Admin is valid

When Admin navigates to the Login Page
And logs in using a email
And otp modal must show
And inputted OTP

Then the Admin clicked submit otp
And is redirected to home route