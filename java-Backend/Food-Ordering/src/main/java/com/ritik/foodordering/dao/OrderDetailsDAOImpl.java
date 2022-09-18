package com.ritik.foodordering.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ritik.foodordering.entity.OrderedDetails;



@Repository
public class OrderDetailsDAOImpl implements OrderDetailsDAO{
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public OrderedDetails save(OrderedDetails orderedDetails) {
		
		//get the current session
		Session session  = entityManager.unwrap(Session.class);
		
		
		//save the ordered details
		session.saveOrUpdate(orderedDetails);
		
		return orderedDetails;
	}

	@Override
	public OrderedDetails getOrderDetailsById(int id) {
		// get the current session
		Session session = entityManager.unwrap(Session.class);
		
		
       // return orderdetails of given id
		return session.get(OrderedDetails.class, id);
	}

	@Override
	public List<OrderedDetails> getAll() {
		//get the current session 
		Session session = entityManager.unwrap(Session.class);
		
		return session.createQuery("from OrderedDetails", OrderedDetails.class).getResultList();
	}

	@Override
	public boolean updateStatus(OrderedDetails orderedDetails) {
		Session session = entityManager.unwrap(Session.class);
		
	
		OrderedDetails od = getOrderDetailsById(orderedDetails.getOrderId());
		session.save(od);
		
		od.setStatus(orderedDetails.getStatus());
		
		System.out.println(od);
		
		session.update(od);
		
		
		return true;
	}

}
