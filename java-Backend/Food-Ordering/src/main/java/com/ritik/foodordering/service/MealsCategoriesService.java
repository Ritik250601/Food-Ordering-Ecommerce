package com.ritik.foodordering.service;

import java.util.List;

import com.ritik.foodordering.entity.MealsCategories;

public interface MealsCategoriesService {
	public MealsCategories addCategories(MealsCategories mealsCategories);
	
	public List<MealsCategories> allcategories();


}
