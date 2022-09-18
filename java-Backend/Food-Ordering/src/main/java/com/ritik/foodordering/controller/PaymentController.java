package com.ritik.foodordering.controller;

import java.util.Map;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.*;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.ritik.foodordering.entity.OrderedDetails;
import com.ritik.foodordering.service.OrderDetailsService;



@RestController
public class PaymentController {
	
  @Autowired 
  private OrderDetailsService orderDetailsService; 
	
	@CrossOrigin
	@PostMapping("/create_order")
	public String createOrder(@RequestBody Map<String, Integer> data) throws RazorpayException {
		
		
		System.out.println("this is a order id" + data);
		//in data Object we have orderId from that order id we will retrieve total amount
		int orderId = data.get("id");
		OrderedDetails orderedDetails = orderDetailsService.getOrderDetailsById(orderId);
		
		double amount = orderedDetails.getPrice();
	    System.out.println(amount);
		
		//calling razorpay api and storing in client variable
		RazorpayClient client = new RazorpayClient("rzp_test_RNhfW5h0zqfqkF", "9i8cMyf9qOaEKA3e4j2isdWv");
		
		//json object
		
		JSONObject ob = new JSONObject();
		ob.put("amount", amount*100);
		ob.put("currency", "INR");
		ob.put("receipt", "txn_235425");
		
		
		//creating new order
		Order order = client.Orders.create(ob);
		
		System.out.println(order);


		
		
		
		return order.toString();
	}
}
	



