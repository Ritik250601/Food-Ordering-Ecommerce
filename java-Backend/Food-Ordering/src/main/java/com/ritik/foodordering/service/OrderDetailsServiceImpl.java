package com.ritik.foodordering.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ritik.foodordering.dao.OrderDetailsDAO;
import com.ritik.foodordering.entity.OrderedDetails;


@Component
public class OrderDetailsServiceImpl implements OrderDetailsService{
	
	@Autowired
	private OrderDetailsDAO orderDetailsDAO;
	
	
	@Override
	public OrderedDetails save(OrderedDetails orderedDetails) {
		// TODO Auto-generated method stub
		 orderDetailsDAO.save(orderedDetails);
		return orderedDetails;
	}


	@Override
	public OrderedDetails getOrderDetailsById(int id) {
		// TODO Auto-generated method stub
		return orderDetailsDAO.getOrderDetailsById(id);
	}


	@Override
	public List<OrderedDetails> getAll() {
		
		return orderDetailsDAO.getAll();
	}


	@Override
	@Transactional
	public boolean updateStatus(OrderedDetails orderedDetails) {
		// TODO Auto-generated method stub
		return orderDetailsDAO.updateStatus(orderedDetails);
	}

}
