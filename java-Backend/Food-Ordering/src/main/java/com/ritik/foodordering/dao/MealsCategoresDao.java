package com.ritik.foodordering.dao;

import java.util.List;

import com.ritik.foodordering.entity.MealsCategories;

public interface MealsCategoresDao {
	
	public MealsCategories addCategories(MealsCategories mealsCategories);
	
	public List<MealsCategories> allcategories();

}
