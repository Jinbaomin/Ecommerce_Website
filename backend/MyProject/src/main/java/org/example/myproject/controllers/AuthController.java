package org.example.myproject.controllers;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.facade.AuthFacade;
import org.example.myproject.facade.UserFacade;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.*;
import org.example.myproject.model.dto.response.*;
import org.example.myproject.services.OtpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    UserFacade userFacade;

    AuthFacade authFacade;

    OtpService otpService;

    @PostMapping("/register")
    public ResponseEntity<GenericApiResponse<UserDTO>> register(@RequestBody @Valid RegisterInfo body) {
        return ResponseEntity.status(201).body(authFacade.register(body));
    }

    @PostMapping("/login")
    public ResponseEntity<GenericApiResponse<AuthenticationResponse>> login(@RequestBody @Valid LoginInfo loginInfo) {
        return ResponseEntity.status(200).body(authFacade.authenticate(loginInfo));
    }

    @GetMapping("/account")
    public ResponseEntity<GenericApiResponse<AccountResponse>> getCurrentAccount() {
        return ResponseEntity.status(200).body(authFacade.getCurrentAccount());
    }

    @PostMapping("/introspect")
    public ResponseEntity<GenericApiResponse<IntrospectResponse>> introspect() {
        return ResponseEntity.status(200).body(authFacade.introspect());
    }

    @PostMapping("/otp/generate")
    public ResponseEntity<GenericApiResponse<GenerateOtpResponse>> generateOtp(@RequestBody GenerateOtpRequest body) {
        return ResponseEntity.ok(authFacade.generateOtp(body.getEmail()));
    }

    @PostMapping("/otp/validate")
    public ResponseEntity<GenericApiResponse<ValidateOtpResponse>> validateOtp(@RequestBody ValidateOtpRequest body) {
        return ResponseEntity.ok(authFacade.validateOtp(body.getEmail(), body.getOtp()));
    }

    @PostMapping("/password")
    public ResponseEntity<GenericApiResponse<?>> resetPassword(@RequestBody ResetPasswordRequest body) {
        return ResponseEntity.ok(authFacade.resetPassword(body.getEmail(), body.getNewPassword()));
    }

    @PostMapping("/logout")
    public ResponseEntity<GenericApiResponse<?>> logout() {
        return ResponseEntity.ok(authFacade.logout());
    }
}
