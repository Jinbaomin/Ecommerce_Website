package org.example.myproject.facade;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.exception.ErrorCode;
import org.example.myproject.mapper.ProductMapper;
import org.example.myproject.mapper.UserMapper;
import org.example.myproject.model.dto.GenericApiResponse;
import org.example.myproject.model.dto.request.LoginInfo;
import org.example.myproject.model.dto.request.RegisterInfo;
import org.example.myproject.model.dto.response.*;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.security.JwtProvider;
import org.example.myproject.security.SecurityUtils;
import org.example.myproject.services.OtpService;
import org.example.myproject.services.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthFacade {

    UserService userService;

    OtpService otpService;

    AuthenticationManagerBuilder authenticationManagerBuilder;

    JwtProvider jwtProvider;

    public GenericApiResponse<UserDTO> register(RegisterInfo body) {
        return GenericApiResponse.<UserDTO>builder()
                .statusCode(201)
                .message("Create new user successfully")
                .data(userService.registerUser(body))
                .build();
    }

    public GenericApiResponse<AuthenticationResponse> authenticate(LoginInfo loginInfo) {
        // load input into spring security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword());

        // Use function loadByUserName => authenticate user
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        String accessToken = jwtProvider.generateAccessToken(authentication);
        String refreshToken = jwtProvider.generateRefreshToken(authentication);

        userService.updateRefreshToken(authentication.getName(), refreshToken);

        UserEntity userEntity = userService.findUserByEmailOrUserName(loginInfo.getEmail());
        UserDTO userDTO = UserMapper.INSTANCE.convertToUserDTO(userEntity);

        AuthenticationResponse authRes = AuthenticationResponse.<AuthenticationResponse>builder()
                .authenticated(true)
                .user(userDTO)
                .accessToken(accessToken)
                .build();

        return GenericApiResponse.<AuthenticationResponse>builder()
                .statusCode(200)
                .message("Login account successfully")
                .data(authRes)
                .build();
    }

    public GenericApiResponse<AccountResponse> getCurrentAccount() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        boolean isAuthenticated = SecurityUtils.isAuthenticated();
        AccountResponse accountResponse;

        if(!isAuthenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        String email = SecurityUtils.getCurrentUserLogin().get();
        UserEntity user = userService.findUserByEmailOrUserName(email);

        UserDTO account = UserMapper.INSTANCE.convertToUserDTO(user);

        accountResponse = AccountResponse.builder()
                    .authenticated(true)
                    .user(account)
                    .build();

            return GenericApiResponse.<AccountResponse>builder()
                    .statusCode(200)
                    .message("Get account successfully")
                    .data(accountResponse)
                    .build();

//        if(isAuthenticated) {
//            String email = SecurityUtils.getCurrentUserLogin().get();
//            UserEntity user = userService.findUserByEmailOrUserName(email);
//
//            accountResponse = AccountResponse.builder()
//                    .authenticated(true)
//                    .user(UserMapper.INSTANCE.convertToUserDTO(user))
//                    .build();
//
//            return GenericApiResponse.<AccountResponse>builder()
//                    .statusCode(200)
//                    .message("Get account successfully")
//                    .data(accountResponse)
//                    .build();
//        } else {
//            accountResponse = AccountResponse.builder()
//                    .authenticated(false)
//                    .build();
//            ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;
//            return GenericApiResponse.<AccountResponse>builder()
//                    .statusCode(errorCode.getResponseCode().value())
//                    .message(errorCode.getMessage())
//                    .data(accountResponse)
//                    .build();
//        }
    }

    public GenericApiResponse<IntrospectResponse> introspect() {
        boolean isAuthenticated = SecurityUtils.isAuthenticated();
        String message = isAuthenticated ? "Authenticated" : "Unauthenticated";
        int statusCode = isAuthenticated ? 200 : 403;
        IntrospectResponse introspectResponse = IntrospectResponse.builder()
                .authenticated(isAuthenticated)
                .build();
        return GenericApiResponse.<IntrospectResponse>builder()
                .statusCode(statusCode)
                .message(message)
                .data(introspectResponse)
                .build();
    }

    public GenericApiResponse<GenerateOtpResponse> generateOtp(String email) {
        return GenericApiResponse.<GenerateOtpResponse>builder()
                .statusCode(200)
                .data(otpService.generateOtp(email))
                .message("Validate email and generate successfully")
                .build();
    }

    public GenericApiResponse<ValidateOtpResponse> validateOtp(String email, String otp) {
        return GenericApiResponse.<ValidateOtpResponse>builder()
                .statusCode(200)
                .message("Otp is valid")
                .data(otpService.validateOtp(email, otp))
                .build();
    }

    public GenericApiResponse<?> resetPassword(String email, String newPassword) {
        userService.resetPassword(email, newPassword);
        return GenericApiResponse.builder()
                .statusCode(200)
                .message("Reset password successfully")
                .build();
    }

    public GenericApiResponse<String> logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Set authentication in security context is null
        SecurityContextHolder.getContext().setAuthentication(null);

        // Set current token from authentication
        String currentToken = authentication.getCredentials().toString();

        String updatedToken = null;

        if(authentication.isAuthenticated()) {
            // Invalidate the current token by reducing its expiration time
            updatedToken = jwtProvider.reduceTokenExpiration(currentToken);
        }

        SecurityContextHolder.clearContext();

        return GenericApiResponse.<String>builder()
                .statusCode(200)
                .message("Log out successfully")
                .data(updatedToken)
                .build();
    }
}
