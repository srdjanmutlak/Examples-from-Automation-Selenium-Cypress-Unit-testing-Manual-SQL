package unittesting.parcijalni;

import static org.testng.Assert.assertEquals;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;


public class Zadatak1 {

	private CreditCardService creditCardService;

	@BeforeMethod
	public void setUp() {
		creditCardService = new CreditCardService();
	}
	
	@Test(dataProvider = "zadatak1Provajder", dataProviderClass = KlasaDataProvider.class)
	public void testZadatak1DP(double balance, double amount, double limit, String status) {
		String actual = creditCardService.transaction(balance, amount, limit);
		
		assertEquals(actual, status);
	}
}
