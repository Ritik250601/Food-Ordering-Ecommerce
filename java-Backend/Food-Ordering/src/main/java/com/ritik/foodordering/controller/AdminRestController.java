package com.ritik.foodordering.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ritik.foodordering.entity.AppUser;
import com.ritik.foodordering.entity.OrderedDetails;
import com.ritik.foodordering.service.AppUserService;
import com.ritik.foodordering.service.OrderDetailsService;


@RestController
@RequestMapping("/admin")
public class AdminRestController {
	
	@Autowired
	private AppUserService appUserService;
	
	@Autowired
	private OrderDetailsService orderDetailsService;

	
	
	@CrossOrigin
	@GetMapping("/orderDetails")
	public List<OrderedDetails> orderDetails(Authentication auth) {
		String userName = auth.getName();
		AppUser appUser = appUserService.findByEmail(userName);
		int userId = appUser.getId();
		
		
		
		List<OrderedDetails> orderList = orderDetailsService.getAll();
		
		List<OrderedDetails> userOrdersList = orderList.stream().filter(e -> e.getUserId().getId() == userId).collect(Collectors.toList());
		
		
		return userOrdersList;
	}
	
	
	
	
	@CrossOrigin
	 @GetMapping("/orderDetails/{id}")
	    public String orderDetails(@PathVariable("id") int id) {
		 System.out.println("inside  orderdetails");
		 System.out.println(id);
			return "yes";
	    	
	    }
	 
	 
	
	 
	
	 

}
