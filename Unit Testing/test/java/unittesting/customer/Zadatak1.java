package unittesting.customer;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class Zadatak1 {

	CustomerService customerService;

	@BeforeMethod
	public void setUp() throws Exception {
		customerService = new CustomerService();
	}

	@Test(dataProvider = "provideCreditCardNumbers")
	public void testCustomerCreditCardNumber(long creditCardNumber, boolean valid) {

		boolean actualValue = customerService.checkCustomerCreditCardNumber(creditCardNumber);

		Assert.assertEquals(actualValue, valid);
	}

	@Test(expectedExceptions = IllegalArgumentException.class)
	public void testCustomerCreditCardNumberWithException() {

		boolean actualValue = customerService.checkCustomerCreditCardNumber(-12L);

		Assert.assertFalse(actualValue);
	}

	@DataProvider(name = "provideCreditCardNumbers")
	public static Object[][] provideData() {

		return new Object[][] { { 5686996754261232L, true }, { 2424L, false }, { 111111111111111111L, false } };
	}

}
