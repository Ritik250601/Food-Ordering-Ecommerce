package com.ritik.foodordering.config;


import com.ritik.foodordering.filter.JwtFilter;
import com.ritik.foodordering.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{


	@Autowired
	private JwtFilter jwtFilter;
	@Autowired
	private AppUserService appUserService;

	@Bean(name = "bCryptPasswordEncoder")
	public static BCryptPasswordEncoder bCryptPasswordEncoder(){
		return new BCryptPasswordEncoder(10);
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider(){
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
		auth.setUserDetailsService(appUserService);
		auth.setPasswordEncoder(bCryptPasswordEncoder());
		return auth;

	}


	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}



	  @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http.cors();
		  http.headers().frameOptions().disable();
		  http.csrf().disable();
			http.authorizeRequests().antMatchers(

					"/public/**",
					"/admin/**",
					"/image/**",
					"/h2-console/**",
					"/**", 
					"/ws/**"

			).permitAll()
					.anyRequest().authenticated()
					.and().exceptionHandling().and().sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		  http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	    }

	  
	
	  
	  
}
