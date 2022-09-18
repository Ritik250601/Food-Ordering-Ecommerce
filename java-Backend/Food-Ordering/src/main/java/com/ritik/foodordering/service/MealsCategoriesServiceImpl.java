package com.ritik.foodordering.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ritik.foodordering.dao.MealsCategoresDao;
import com.ritik.foodordering.entity.MealsCategories;


@Service
public class MealsCategoriesServiceImpl implements MealsCategoriesService{
	
	@Autowired
	private MealsCategoresDao mealsCategoresDao;
	

	@Override
	public MealsCategories addCategories(MealsCategories mealsCategories) {
		// TODO Auto-generated method stub
		return mealsCategoresDao.addCategories(mealsCategories);
	}


	@Override
	public List<MealsCategories> allcategories() {
		// TODO Auto-generated method stub
		return mealsCategoresDao.allcategories();
	}

}
