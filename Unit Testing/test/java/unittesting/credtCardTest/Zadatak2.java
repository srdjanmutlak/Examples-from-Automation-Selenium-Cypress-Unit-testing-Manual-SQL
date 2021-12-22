package unittesting.parcijalni;

import static org.junit.Assert.assertFalse;
import static org.mockito.Mockito.when;
import static org.testng.Assert.assertTrue;

import org.mockito.Mockito;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class Zadatak2 {

	private CreditCardService creditCardService;
	private CreditCardDAO mockedCreditCardDAO;

	@BeforeMethod
	public void setUp() {
		creditCardService = new CreditCardService();
		mockedCreditCardDAO = Mockito.mock(CreditCardDAO.class);
		creditCardService.setCreditCardDAO(mockedCreditCardDAO);
	}

	/**
	 * Da bismo usli u case da tryPin vrati NullPointerException, potrebno je
	 * mokovati da metoda findByCreditCardNumber vrati null. U tom slucaju cemo
	 * zavrsiti u prvom if-u i bice vracen NullPointerEception
	 */
	@Test(expectedExceptions = NullPointerException.class)
	public void testNullPointerException() {
		when(mockedCreditCardDAO.findByCreditCardNumber(123456l)).thenReturn(null);

		creditCardService.tryPIN(123456l, 123);
	}

	/**
	 * Da bismo usli u case da tryPin vrati RuntimeException, potrebno je mokovati
	 * da metoda findByCreditCardNumber vrati objekat ciji se PIN ne poklapa sa
	 * postojecim koji je vezan za karticu i da je broj pokusaja veci ili jednak od
	 * 3. U tom slucaju cemo zavrsiti u else-if-u i bice vracen RuntimeException.
	 * Tacno 3 pogresna pokusaja je granicna vrednost
	 */
	@Test(expectedExceptions = RuntimeException.class)
	public void testRuntimeException3WrongTries() {
		CreditCard cc = new CreditCard();
		cc.setPin(123);
		cc.setNumOfTries(3);

		when(mockedCreditCardDAO.findByCreditCardNumber(123456l)).thenReturn(cc);

		creditCardService.tryPIN(123456l, 111);
	}

	/**
	 * Da bismo usli u case da tryPin vrati RuntimeException, potrebno je mokovati
	 * da metoda findByCreditCardNumber vrati objekat ciji se PIN ne poklapa sa
	 * postojecim koji je vezan za karticu i da je broj pokusaja veci ili jednak od
	 * 3. U tom slucaju cemo zavrsiti u else-if-u i bice vracen RuntimeException
	 */
	@Test(expectedExceptions = RuntimeException.class)
	public void testRuntimeExceptionMoreThan3WrongTries() {
		CreditCard cc = new CreditCard();
		cc.setPin(123);
		cc.setNumOfTries(55);

		when(mockedCreditCardDAO.findByCreditCardNumber(123456l)).thenReturn(cc);

		creditCardService.tryPIN(123456l, 111);
	}

	/**
	 * Da bismo usli u case da tryPin vrati false, potrebno je mokovati da metoda
	 * findByCreditCardNumber vrati objekat ciji se PIN ne poklapa sa postojecim
	 * koji je vezan za karticu i da je broj pokusaja manji od 3.
	 */
	@Test
	public void testFalse() {
		when(mockedCreditCardDAO.findByCreditCardNumber(123456l)).thenReturn(new CreditCard(1l, 123456l, 123, 1));

		boolean actualValue = creditCardService.tryPIN(123456l, 111);

		assertFalse(actualValue);
	}

	/**
	 * Da bismo usli u case da tryPin vrati true, potrebno je mokovati da metoda
	 * findByCreditCardNumber vrati objekat ciji se PIN poklapa sa postojecim ostala
	 * polja nisu bitna.
	 */
	@Test
	public void testTrue() {
		when(mockedCreditCardDAO.findByCreditCardNumber(123456l)).thenReturn(new CreditCard(1l, 123456l, 123, 1));

		boolean actualValue = creditCardService.tryPIN(123456l, 123);

		assertTrue(actualValue);
	}
}
