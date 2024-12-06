package org.example.myproject.services;

import org.example.myproject.model.dto.response.GenerateOtpResponse;
import org.example.myproject.model.dto.response.ValidateOtpResponse;

public interface OtpService {
    public GenerateOtpResponse generateOtp(String email);
    public ValidateOtpResponse validateOtp(String email, String otp);
}
