package com.ritik.foodordering.controller;



   
import com.ritik.foodordering.dto.AppUserRegistrationDto;
import com.ritik.foodordering.entity.AppUser;
import com.ritik.foodordering.entity.AuthRequest;
import com.ritik.foodordering.entity.Meals;
import com.ritik.foodordering.service.AppUserService;
import com.ritik.foodordering.service.MealsService;
import com.ritik.foodordering.util.JwtUtil;


import org.slf4j.LoggerFactory;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/public")
public class PublicApiControllers {
	
	 private static final Logger log = LoggerFactory.getLogger(PublicApiControllers.class);


    private JwtUtil jwtUtil;


    private final AppUserService appUserService;


    private final AuthenticationManager authenticationManager;
    private final MealsService mealsService;


    @Autowired
    public PublicApiControllers(JwtUtil jwtUtil, AppUserService appUserService, AuthenticationManager authenticationManager, MealsService mealsService) {
        this.jwtUtil = jwtUtil;
        this.appUserService = appUserService;
        this.authenticationManager = authenticationManager;
        this.mealsService = mealsService;
    }

    @GetMapping("/meals")
    @CrossOrigin
    public List<Meals> getMeals(){

        List <Meals> meals =mealsService.findAll();
        return meals;


    }

    @PostMapping("/registration")
    @CrossOrigin
    public String register(@RequestBody AppUser appUser) throws Exception{
        AppUserRegistrationDto appUserRegistrationDto = new AppUserRegistrationDto(appUser.getFirstName(), appUser.getLastName(), appUser.getEmail(), appUser.getPassword());
        appUserService.save(appUserRegistrationDto);
        return "done";
    }


    @CrossOrigin
    @PostMapping("/token")
    public HashMap<String, String> getToken(@RequestBody AuthRequest authRequest) throws Exception{


        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));

        }
        catch (Exception e){
            throw new Exception("invalid username password");

        }

        HashMap<String, String> map = new HashMap<>();
        String token = jwtUtil.generateToken(authRequest.getUserName());
        map.put("token", token);

        return map;

    }
    
    
    @CrossOrigin
    @PostMapping("/sub-total")
    public HashMap<String, Integer> itemSubtotal(@RequestBody Map<String, List<Map<String, Integer>>> content){
    	
    	System.out.println(content);
       List<Map<String, Integer>> lst =  content.get("item");
     
        
        System.out.println(lst);
    	
        //creating array for storing item id and quantity
        int[] itemId = new int[lst.size()];
//        int[] itemQuantity = new int[lst.size()];
     
        for(int i = 0; i < (lst.size()); i++){
        	itemId[i] = lst.get(i).get("itemid");
        	itemId[i] = lst.get(i).get("quantity");
        }
        
        System.out.println(itemId);
        
    
    
    
    	
    	
    	log.info("==== RESTful API Response using Spring RESTTemplate START =======");


    	
    	
    	
    	HashMap<String, Integer> map = new HashMap<>();
    	return map;
    	
    }
    
    
   @PostMapping("check-jwt-expiration")
   @CrossOrigin
   public ResponseEntity<String> checkJwtExpiration(@RequestBody Map<String, String> data) {
	   Boolean result = null;
	   
	   
	   if(data != null ) {
		   String token = data.get("token");
		    result = jwtUtil.isTokenExpired(token);
		    return new  ResponseEntity<String>(result.toString(), HttpStatus.OK);		    
	   } 
	   else {
		   return new ResponseEntity<String>("token is null", HttpStatus.NO_CONTENT);
	   }
	   
   }
    
    
    
}
