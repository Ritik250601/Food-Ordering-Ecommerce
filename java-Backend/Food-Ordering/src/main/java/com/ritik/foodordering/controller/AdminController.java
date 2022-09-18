package com.ritik.foodordering.controller;



import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import com.ritik.foodordering.dto.AddMealsDto;
import com.ritik.foodordering.entity.Meals;
import com.ritik.foodordering.entity.MealsCategories;
import com.ritik.foodordering.entity.OrderedDetails;
import com.ritik.foodordering.playload.FileResponses;
import com.ritik.foodordering.service.FileService;
import com.ritik.foodordering.service.MealsCategoriesService;
import com.ritik.foodordering.service.MealsService;
import com.ritik.foodordering.service.OrderDetailsService;


@Controller
@RequestMapping("/admin")
public class AdminController {
	
	
	
	
	@Autowired
	private MealsService mealsService;
	
	@Autowired
    private FileService fileService; 
	
	@Value("${project.image}")
	private String path;
	
	@Autowired
	private OrderDetailsService orderDetailsService;
	
	@Autowired
	private MealsCategoriesService mealsCategoriesService;
	
	
	
	@GetMapping
	public String admin() {
		return "admin";
	}
	
	
	
	
	

    @GetMapping("/addMeals")
    public String addMeals(Model model){
    	
    	//Create a addMeals object
    	AddMealsDto addMeals = new AddMealsDto();   	
  model.addAttribute("addMeals", addMeals);

        return "addMeals";
    }
    
    
    @PostMapping("/addMeals")
    public ResponseEntity<FileResponses> addMeals(@ModelAttribute("addMeals") AddMealsDto addmeals, HttpServletRequest request ){
    	System.out.println("here is i ams");
    	//get the input from form
    	
    	MealsCategories mealsCategories = new MealsCategories(1,"Frankie");
   
    	
    	String name = addmeals.getName();
        String shortDescription = addmeals.getShortDescription();
        String description = addmeals.getDescription();
        double actualPrice = addmeals.getActual_price();
        double discountedPrice = addmeals.getDiscounted_price();
//        MealsCategories categories = addmeals.getMealsCategories();
        MultipartFile multipartImage = addmeals.getPic();
        String imageName = multipartImage.getOriginalFilename();
       
//        System.out.println("the meals categories is " + categories);
        
//        //instantionate Meals Class
      Meals meals = new Meals(name, shortDescription, description, actualPrice,discountedPrice,mealsCategories, imageName);
       
      
      //save the new meals to db
      mealsService.save(meals);
    
      //save the pic to new folder  
    String fileName = null;
      
  	try {
		
		fileName = fileService.uploadImage(path, multipartImage);
		
	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		return new ResponseEntity<>(new FileResponses(null,"image is not inserted" ), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	
	
	return new ResponseEntity<>(new FileResponses(fileName,"image is successfully inserted" ), HttpStatus.OK);
    
    }
    
    @GetMapping(value = "/images/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void showImage(@PathVariable("imageName") String imageName, HttpServletResponse response) throws IOException {
		
		 InputStream resources = fileService.getResources(path, imageName);
		 response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		 StreamUtils.copy(resources, response.getOutputStream());
		
		
	}
    
    
    //order Update Controller
    
    
    @GetMapping("/orders")
    public String orders( Model model) {
    	
    	List<OrderedDetails> od = orderDetailsService.getAll();
    	model.addAttribute("od", od);
//    	System.out.println(od.get(0).getStatus());
//    	ModelAndView mav = new ModelAndView("od");
//    	mav.addObject("od",orderDetailsService.getAll());
    	System.out.println();
    
    	
    	return "orders";

    }
    
    @GetMapping("/updateOrder")
    public String updateOrder() {
    	return "updateOrder";
    }
    
    @GetMapping("/editOrders/{id}")
    public String editOrders(@PathVariable("id") int id, Model model) {
    	OrderedDetails od = orderDetailsService.getOrderDetailsById(id);
    	model.addAttribute("od", od);
       	
    	return "updateOrder";
    }
    
    @PostMapping("/updateOrderStatus/{id}")
    public RedirectView updateOrder(@PathVariable("id") int id, @ModelAttribute("od")  OrderedDetails  od) {
 
    	OrderedDetails currentOd = orderDetailsService.getOrderDetailsById(id);
  
    	currentOd.setStatus(od.getStatus());
    	orderDetailsService.updateStatus(currentOd);
    	
    	 
    	return  new RedirectView("/admin/orders");
    	
    	
    }
    
    @GetMapping("/addCategories")
    public String addCategoies() {
    	return "addCategories";
    }
    
    @PostMapping("/addCategories")
    public RedirectView addCategories(HttpServletRequest rq, Model model) {
    	String categories = rq.getParameter("categories");
    	MealsCategories mealsCategories = new MealsCategories(categories);
    	
    	mealsCategoriesService.addCategories(mealsCategories);
    	
    	
    	System.out.println("redirecting...");
    	
    	return new RedirectView("/admin/allCategories");
    }
    
   
    
    @RequestMapping("/allCategories")
    public String addCategories( Model model) {
    	List<MealsCategories> allCategories = mealsCategoriesService.allcategories();
    	System.out.println(allCategories);
    	
    	model.addAttribute("allCategories", allCategories);
    	
    	return "allCategories";
    }
    
    @GetMapping("/meals")
    public String meals(Model model) {
    List<Meals> meals = 	mealsService.findAll();
    model.addAttribute("meals", meals);
    	
  
    	return "allMeals";
    }

    
    @RequestMapping("/deleteMeals/{id}")
    public RedirectView meals(@PathVariable("id") int id) {
    	System.out.println(id);
    	mealsService.deleteMealsById(id);
   
    	
    	return new RedirectView("/admin/meals");
    }

}
