package parcijalni;

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
	private StudentsPage studentsPage;
	private TeachersPage teachersPage;
	private SubjectsPage subjectsPage;
	private ModalDeletePage modalDeletePage;

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

		loginPage.setUsername("user");
		loginPage.setPassword("user");
		loginPage.clickSignInButton();

		// tvrdimo da se text koji dobijemo nakon uspesnog logovanja poklapa sa tekstom
		// "You are logged in as user \"user\"."
		String msgString = loginPage.getWelcomeTxt();
		assertEquals(msgString, "You are logged in as user \"user\".");
	}

	/**
	 * Metoda ce se izvrsiti samo ako se login test metoda izvrsila uspesno
	 */
	@Test(dependsOnMethods = { "login" })
	public void testAddTeacher() {

		navbarPage.clickEntitiesLink();
		navbarPage.clickTeachersLink();

		// instanciramo objekat klase TeachersPage
		teachersPage = new TeachersPage(driver);

		// tvrdimo da je table sa profesorima vidljiva
		assertTrue(teachersPage.getTeachersTable().isDisplayed());

		// selektujemo broj profesora u tabeli pre dodavanja
		int numOfTableRowsBefore = teachersPage.numberOfTeachersInTable();

		teachersPage.clickAddTeacher();

		// tvrdimo da je URL promenjen
		assertTrue(teachersPage.checkUrl("http://localhost:8080/#/nastavnicis/new"));

		// tvrdimo da je modalni dijalog prisutan na stranici
		assertTrue(teachersPage.getModalDialog().isDisplayed());

		// popunjavamo sva input polja i klikcemo na "Save" dugme
		teachersPage.populateTeachersFields("Milan", "Milankovic", "Profesor strucnog testiranja");

		// tvrdimo da je URL promenjen
		assertTrue(teachersPage.checkUrl("http://localhost:8080/#/nastavnicis"));

		// tvrdimo da je table sa nastavnicima vidljiva
		assertTrue(teachersPage.getTeachersTable().isDisplayed());

		// tvrdimo da se u tabeli nalazi nastavnik
		assertTrue(teachersPage.isTeacherInTable("Milan"), "Can't locate added teacher Milan");

		// selektujemo broj profesora u tabeli nakon dodavanja
		int numOfTableRowsAfter = teachersPage.numberOfTeachersInTable();

		// tvrdimo da se broj profesora uvecao za 2
		assertEquals(numOfTableRowsAfter, numOfTableRowsBefore + 1);
	}

	/**
	 * Metoda ce se izvrsiti samo ako se testAddTeacher test metoda izvrsila uspesno
	 */
	@Test(dependsOnMethods = { "testAddTeacher" })
	public void testChangeLanguage() {

		String textInLanguageLinkBefore = navbarPage.getLanguagesLink().getText();

		navbarPage.getLanguagesLink().click();
//		navbarPage.clickFranceLink();

		String textInLanguageLinkAfter = navbarPage.getLanguagesLink().getText();

		assertNotEquals(textInLanguageLinkBefore, textInLanguageLinkAfter);

	}

	/**
	 * Metoda ce se izvrsiti samo ako se login test metoda izvrsila uspesno
	 */
//	@Test(dependsOnMethods = { "login" })
//	public void testAddStudent() {
//
//		navbarPage.clickEntitiesLink();
//		navbarPage.clickStudentsLink();
//
//		// instanciramo objekat klase StudentsPage
//		studentsPage = new StudentsPage(driver);
//
//		// trvdimo da je tacno da je title stranice "Studentis"
//		assertTrue(loginPage.presentsOfTitle("Studentis"));
//
//		// tvrdimo da je table sa studentima vidljiva
//		assertTrue(studentsPage.getStudentsTable().isDisplayed());
//
//		// selektujemo broj studenata u tabeli pre dodavanja studenata
//		int numOfTableRowsBefore = studentsPage.numberOfStudentsInTable();
//
//		// ********** DODAJEMO PRVOG STUDENTA *****************
//		studentsPage.clickAddStudent();
//
//		// tvrdimo da je URL promenjen
//		assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis/new"));
//
//		// tvrdimo da je modalni dijalog prisutan na stranici
//		assertTrue(studentsPage.getModalDialog().isDisplayed());
//
//		// popunjavamo sva input polja i klikcemo na "Save" dugme
//		studentsPage.populateStudentsFields("RA1", "ImeStudenta1", "PrezimeStudenta1", "");
//
//		// tvrdimo da je URL promenjen
//		assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis"));
//
//		// tvrdimo da je table sa studentima vidljiva
//		assertTrue(studentsPage.getStudentsTable().isDisplayed());
//
//		WebElement studentRow = studentsPage.getStudentRowByIndex("RA1");
//		String rowData = studentRow.getText();
//		assertTrue(rowData.contains("RA1 ImeStudenta1 PrezimeStudenta1"));
//
//		// ********** DODAJEMO DRUGOG STUDENTA *****************
//		studentsPage.clickAddStudent();
//
//		// tvrdimo da je URL promenjen
//		assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis/new"));
//
//		// tvrdimo da je modalni dijalog prisutan na stranici
//		assertTrue(studentsPage.getModalDialog().isDisplayed());
//
//		// popunjavamo sva input polja i klikcemo na "Save" dugme
//		studentsPage.populateStudentsFields("RA2", "ImeStudenta2", "PrezimeStudenta2", "");
//
//		// tvrdimo da je URL promenjen
//		assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis"));
//
//		// tvrdimo da je table sa studentima vidljiva
//		assertTrue(studentsPage.getStudentsTable().isDisplayed());
//
//		studentRow = studentsPage.getStudentRowByIndex("RA2");
//		rowData = studentRow.getText();
//		assertTrue(rowData.contains("RA2 ImeStudenta2 PrezimeStudenta2"));
//
//		// ********** DODAJEMO TRECEG STUDENTA *****************
//		studentsPage.clickAddStudent();
//
//		// tvrdimo da je URL promenjen
//		assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis/new"));
//
//		// tvrdimo da je modalni dijalog prisutan na stranici
//		assertTrue(studentsPage.getModalDialog().isDisplayed());
//
//		// popunjavamo sva input polja i klikcemo na "Save" dugme
//		studentsPage.populateStudentsFields("RA3", "ImeStudenta3", "PrezimeStudenta3", "");
//
//		// tvrdimo da je URL promenjen
//		assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis"));
//
//		// tvrdimo da je table sa studentima vidljiva
//		assertTrue(studentsPage.getStudentsTable().isDisplayed());
//
//		studentRow = studentsPage.getStudentRowByIndex("RA3");
//		rowData = studentRow.getText();
//		assertTrue(rowData.contains("RA3 ImeStudenta3 PrezimeStudenta3"));
//
//		// selektujemo broj studenata u tabeli nakon dodavanja studenata
//		int numOfTableRowsAfter = studentsPage.numberOfStudentsInTable();
//
//		// tvrdimo da se broj studenata uvecao za 2
//		assertEquals(numOfTableRowsAfter, numOfTableRowsBefore + 3);
//	}

	/**
	 * Drugi zadatak, optimizovano
	 */
	@Test(dependsOnMethods = { "testChangeLanguage" })
	public void testAddStudent() {

		navbarPage.clickEntitiesLink();
		navbarPage.clickStudentsLink();

		// instanciramo objekat klase StudentsPage
		studentsPage = new StudentsPage(driver);

		// trvdimo da je tacno da je title stranice "Studentis"
		assertTrue(loginPage.presentsOfTitle("Studentis"));

		// tvrdimo da je table sa studentima vidljiva
		assertTrue(studentsPage.getStudentsTable().isDisplayed());

		// selektujemo broj studenata u tabeli pre dodavanja studenata
		int numOfTableRowsBefore = studentsPage.numberOfStudentsInTable();

		// i se krece od 1 i dobija vrednosti 1, 2, 3
		for (int i = 1; i < 4; i++) {
			studentsPage.clickAddStudent();

			// tvrdimo da je URL promenjen
			assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis/new"));

			// tvrdimo da je modalni dijalog prisutan na stranici
			assertTrue(studentsPage.getModalDialog().isDisplayed());

			// popunjavamo sva input polja i klikcemo na "Save" dugme
			studentsPage.populateStudentsFields("RA" + i, "ImeStudenta" + i, "PrezimeStudenta" + i, "");

			// tvrdimo da je URL promenjen
			assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis"));

			// tvrdimo da je table sa studentima vidljiva
			assertTrue(studentsPage.getStudentsTable().isDisplayed());

			WebElement studentRow = studentsPage.getStudentRowByIndex("RA" + i);
			String rowData = studentRow.getText();
			assertTrue(rowData.contains("RA" + i + " ImeStudenta" + i + " PrezimeStudenta" + i));
		}

		// selektujemo broj studenata u tabeli nakon dodavanja studenata
		int numOfTableRowsAfter = studentsPage.numberOfStudentsInTable();

		// tvrdimo da se broj studenata uvecao za 2
		assertEquals(numOfTableRowsAfter, numOfTableRowsBefore + 3);
	}

	/**
	 * Metoda ce se izvrsiti samo ako se testAddStudent i testAddTeacher test metode
	 * izvrsile uspesno
	 */
	@Test(dependsOnMethods = { "testAddStudent" })
	public void createSubject() throws InterruptedException {

		navbarPage.clickEntitiesLink();
		navbarPage.clickSubjectsLink();

		// instanciramo objekat klase SubjectsPage
		subjectsPage = new SubjectsPage(driver);

		// trvdimo da je tacno da je title stranice "Predmetis"
		assertTrue(subjectsPage.presentsOfTitle("Predmetis"));

		// tvrdimo da je table sa prdmetima vidljiva
		assertTrue(subjectsPage.getSubjectsTable().isDisplayed());

		subjectsPage.clickAddSubject();

		// tvrdimo da je URL promenjen
		assertTrue(subjectsPage.checkUrl("http://localhost:8080/#/predmetis/new"));

		// tvrdimo da je modalni dijalog prisutan na stranici
		assertTrue(subjectsPage.getModalDialog().isDisplayed());

		// popunjavamo sva input polja i klikcemo na "Save" dugme
		subjectsPage.populateSubjectFields("Fizikus", "Milan Milankovic");

		assertTrue(subjectsPage.isSubjectInTable("Fizikus"));
	}

	/**
	 * Metoda ce se izvrsiti samo ako se createSubject test izvrsi uspesno
	 */
	@Test(dependsOnMethods = { "createSubject" })
	public void testDeleteStudent() {

		navbarPage.clickEntitiesLink();
		navbarPage.clickStudentsLink();

		// trvdimo da je tacno da je title stranice "Studentis"
		assertTrue(loginPage.presentsOfTitle("Studentis"));

		// tvrdimo da je table sa studentima vidljiva
		assertTrue(studentsPage.getStudentsTable().isDisplayed());

		studentsPage.clickDeleteButtonWithIndex("RA2");

		// instanciramo objekat klase ModalDeletePage
		modalDeletePage = new ModalDeletePage(driver);
			
		assertTrue(modalDeletePage.getModal().isDisplayed());

		// klik na delete dugme
		modalDeletePage.confirmDelete();

		// tvrdimo da je URL promenjen
		assertTrue(studentsPage.checkUrl("http://localhost:8080/#/studentis"));

		// tvrdimo da je table sa studentima vidljiva
		assertTrue(studentsPage.getStudentsTable().isDisplayed());

		// tvrdimo da je student obrisan, ovo ce pasti jer ne mozemo obrisati studenta
		// koji se nalazi u nekom entitetu
		assertFalse(studentsPage.getStudentRowByIndex("RA2").isDisplayed());

	}
	
	/**
	 * Test koji ce se poslednji izvrsiti
	 */
	@Test(dependsOnMethods = { "testDeleteStudent" })
	public void logOut() {
		navbarPage.clickAccountLink();
		navbarPage.clickSignOutLink();
		
		assertEquals(driver.getCurrentUrl(), "http://localhost:8080/#/");
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