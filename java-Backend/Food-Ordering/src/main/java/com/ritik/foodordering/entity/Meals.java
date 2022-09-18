package com.ritik.foodordering.entity;




import javax.persistence.*;

@Entity
@Table(name = "meals")
public class Meals {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

     @Column(name = "name")
    private String name;

     @Column(name = "short_description")
    private String shortDescription;

     @Column(name = "description", length = 500)
    private String description;
     
     @Column(name = "actual_price")
     private double actualPrice;
     
     @Column(name = "discountedPrice")
     private double discountedPrice;
     
     

     @ManyToOne
     private MealsCategories mealsCategories;
     
   

    
     @Column(name = "image")
    private String image;


    // no arg constructor
    public Meals() {
    }

    
    //all arg constructor except id

	public Meals(String name, String shortDescription, String description, double actualPrice, double discountedPrice,
			MealsCategories mealsCategories, String image) {
		super();
		this.name = name;
		this.shortDescription = shortDescription;
		this.description = description;
		this.actualPrice = actualPrice;
		this.discountedPrice = discountedPrice;
		this.mealsCategories = mealsCategories;
		this.image = image;
	}

	
	//getters and setters
	

	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
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


	public double getActualPrice() {
		return actualPrice;
	}


	public void setActualPrice(double actualPrice) {
		this.actualPrice = actualPrice;
	}


	public double getDiscountedPrice() {
		return discountedPrice;
	}


	public void setDiscountedPrice(double discountedPrice) {
		this.discountedPrice = discountedPrice;
	}


	public MealsCategories getMealsCategories() {
		return mealsCategories;
	}


	public void setMealsCategories(MealsCategories mealsCategories) {
		this.mealsCategories = mealsCategories;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	
	//toString() method
	
	@Override
	public String toString() {
		return "Meals [id=" + id + ", name=" + name + ", shortDescription=" + shortDescription + ", description="
				+ description + ", actualPrice=" + actualPrice + ", discountedPrice=" + discountedPrice
				+ ", mealsCategories=" + mealsCategories + ", image=" + image + "]";
	}


   
	

     
    
                
}
