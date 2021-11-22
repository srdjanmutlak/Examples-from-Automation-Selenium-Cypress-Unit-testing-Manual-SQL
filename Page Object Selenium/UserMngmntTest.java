package pageFactory.termin18;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotEquals;
import static org.testng.Assert.assertTrue;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

public class Parcijalni {

	private WebDriver driver;
	private NavbarPage navbarPage;
	private LoginPage loginPage;
	private ModalDeletePage modalDeletePage;
	private UserMngmnt userMngmnt;

	@BeforeSuite
	public void initalize() {

		// Create a Selenium WebDriver instance
		System.setProperty("webdriver.chrome.driver", "chromedriver");
		driver = new ChromeDriver();

		navbarPage = new NavbarPage(driver);

		// Configure browser if required
		// Maximize browser window
		driver.manage().window().maximize();

		// Wait 5 seconds for loading the page before Exception
		driver.manage().timeouts().pageLoadTimeout(5, TimeUnit.SECONDS);

		// Wait 1 second before very action
		driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);

		// Navigate to the required web page
		driver.navigate().to("http://localhost:8080/#/");

	}

	@Test
	public void login() {
		navbarPage.clickAccountLink();
		navbarPage.clickSignInLink();

		// instanciramo objekat LoginPage
		loginPage = new LoginPage(driver);

		// trvdimo da je tacno da je title stranice "Sign in"
		assertTrue(loginPage.presentsOfTitle("Sign in"));

		loginPage.setUsername("admin");
		loginPage.setPassword("admin");
		loginPage.clickSignInButton();

		// tvrdimo da se text koji dobijemo nakon uspesnog logovanja poklapa sa tekstom
		
		String msgString = loginPage.getWelcomeTxt();
		assertEquals(msgString, "You are logged in as user \"admin\".");
	}

	/**
	 * Metoda ce se izvrsiti samo ako se login test metoda izvrsila uspesno
	 */
	@Test(dependsOnMethods = { "login" })
	public void testUserMngmnt() {

		navbarPage.clickAdministrationLink();
		navbarPage.clickUserMngmntLink();

		// instanciramo objekat klase 
		userMngmnt = new UserMngmnt(driver);
		
		//ADD FIRST USER

		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());

		// selektujemo broj usera u tabeli pre dodavanja
		int numOfTableRowsBefore = userMngmnt.numberOfUsersInTable();

		userMngmnt.clickAddUser();

		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management/new"));

		// tvrdimo da je modalni dijalog prisutan na stranici
		assertTrue(userMngmnt.getModalDialog().isDisplayed());

		// popunjavamo sva input polja i klikcemo na "Save" dugme
		userMngmnt.populateUsersFields("user222", "Jovana", "Jovanovski", "jovanaj1234@gmail.com", "en");

		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management"));

		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());

		// tvrdimo da se u tabeli nalazi user
		assertTrue(userMngmnt.isUserInTable("user222"), "Can't locate added user user222");

		// selektujemo broj usera u tabeli nakon dodavanja
		int numOfTableRowsAfter = userMngmnt.numberOfUsersInTable();

		// tvrdimo da se broj usera uvecao za 2
		assertEquals(numOfTableRowsAfter, numOfTableRowsBefore + 1);
		
		//ADD SECOND USER

		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());

		// selektujemo broj usera u tabeli pre dodavanja
		int numOfTableRowsBefore2 = userMngmnt.numberOfUsersInTable();

		userMngmnt.clickAddUser();

		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management/new"));

		// tvrdimo da je modalni dijalog prisutan na stranici
		assertTrue(userMngmnt.getModalDialog().isDisplayed());

		// popunjavamo sva input polja i klikcemo na "Save" dugme
		userMngmnt.populateUsersFields("user3333", "Ivan", "Ivanovski", "ivani1234@gmail.com", "en");

		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management"));

		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());

		// tvrdimo da se u tabeli nalazi user
		assertTrue(userMngmnt.isUserInTable("user3333"), "Can't locate added user user3333");

		// selektujemo broj usera u tabeli nakon dodavanja
		int numOfTableRowsAfter2 = userMngmnt.numberOfUsersInTable();

		// tvrdimo da se broj usera uvecao za 2
		assertEquals(numOfTableRowsAfter2, numOfTableRowsBefore2 + 1);
		
		//EDIT SECOND ADDED USER
		
		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());
		
		userMngmnt.clickEditButtonWithLogInTxt("user3333");
		
		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management/user3333/edit"));
		
		// tvrdimo da je modalni dijalog prisutan na stranici
		assertTrue(userMngmnt.getModalDialog().isDisplayed());
		
		userMngmnt.setEmail("ivaniOVER9000@gmail.com");
		
		userMngmnt.clickSaveUser();
		
		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management"));

		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());
		
		//tvrdimo da je email izmenjen
		assertTrue(userMngmnt.findEmail("ivaniOVER9000@gmail.com"), "Can't locate added email ivaniOVER9000@gmail.com");
		
		//DELETE LAST USER
		
		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());
		
		userMngmnt.clickDeleteButtonWithLogInTxt("user3333");
		
		// instanciramo objekat klase ModalDeletePage
		modalDeletePage = new ModalDeletePage(driver);
			
		assertTrue(modalDeletePage.getModal().isDisplayed());

		// klik na delete dugme
		modalDeletePage.confirmDelete();

		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management"));

		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());

		// tvrdimo da je user obrisan
		assertFalse(userMngmnt.isUserInTable("user3333"));
		//assertFalse(studentsPage.getStudentRowByIndex("RA2").isDisplayed());
		
	}


	/**
	 * This method will be executed at the end of the test.
	 */
	@AfterSuite
	public void quitDriver() {

		// Close browser window
		driver.quit();
	}
}