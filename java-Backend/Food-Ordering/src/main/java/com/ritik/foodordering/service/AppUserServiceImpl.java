package com.ritik.foodordering.service;

import com.ritik.foodordering.dao.AppUserDAO;
import com.ritik.foodordering.dto.AppUserRegistrationDto;
import com.ritik.foodordering.entity.AppUser;
import com.ritik.foodordering.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;


@Service
public class AppUserServiceImpl implements AppUserService{

    @Autowired
    private AppUserDAO appUserDAO;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;







    @Override
    public AppUser save(AppUserRegistrationDto appUserRegistrationDto) {
        AppUser appUser = new AppUser(appUserRegistrationDto.getFirstName(), appUserRegistrationDto.getLastName(), appUserRegistrationDto.getEmail(), bCryptPasswordEncoder.encode(appUserRegistrationDto.getPassword()), Arrays.asList(new Role("ROLE_USER")));


        return appUserDAO.save(appUser);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AppUser user = appUserDAO.findByEmail(username);
        if(user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));

    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

	@Override
	public AppUser findByEmail(String email) {
	AppUser user = appUserDAO.findByEmail(email);	
		return user;
	}
}
