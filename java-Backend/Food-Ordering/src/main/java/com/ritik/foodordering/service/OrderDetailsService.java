package com.ritik.foodordering.service;

import java.util.List;

import com.ritik.foodordering.entity.OrderedDetails;

public interface OrderDetailsService {
	public OrderedDetails save(OrderedDetails orderedDetails);
	public boolean updateStatus(OrderedDetails orderedDetails);
	
	public OrderedDetails getOrderDetailsById(int id);
	public List<OrderedDetails> getAll();

}
