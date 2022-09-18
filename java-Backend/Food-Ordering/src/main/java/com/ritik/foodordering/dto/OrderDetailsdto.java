package com.ritik.foodordering.dto;

import java.util.ArrayList;
import java.util.Map;

public class OrderDetailsdto {
	
	private String city;
	private String Street;
	private String landMark;
	private int pincode;
	private ArrayList<Map<String, Integer>> checkoutItems;
	private String status;
	
	
	//getters abd setters
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getStreet() {
		return Street;
	}
	public void setStreet(String street) {
		Street = street;
	}
	public String getLandMark() {
		return landMark;
	}
	public void setLandMark(String landMark) {
		this.landMark = landMark;
	}
	public int getPincode() {
		return pincode;
	}
	public void setPincode(int pincode) {
		this.pincode = pincode;
	}
	


	public ArrayList<Map<String,Integer>> getCheckoutItems() {
		return checkoutItems;
	}
	public void setCheckoutItems(ArrayList<Map<String, Integer>> checkoutItems) {
		this.checkoutItems = checkoutItems;
	}
	
	
	
	
	// toString() method
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "OrderDetailsdto [city=" + city + ", Street=" + Street + ", landMark=" + landMark + ", pincode="
				+ pincode + ", checkoutItems=" + checkoutItems + ", status=" + status + "]";
	}
	
	
	
	
	
	
	
	
	

}
