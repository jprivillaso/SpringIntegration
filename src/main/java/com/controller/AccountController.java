package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
	public @ResponseBody Page<Account> getAllAccounts(@RequestParam("sidx") String sidx,
			@RequestParam("sord") String sord,
			@RequestParam("rows") int rowsxView,
			@RequestParam("page") int pageNumber){
		
		PageRequest request;

		if(sord.toLowerCase().equals("desc")){
			request = new PageRequest(pageNumber - 1, rowsxView, Sort.Direction.DESC, sidx);
		}else{
			request = new PageRequest(pageNumber - 1, rowsxView, Sort.Direction.ASC, sidx);
		}
	    return repository.findAll(request);
	}
}
