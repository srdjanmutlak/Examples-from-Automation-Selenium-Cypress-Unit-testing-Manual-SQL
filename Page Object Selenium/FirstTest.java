package tests;

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

import pages.IspitniRokoviPage;
import pages.LoginPage;
import pages.ModalDeletePage;
import pages.NavbarPage;
import pages.RegisterPage;
import pages.UserMngmnt;

public class FirstTest {

	private WebDriver driver;
	private RegisterPage registerPage;
	private NavbarPage navbarPage;
	private IspitniRokoviPage ispitniRokoviPage;
	private LoginPage loginPage;
	private ModalDeletePage modalDeletePage;

	private UserMngmnt userMngmnt;
;

	@BeforeSuite
	public void initalize() {

		// Create a Selenium WebDriver instance
		System.setProperty("webdriver.chrome.driver", "chromedriver");
		driver = new ChromeDriver();

		navbarPage = new NavbarPage(driver);
		registerPage = new RegisterPage(driver);

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
	public void register() {
		registerPage.clickAccountLink();
		registerPage.clickRegisterLink();
		registerPage.populateRegisterFields("srdjan", "selenium@tester.com", "tester", "tester");
		

	}

	@Test(dependsOnMethods = { "register" })
	public void tryToLogIn() {
		navbarPage.clickAccountLink();
		navbarPage.clickSignInLink();

		// instanciramo objekat LoginPage
		loginPage = new LoginPage(driver);

		// trvdimo da je tacno da je title stranice "Sign in"
		assertTrue(loginPage.presentsOfTitle("Sign in"));

		loginPage.setUsername("srdjan");
		loginPage.setPassword("tester");
		loginPage.clickSignInButton();
		
		String msgString = loginPage.getNotificationTxt();
		assertEquals(msgString, "Failed to sign in! Please check your credentials and try again.");

		
		
		
	}
	
	@Test(dependsOnMethods = { "tryToLogIn" })
	public void loginAdmin() {
		navbarPage.clickAccountLink();
		navbarPage.clickSignInLink();

		// instanciramo objekat LoginPage
		loginPage = new LoginPage(driver);

		// trvdimo da je tacno da je title stranice "Sign in"
		assertTrue(loginPage.presentsOfTitle("Sign in"));

		loginPage.setUsername("admin");
		loginPage.setPassword("admin");
		loginPage.clickSignInButton();
		

		String msgString = loginPage.getWelcomeTxt();
		assertEquals(msgString, "You are logged in as user \"admin\".");

		
		
		
	}
	
	@Test(dependsOnMethods = { "loginAdmin" })
	public void activateUser() {
		navbarPage.clickAdministrationLink();
		navbarPage.clickUserMngmntLink();

		userMngmnt = new UserMngmnt(driver);
		
		assertTrue(userMngmnt.getUsersTable().isDisplayed());
		
		userMngmnt.clickEditButtonWithLogInTxt("srdjan");
		
		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management/srdjan/edit"));
		
		// tvrdimo da je modalni dijalog prisutan na stranici
		assertTrue(userMngmnt.getModalDialog().isDisplayed());
		
		userMngmnt.clickActivateUser();
		
		userMngmnt.clickSaveUser();
		
		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management"));

		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());
	
	}
	
	@Test(dependsOnMethods = { "activateUser" })
	public void logOutLogInNewUser() {
		navbarPage.clickAccountLink();
		navbarPage.clickSignOutLink();
		
		navbarPage.clickAccountLink();
		navbarPage.clickSignInLink();
		
		loginPage = new LoginPage(driver);

		// trvdimo da je tacno da je title stranice "Sign in"
		assertTrue(loginPage.presentsOfTitle("Sign in"));

		loginPage.setUsername("srdjan");
		loginPage.setPassword("tester");
		loginPage.clickSignInButton();
		

		String msgString = loginPage.getWelcomeTxt();
		assertEquals(msgString, "You are logged in as user \"srdjan\".");

	}
	
	@Test(dependsOnMethods = { "logOutLogInNewUser" })
	public void addNewIspitniRok() {
		
		navbarPage.clickEntitiesLink();
		navbarPage.clickIspitniRokoviLink();
		
		
		ispitniRokoviPage = new IspitniRokoviPage(driver);
		
		assertTrue(ispitniRokoviPage.getIspitniRokoviTable().isDisplayed());

		// selektujemo broj usera u tabeli pre dodavanja
		int numOfTableRowsBefore = ispitniRokoviPage.numberOfIsRokoviInTable();


		ispitniRokoviPage.clickCreateButton();

		assertTrue(ispitniRokoviPage.checkUrl("http://localhost:8080/#/ispitniRokovis/new"));

		assertTrue(ispitniRokoviPage.getModalDialog().isDisplayed());
		
		ispitniRokoviPage.createIspitniRok("parcijalni modul 2", "2021-11-03", "2021-11-03");
		
		assertTrue(ispitniRokoviPage.checkUrl("http://localhost:8080/#/ispitniRokovis"));

		assertTrue(ispitniRokoviPage.getIspitniRokoviTable().isDisplayed());

		int numOfTableRowsAfter = ispitniRokoviPage.numberOfIsRokoviInTable();

//		assertEquals(numOfTableRowsAfter, numOfTableRowsBefore + 1);
//		
//		assertTrue(ispitniRokoviPage.isEntityInTable("parcijalni modul 2"), "Can't locate added entity Aprilski");

	}
	
	@Test(dependsOnMethods = { "addNewIspitniRok" })
	public void LogoutAsUserLogInAsAdmin() {
		
		navbarPage.clickAccountLink();
		navbarPage.clickSignOutLink();
		
		navbarPage.clickAccountLink();
		navbarPage.clickSignInLink();
		
		loginPage = new LoginPage(driver);

		// trvdimo da je tacno da je title stranice "Sign in"
		assertTrue(loginPage.presentsOfTitle("Sign in"));

		loginPage.setUsername("admin");
		loginPage.setPassword("admin");
		loginPage.clickSignInButton();
		

		String msgString = loginPage.getWelcomeTxt();
		assertEquals(msgString, "You are logged in as user \"admin\".");
		

	}
	
	@Test(dependsOnMethods = { "LogoutAsUserLogInAsAdmin" })
	public void DeleteUser() {
		
		navbarPage.clickAdministrationLink();
		navbarPage.clickUserMngmntLink();

		userMngmnt = new UserMngmnt(driver);
		
		assertTrue(userMngmnt.getUsersTable().isDisplayed());
		
		int numOfTableRowsBefore = userMngmnt.numberOfUsersInTable();
		
		userMngmnt.clickDeleteButtonWithLogInTxt("srdjan");
		
		modalDeletePage = new ModalDeletePage(driver);
		
		assertTrue(modalDeletePage.getModal().isDisplayed());

		// klik na delete dugme
		modalDeletePage.confirmDelete();

		// tvrdimo da je URL promenjen
		assertTrue(userMngmnt.checkUrl("http://localhost:8080/#/user-management"));

		// tvrdimo da je table sa userima vidljiva
		assertTrue(userMngmnt.getUsersTable().isDisplayed());

		// tvrdimo da je user obrisan
		assertFalse(userMngmnt.isUserInTable("srdjan"));
		
		int numOfTableRowsAfter = userMngmnt.numberOfUsersInTable();
		
		assertEquals(numOfTableRowsAfter, numOfTableRowsBefore - 1);
		

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
