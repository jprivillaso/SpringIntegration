package com.test;

import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.entities.Account;
import com.repositories.AccountRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/META-INF/application-context.xml")
public class CheckEntityManagerWorksTest {

	@Autowired
	private AccountRepository accountsRepository;

	@Test
	public void testPersistence() {
		Account account = accountsRepository.findOne(2);
		assertNotNull(account);
	}
}