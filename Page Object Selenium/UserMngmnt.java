package pageFactory.termin18;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import pageFactory.termin18.Utils;

public class UserMngmnt {

	// globalni atribut
	private WebDriver driver;

	// konstruktor sa parametrom
	public UserMngmnt(WebDriver driver) {
		super();
		this.driver = driver;
	}

	/**
	 * Metoda vraca True ukoliko se title stranice poklapa sa prosledjenim
	 * 
	 * @return
	 */
	public boolean presentsOfTitle(String title) {
		boolean isPresent = new WebDriverWait(driver, 10).until(ExpectedConditions.titleIs(title));
		return isPresent;

	}

	/**
	 * Cekamo da tabela selektovan sa className selektorom bude prisutna u DOM
	 * stablu. Wait metode vracaju objekat klase WebElement isto kao sto je to
	 * radila i findElement metoda. Ovo je siguran nacin.
	 * 
	 * @return
	 */
	public WebElement getUsersTable() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.presenceOfElementLocated(By.className("table")));
		return el;
	}

	
	public void clickAddUser() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[@class='btn btn-primary']")));
		el.click();
	}

	/**
	 * Cekamo da se URL stranice poklopi sa prosledjenim. Jedan od nacina na
	 * garantujemo da je stranica promenjena
	 * 
	 * @param url
	 * @return
	 */
	public boolean checkUrl(String url) {
		boolean isSame = new WebDriverWait(driver, 10).until(ExpectedConditions.urlToBe(url));
		return isSame;
	}

	/**
	 * Cekamo da modalni dijalog za dodavanje usera, selektovan css selektorom,
	 * postane prisutan u DOM stablu
	 * 
	 * @return
	 */
	public WebElement getModalDialog() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".modal-content")));
		return el;
	}

	public WebElement getLoginInSpace() {
		return driver.findElement(By.xpath("//input[@name='login']"));
	}

	public void setLogInSpace(String value) {
		WebElement logInSpaceElement = this.getLoginInSpace();
		logInSpaceElement.clear();
		logInSpaceElement.sendKeys(value);
	}

	public WebElement getFirstName() {
		return driver.findElement(By.xpath("//input[@name='firstName']"));
	}

	public void setFirstName(String value) {
		WebElement firstNameElement = this.getFirstName();
		firstNameElement.clear();
		firstNameElement.sendKeys(value);
	}

	public WebElement getLastName() {
		return driver.findElement(By.xpath("//input[@name='lastName']"));
	}

	public void setLastName(String value) {
		WebElement lastNameElement = this.getLastName();
		lastNameElement.clear();
		lastNameElement.sendKeys(value);
	}

	public WebElement getEmail() {
		return driver.findElement(By.xpath("//input[@name='email']"));
	}

	public void setEmail(String value) {
		WebElement emailElement = this.getEmail();
		emailElement.clear();
		emailElement.sendKeys(value);
	}
	
	public Select getLng() {
		return new Select(Utils.waitForElementPresence(driver, By.xpath("//select[@name='langKey']"), 10));
	}

	public void setLng(String value) {
		this.getLng().selectByVisibleText(value);
	}

	
	public void  getUserTitle() {
		driver.findElement(By.xpath("//option[@value='string:ROLE_USER']")).click();
	}

	/**
	 * Klik na "Save" dugme selektovano xpath selektorom
	 */
	public void clickSaveUser() {
		driver.findElement(By.xpath("//span[@translate='entity.action.save']")).click();
	}

	/**
	 * Proverava da li user sa prosledjenim indexom postoji u tabeli. FindElement
	 * metoda baca Exception ukoliko ne pronadje element sa navedenim selektorom.
	 * Ukoliko metoda baci Exception, za nas to znaci da user ne postoji i u tom
	 * slucaju zelimo da vratimo false. Iz tog razloga, u try blok postavljamo poziv
	 * metode za koji znamo da moze da "pukne". A u catch blok komande koje
	 * izvrsavamo ukoliko do Exceptiona dodje. Ukoliko je sve u redu, catch blok se
	 * nece izvrsiti i try blok ce vratiti true.
	 * 
	 * @param logINSpace
	 * @return
	 */
	public boolean isUserInTable(String logINSpace) {
		try {
			return driver.findElement(By.xpath("//td[normalize-space()='"+logINSpace+"']")).isDisplayed();
		} catch (Exception e) {
			return false;
		}

	}
	
	public boolean findEmail(String email) {
		try {
			return driver.findElement(By.xpath("//td[normalize-space()='"+email+"']")).isDisplayed();
		} catch (Exception e) {
			return false;
		}

	}

	/**
	 * Metoda koja objedinjuje metode za unos svih polja usera skracujemo posao -
	 * iz test metode dovoljno je pozvati samo ovu jednu metodu
	 * 
	 
	 */
	public void populateUsersFields(String logINSpace, String firstName, String lastName, String email, String lng) {
		this.setLogInSpace(logINSpace);
		this.setFirstName(firstName);
		this.setLastName(lastName);
		this.setEmail(email);
		this.setLng(lng);
		this.getUserTitle();
		this.clickSaveUser();
	}

	/**
	 * Metoda vraca broj usera u tabeli, selektor proverava broj tr elemenata.
	 * FindElements ce vratiti listu, nad kojom pozivamo.size() metodu, vodimo
	 * racuna da povratna vrednost metode bude int
	 * 
	 * @return
	 */
	public int numberOfUsersInTable() {
		return driver.findElements(By.xpath("//table/tbody/tr")).size();
	}

	/**
	 * Metoda ce da izvrsi klik na "Edit" dugme onog usera ciji se logInTxt poklopi
	 * sa onim koji je prosledjen kao parametar. Ovde imamo primer da smo parametar
	 * metode prosledili lokatoru tako da metoda moze da izvrsi klik na edit dugme
	 * bilo kog usera ciji logInTxt prosledimo kao parametar
	 * 
	 * @param logInTxt
	 */
	public void clickEditButtonWithLogInTxt(String logInTxt) {
		WebElement el = driver.findElement(By.xpath("//tbody/tr //button[@href='#/user-management/"+logInTxt+"/edit']"));
		el.click();
	}

	/**
	 * Metoda ce da izvrsi klik na "Delete" dugme onog usera ciji se logInTxt
	 * poklopi sa onim koji je prosledjen kao parametar. Ovde imamo primer da smo
	 * parametar metode prosledili lokatoru tako da metoda moze da izvrsi klik na
	 * delete dugme bilo kog usera ciji logInTxt prosledimo kao parametar
	 * 
	 * @param logInTxt
	 */
	public void clickDeleteButtonWithLogInTxt(String logInTxt) {
		WebElement el = driver.findElement(By.xpath("//tbody/tr //button[@href='#/user-management/"+logInTxt+"/delete']"));
		el.click();
	}

	/**
	 * 
	 * Selekcija reda na osnovu broja logInTxt a. 
	 * 
	 */
	public WebElement getUsersRowByLogInTxt(String logInTxt) {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated((By.xpath("//tbody/tr //button[@href='#/user-management/"+logInTxt+"/edit']"))));
		return el;
	}
}