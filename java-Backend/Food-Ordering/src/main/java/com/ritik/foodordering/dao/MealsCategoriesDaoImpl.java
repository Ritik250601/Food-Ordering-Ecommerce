package com.ritik.foodordering.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ritik.foodordering.entity.MealsCategories;


@Repository
public class MealsCategoriesDaoImpl implements MealsCategoresDao{
	@Autowired
	private EntityManager entityManager;
	

	@Override
	public MealsCategories addCategories(MealsCategories mealsCategories) {
		//create the current session
		
		Session session = entityManager.unwrap(Session.class);
		
		session.save(mealsCategories);
		
		
		return mealsCategories;
		
	}


	@Override
	public List<MealsCategories> allcategories() {
		// get the current session 
		Session session = entityManager.unwrap(Session.class);
		
		//create query
	      Query query = session.createQuery("from MealsCategories", MealsCategories.class);
		  
	      @SuppressWarnings("unchecked")
		List<MealsCategories> mealsCat = query.getResultList();
	      
	      return mealsCat;
	}

}
