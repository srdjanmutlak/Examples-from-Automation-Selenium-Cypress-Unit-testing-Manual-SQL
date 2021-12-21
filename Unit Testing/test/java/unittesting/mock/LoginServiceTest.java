package unittesting.mock;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertTrue;

import org.mockito.Mockito;
import org.testng.annotations.Test;

public class LoginServiceTest {

	@Test
	public void loginBasic() {

		// instanciranje login servisa ciju metodu login zelimo da testiramo u izolaciji
		LoginService service = new LoginService();

		// metoda login ima refrencu ka UserDAO sloju
		// ne zelimo da ponasanje metoda iz te klase uvede gresku u testiranje login
		// metode
		// te je zbog toga pravimo lazni, mock objekat
		UserDAO mockedUserDao = Mockito.mock(UserDAO.class);

		// laziramo ponasanje metode
		when(mockedUserDao.loadByUsername("admin")).thenReturn(new User("admin", "admin"));

		// servis umesto pravog UserDAO objekta, koristi lazni
		service.setUserDao(mockedUserDao);

		// testiramo ponasanje login metode
		assertTrue(service.login("admin", "admin"));
	}
}
