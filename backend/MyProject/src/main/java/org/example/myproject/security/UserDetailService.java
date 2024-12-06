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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserDetailService implements UserDetailsService {
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserEntity user = userService.findUserByUserName(username);

        Set<GrantedAuthority> roles = new HashSet<>();

        user.getRoles().stream().map(it -> roles.add(new SimpleGrantedAuthority("ROLE_" + it.toString()))).collect(Collectors.toList());

        return new User(user.getUserName(), user.getPassword(), roles);
    }

    public UserDetails loadUserByEmail(String email) {
        UserEntity user = userService.findUserByEmail(email);

        Set<GrantedAuthority> roles = new HashSet<>();

        user.getRoles().stream().map(it -> roles.add(new SimpleGrantedAuthority("ROLE_" + it.toString()))).collect(Collectors.toList());

        return new User(user.getUserName(), user.getPassword(), roles);
    }
}
