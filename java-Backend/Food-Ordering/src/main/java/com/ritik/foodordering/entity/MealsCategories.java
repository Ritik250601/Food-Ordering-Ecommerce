package com.ritik.foodordering.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "meals_categories")
public class MealsCategories {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String categories;

	
	//empty body constructor
	public MealsCategories() {
		super();
		// TODO Auto-generated constructor stub
	}


	//constructor without id
	public MealsCategories(String categories) {
		super();
		this.categories = categories;
	}
	
	
	
	
	
	//all arg constructor
	public MealsCategories(int id, String categories) {
		super();
		this.id = id;
		this.categories = categories;
	}


	//getters and setters
	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getCategories() {
		return categories;
	}


	public void setCategories(String categories) {
		this.categories = categories;
	}

	
	
	///toString() method

	@Override
	public String toString() {
		return "MealsCategories [id=" + id + ", categories=" + categories + "]";
	}



	
	
	
	
	

}
