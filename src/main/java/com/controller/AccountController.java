package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entities.Account;
import com.repositories.AccountRepository;
	
@Controller
@RequestMapping(value="/account")
public class AccountController {
	
	@Autowired
	AccountRepository repository;
	
	@RequestMapping(value="/getAccountUser")
	public @ResponseBody String getAccountUser(@RequestParam("id") int id){
		Account account = repository.findOne(id);
		return "The account owner is: " + account.getFirstname() 
				+ "-" + account.getLastname();
	}
	
	@RequestMapping(value="/search")
	public @ResponseBody Account getAccountById(@RequestParam("id") int id){
		return repository.findOne(id);
	}
	
	@RequestMapping(value="/save")
	public @ResponseBody void saveAccount(@RequestParam("lastname") String lastname, 
			@RequestParam("firstname") String firstname, 
			@RequestParam("username") String username){
		Account account = new Account();

		if(lastname != "" || firstname != ""){
			account.setFirstname(firstname);
			account.setLastname(lastname);
			if(username != null && username != ""){
				account.setUsername(username);
			}else{
				account.setUsername(firstname + "." + lastname );
			}
			repository.save(account);
		}
	}
	
	@RequestMapping(value = "/edit")
	public @ResponseBody void editAccount(@RequestParam("id") int id,
							@RequestParam("lastname") String lastname,
							@RequestParam("firstname") String firstname,
							@RequestParam("username") String username) {
		
		Account account = repository.findOne(id);
		account.setFirstname(firstname);
		account.setLastname(lastname);
		account.setUsername(firstname + "." + lastname );
		repository.save(account);
	}
	
	@RequestMapping(value = "/delete")
	public @ResponseBody void deletAccount(@RequestParam("id") int id){
		repository.delete(id);
	}
		
	@RequestMapping(value="/getAllAccounts")
	public @ResponseBody List<Account> getAllAccounts(){
		List<Account> accountsList = repository.findAll();
		
		return accountsList;
	}
}
