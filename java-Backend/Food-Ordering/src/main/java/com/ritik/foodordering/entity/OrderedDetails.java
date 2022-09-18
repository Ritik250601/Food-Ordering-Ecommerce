package com.ritik.foodordering.entity;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name = "orders_details")
public class OrderedDetails {
	
	@Column(name = "order_id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderId;
	
	
	@ManyToOne
	@JoinColumn(name = "appuser", referencedColumnName = "id")
	private AppUser userId;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "street")
	private String street;
	
	@Column(name = "landmark")
	private String landmark;
	
	@Column(name = "pincode")
	private int pincode;
	
	@Column(name = "orderdItems")
	private String orderdItems;
	
	@Column(name = "totalPrice")
	private double price;
	
	@Column(name = "status")
	private String status;
	  
	

	
	// empty body constructor

	public OrderedDetails() {
		super();
	}


	//all fields constructor


	public OrderedDetails(int orderId, AppUser userId, String city, String street, String landmark, int pincode,
			String orderdItems, double price, String status) {
		super();
		this.orderId = orderId;
		this.userId = userId;
		this.city = city;
		this.street = street;
		this.landmark = landmark;
		this.pincode = pincode;
		this.orderdItems = orderdItems;
		this.price = price;
		this.status = status;
	}

	
	//all fields constructor except orderId

	public OrderedDetails(AppUser userId, String city, String street, String landmark, int pincode, String orderdItems,
			double price, String status) {
		super();
		this.userId = userId;
		this.city = city;
		this.street = street;
		this.landmark = landmark;
		this.pincode = pincode;
		this.orderdItems = orderdItems;
		this.price = price;
	    this.status = status;

	}
	
	
	// getters and setters


	public int getOrderId() {
		return orderId;
	}


	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}


	public AppUser getUserId() {
		return userId;
	}


	public void setUserId(AppUser userId) {
		this.userId = userId;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getStreet() {
		return street;
	}


	public void setStreet(String street) {
		this.street = street;
	}


	public String getLandmark() {
		return landmark;
	}


	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}


	public int getPincode() {
		return pincode;
	}


	public void setPincode(int pincode) {
		this.pincode = pincode;
	}


	public String getOrderdItems() {
		return orderdItems;
	}


	public void setOrderdItems(String orderdItems) {
		this.orderdItems = orderdItems;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}
	
	
	


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}

//toString() method
	
	
	@Override
	public String toString() {
		return "OrderedDetails [orderId=" + orderId + ", userId=" + userId + ", city=" + city + ", street=" + street
				+ ", landmark=" + landmark + ", pincode=" + pincode + ", orderdItems=" + orderdItems + ", price="
				+ price + ", status=" + status + "]";
	}


	

	

	
	
	

	
	
	
	
}