package com.ritik.foodordering.dao;

import com.ritik.foodordering.entity.Meals;

import java.util.List;

public interface MealsDAO {

    public List<Meals> findAll();
    
    public Meals save(Meals meals);
    
    public Meals getMealsById(int id);
    
    public Meals deleteMealsById(int id);

}
