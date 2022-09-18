package com.ritik.foodordering.service;

import com.ritik.foodordering.dao.MealsDAO;
import com.ritik.foodordering.entity.Meals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.transaction.Transactional;

@Service
public class MealsServiceImpl implements MealsService{

    @Autowired
    private MealsDAO mealsDAO;

    @Override
    public List<Meals> findAll() {
        return mealsDAO.findAll();
    }

	@Override
	@Transactional
	public Meals save(Meals meals) {
		// TODO Auto-generated method stub
		return mealsDAO.save(meals);
	}

	
	@Override
	public Meals getMealsById(int id) {
		// TODO Auto-generated method stub
		return mealsDAO.getMealsById(id);
	}

	@Override
	@Transactional
	public Meals deleteMealsById(int id) {
		// TODO Auto-generated method stub
		return mealsDAO.deleteMealsById(id);
	}
}
