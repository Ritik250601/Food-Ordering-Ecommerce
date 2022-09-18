package com.ritik.foodordering.service;

import com.ritik.foodordering.dto.AppUserRegistrationDto;
import com.ritik.foodordering.entity.AppUser;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AppUserService extends UserDetailsService {
    AppUser save(AppUserRegistrationDto appUserRegistrationDto);
    
    AppUser findByEmail(String email);


}
