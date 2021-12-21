package unittesting.customer;

import org.mockito.Mockito;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class Zadatak2 {

	private CustomerService customerService;

	private CustomerDAO mockedCustomerDao;

	@BeforeMethod
	public void setUp() throws Exception {
		mockedCustomerDao = Mockito.mock(CustomerDAO.class);
		
		customerService = new CustomerService();
		customerService.setCustomerDao(mockedCustomerDao);
	}

	@Test
	public void testFindCustomerFullName() {
		Customer customer = new Customer(3, "Marko", "Markovic", 1212333344445555L);
		
		when(mockedCustomerDao.find(3)).thenReturn(customer);
		
		String actualValue = customerService.findCustomerFullName(3);
		assertEquals(actualValue, "Marko Markovic");
	}

	@Test
    public void testCustomerNotPresentInDB(){
		when(mockedCustomerDao.find(101)).thenReturn(null);

        String actualValue = customerService.findCustomerFullName(101);
        assertEquals(actualValue, "");
    }   
}
