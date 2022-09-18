package com.ritik.foodordering.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name = "order_items")
//@Entity
public class OrderItems {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="order_details", referencedColumnName = "order_id")
	private OrderedDetails orderId;
	
	
	
	@ManyToOne
	@JoinColumn(name ="meals", referencedColumnName = "id")
	private Meals MealsId;
	
	
	 @Column(columnDefinition = "integer default 1")
	private Integer quantity;

	

	public OrderItems() {
		super();
		// TODO Auto-generated constructor stub
	}



	public OrderItems(OrderedDetails orderId, Meals mealsId) {
		super();
		this.orderId = orderId;
		MealsId = mealsId;
	}



	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public OrderedDetails getOrderId() {
		return orderId;
	}



	public void setOrderId(OrderedDetails orderId) {
		this.orderId = orderId;
	}



	public Meals getMealsId() {
		return MealsId;
	}



	public void setMealsId(Meals mealsId) {
		MealsId = mealsId;
	}



	public int getQuantity() {
		return quantity;
	}



	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
	
	

}
