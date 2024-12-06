package org.example.myproject.services.Impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.model.dto.response.GenerateOtpResponse;
import org.example.myproject.model.dto.response.ValidateOtpResponse;
import org.example.myproject.model.entity.OTP;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.repositories.UserRepository;
import org.example.myproject.services.EmailService;
import org.example.myproject.services.OtpService;
import org.example.myproject.services.UserService;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Random;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OtpServiceImpl implements OtpService {
    UserService userService;

    UserRepository userRepository;

    EmailService emailService;

    @Override
    public GenerateOtpResponse generateOtp(String email) {
        UserEntity user = userService.findUserByEmailOrUserName(email);

        if(user == null) {
            throw new AppException(ErrorCode.EMAIL_OR_USERNAME_NOT_FOUND);
        }

        Random rand = new Random();
        String otpValue =  String.valueOf(100000 + rand.nextInt(900000));

        emailService.sendTemplateEmail(email, "OTP Reset Password", "verify-email", otpValue);

        OTP otp = OTP.builder()
                .otpValue(otpValue)
                .otpExpireDate(Instant.now().plusSeconds(120))
                .build();

        user.setOtp(otp);
        userRepository.save(user);

        return GenerateOtpResponse.builder()
                .email(email)
                .build();
    }

    @Override
    public ValidateOtpResponse validateOtp(String email, String otp) {
        UserEntity user = userService.findUserByEmailOrUserName(email);

        Duration duration = Duration.ofSeconds(1);
        if(Duration.between(user.getOtp().getOtpExpireDate(), Instant.now()).compareTo(duration) >= 0) {
            throw new AppException(ErrorCode.EXPIRED_OTP);
        }

        boolean isValid =  user.getOtp().getOtpValue().equals(otp);

        if(!isValid) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        return ValidateOtpResponse.builder()
                .isValid(true)
                .build();
    }
}
