package com.ritik.foodordering.dto;



import org.springframework.web.multipart.MultipartFile;

import com.ritik.foodordering.entity.MealsCategories;

public class AddMealsDto {
	
	private String name;
	private String shortDescription;
	private String description;
	private double actual_price;
	private double discounted_price;
	private MealsCategories mealsCategories;
	private MultipartFile pic;
	
	
	
	//empty body constructor
	public AddMealsDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	
	
	
	//all fields constructor
	public AddMealsDto(String name, String shortDescription, String description, double actual_price,
			double discounted_price, MealsCategories mealsCategories, MultipartFile pic) {
		super();
		this.name = name;
		this.shortDescription = shortDescription;
		this.description = description;
		this.actual_price = actual_price;
		this.discounted_price = discounted_price;
		this.mealsCategories = mealsCategories;
		this.pic = pic;
	}
	
	
	


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getShortDescription() {
		return shortDescription;
	}
	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getActual_price() {
		return actual_price;
	}
	public void setActual_price(double actual_price) {
		this.actual_price = actual_price;
	}
	public double getDiscounted_price() {
		return discounted_price;
	}
	public void setDiscounted_price(double discounted_price) {
		this.discounted_price = discounted_price;
	}
	public MealsCategories getMealsCategories() {
		return mealsCategories;
	}
	public void setMealsCategories(MealsCategories mealsCategories) {
		this.mealsCategories = mealsCategories;
	}
	public MultipartFile getPic() {
		return pic;
	}
	public void setPic(MultipartFile pic) {
		this.pic = pic;
	}
	
	
	
	@Override
	public String toString() {
		return "AddMealsDto [name=" + name + ", shortDescription=" + shortDescription + ", description=" + description
				+ ", actual_price=" + actual_price + ", discounted_price=" + discounted_price + ", mealsCategories="
				+ mealsCategories + ", pic=" + pic + "]";
	}
	
	
	
	

	

}
