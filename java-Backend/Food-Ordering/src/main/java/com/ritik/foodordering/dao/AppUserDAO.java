package com.ritik.foodordering.dao;

import com.ritik.foodordering.entity.AppUser;

import java.util.List;

public interface AppUserDAO {

    public AppUser save(AppUser appUser);

    public List<AppUser> getUser();


    public AppUser findByEmail(String username);
}
