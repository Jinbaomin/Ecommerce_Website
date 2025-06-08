package org.example.myproject.security;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.model.entity.UserEntity;
import org.example.myproject.services.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomUserDetailService implements UserDetailsService {
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserEntity user = username.contains("@gmail.com")
                ? userService.findUserByEmail(username)
                : userService.findUserByUserName(username);

//        if(username.contains("@gmail.com")) {
//            user = userService.findUserByEmail(username);
//        } else {
//            user = userService.findUserByUserName(username);
//        }

        Set<GrantedAuthority> authorities = new HashSet<>();

//        user.getRoles().stream().map(it -> roles.add(new SimpleGrantedAuthority("ROLE_" + it.toString()))).collect(Collectors.toList());
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.toString())));

        return User
                .withUsername(username)
                .password(user.getPassword())
                .authorities(authorities)
                .build();
//        return new User(user.getUserName(), user.getPassword(), authorities);
    }

    public UserDetails loadUserByEmail(String email) {
        UserEntity user = userService.findUserByEmail(email);

        Set<GrantedAuthority> authorities = new HashSet<>();

//        user.getRoles().stream().map(it -> roles.add(new SimpleGrantedAuthority("ROLE_" + it.toString()))).collect(Collectors.toList());
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.toString())));

        return new User(user.getUserName(), user.getPassword(), authorities);
    }
}
