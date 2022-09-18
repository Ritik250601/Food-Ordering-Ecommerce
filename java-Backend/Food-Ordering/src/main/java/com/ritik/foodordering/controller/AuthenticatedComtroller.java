package com.ritik.foodordering.controller;


import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ritik.foodordering.dto.OrderDetailsdto;
import com.ritik.foodordering.entity.AppUser;
import com.ritik.foodordering.entity.OrderedDetails;
import com.ritik.foodordering.service.AppUserService;
import com.ritik.foodordering.service.MealsService;
import com.ritik.foodordering.service.OrderDetailsService;

@RequestMapping("/private")
@RestController
public class AuthenticatedComtroller {
	
	
	@Autowired
	private AppUserService appUserService;
	
	@Autowired
	private OrderDetailsService orderDetailsService;
	
	@Autowired
	private MealsService mealsService;
	
	@CrossOrigin
	@PostMapping("/orders")
	public Map<String, String>  orderDetails(@RequestBody OrderDetailsdto od, Authentication auth)  {

	   if(!auth.isAuthenticated()) {
		   return Collections.singletonMap("status", "user Not Authenticated");
	   }
		
		//get userId by email/userName 
		String email = auth.getName();
		AppUser user = appUserService.findByEmail(email);
		int id = user.getId();
		System.out.println(user);
		

		//get all the fields of OrderDetails
		
		String city = od.getCity();
		String street = od.getStreet();
		String landMark = od.getLandMark();
		int pincode = od.getPincode();
		String status = od.getStatus();

		
	
		//get ordered Items information
		
		ArrayList<Map<String, Integer>> orderdItemsDetails = od.getCheckoutItems();
		
		//we will store complete order details as string
		String orderedItems = "";
		double totalPrice = 0;
		
		// we will use for loop for getting all the order related information
		for(int i = 0; i < orderdItemsDetails.size(); i++ ) {
			//get meals by provided id

			int itemId = orderdItemsDetails.get(i).get("id");
			String name =  mealsService.getMealsById(itemId).getName();
			int quantity = orderdItemsDetails.get(i).get("quantity");
			double price = mealsService.getMealsById(itemId).getDiscountedPrice();
		   totalPrice = totalPrice + (price*quantity);
			orderedItems = orderedItems + " " + name + "("+quantity + ")"+  " ";
		}
	
		
		//save to database
		  OrderedDetails saveOrderDetails =   orderDetailsService.save(new OrderedDetails(user, city, street, landMark, pincode, orderedItems, totalPrice, status));
		
		  
				 System.out.println(saveOrderDetails);
		  
		  
		//return success message and orderId 
		  String orderDetailsId = Integer.toString(saveOrderDetails.getOrderId());
		
		  
	
		Map<String, String> response = new HashMap<>();
		response.put("status", "done");
		response.put("orderId", orderDetailsId);
		
		
		return response;
	}
	

}
