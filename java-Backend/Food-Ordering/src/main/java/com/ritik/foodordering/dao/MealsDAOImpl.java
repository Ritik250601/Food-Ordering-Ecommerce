package com.ritik.foodordering.dao;


import com.ritik.foodordering.entity.Meals;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;


@Repository
public class MealsDAOImpl implements MealsDAO{

    private final EntityManager entityManager;

    //construtor injection for EntityManager
    @Autowired
    public MealsDAOImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }



    @Override
    public List<Meals> findAll() {
        //get the current hibernate session
        Session currentSession = entityManager.unwrap(Session.class);


        //create a query
        Query query = currentSession.createQuery("from Meals", Meals.class);

        //execute a query and get a result
      @SuppressWarnings("unchecked")
	List<Meals> meals = query.getResultList();
        //return result
        return meals;
    }



	@Override
	public Meals save(Meals meals) {
		// get the current hibernate session
		Session session = entityManager.unwrap(Session.class);
		

		//save employee
	     session.saveOrUpdate(meals);		
		return meals;
	}



	@Override
	public Meals getMealsById(int id) {
		// get the current hibernate sesssion
		Session currentSession = entityManager.unwrap(Session.class);
		
		
		Meals meal =  currentSession.get(Meals.class, id);
		return meal;
	}



	@Override
	public Meals deleteMealsById(int id) {
		//get the current session
		Session session = entityManager.unwrap(Session.class);
		Meals meals = getMealsById(id);
		session.remove(meals);
		
		return meals;
	}
}
