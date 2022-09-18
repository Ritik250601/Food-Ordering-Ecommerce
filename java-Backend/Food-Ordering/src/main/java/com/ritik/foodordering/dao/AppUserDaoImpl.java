package com.ritik.foodordering.dao;

import com.ritik.foodordering.entity.AppUser;
import org.hibernate.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;


@Repository
public class AppUserDaoImpl implements AppUserDAO{

    // define field for entitymanager
    @Autowired
    private EntityManager entityManager;


    @Override
    public AppUser save(AppUser appUser) {
        // get the current hibernate session
        Session currentSession = entityManager.unwrap(Session.class);

        //save employee
        currentSession.saveOrUpdate(appUser);
        return appUser;


    }


    @Override
    public List<AppUser> getUser() {
        return null;
    }

    @Override
    public AppUser findByEmail(String username) {
        // get the current hibernate session
        Session currentSession = entityManager.unwrap(Session.class);

        //create a query

        Query query = currentSession.createQuery("from AppUser u where u.email = :email");
        query.setParameter("email", username);
        @SuppressWarnings("unchecked")
		List<AppUser> appUserList = query.getResultList();
        AppUser appUser = appUserList.get(0);


        return appUser;
    }


}
