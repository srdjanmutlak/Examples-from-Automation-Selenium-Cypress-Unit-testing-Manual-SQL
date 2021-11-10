package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Modelujemo Login stranicu kao Java Page Object. Potrebno je da pristupamo
 * samo elementima koji su nam potrebni za testiranje.

 *
 */
public class LoginPage {

	private WebDriver driver;

	public LoginPage(WebDriver driver) {
		super();
		this.driver = driver;
	}

	/**
	 * Cekamo da element bude vidljiv i enable-ovan pre nego sto ga pronadjemo id
	 * lokatorom. Siguran nacin.
	 * 
	 * @return
	 */
	public WebElement getUsername() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated(By.id("username")));
		return el;
	}

	/**
	 * Standardan nacin pisanja settera za input text polje
	 * 
	 * @param value
	 */
	public void setUsername(String value) {
		WebElement usernameElement = this.getUsername();
		usernameElement.clear();
		usernameElement.sendKeys(value);
	}

	/**
	 * Drugi nacin za getter nad input poljem jeste da mu pristupite direktno putem
	 * findElement metode, u ovom slucaju ne postoji cekanje, potencijalan problem
	 * 
	 * @return
	 */
	public WebElement getPassword() {
		return driver.findElement(By.id("password"));
	}

	/**
	 * Standardan nacin pisanja settera za input text polje
	 * 
	 * @param value
	 */
	public void setPassword(String value) {
		WebElement passwordElement = this.getPassword();
		passwordElement.clear();
		passwordElement.sendKeys(value);
	}

	/**
	 * Metoda pronalazi "Sign in" dugme na osnovu izgenerisanog xpath selektora i
	 * vrsi klik na njega
	 */
	public void clickSignInButton() {
		driver.findElement(By.xpath("/html/body/div[3]/div[1]/div/div/div[2]/form/button")).click();
	}

	/**
	 * Metoda pronalazi i selektuje tekst koji se pojavi nakon uspesnog logovanja. U
	 * asertaciji poredimo samo text, tako da samo njega preuzimamo i vracamo. U
	 * slucaju da je test metodi potreban ceo element povratna vrednost metode bi
	 * bila WebElement i vratili bismo msgDiv objekat
	 * 
	 * @return
	 */
	public String getWelcomeTxt() {
		WebElement msgDiv = driver.findElement(By.xpath("//div[@translate='main.logged.message']"));
		String msgString = msgDiv.getText();
		return msgString;
	}
	
	public String getNotificationTxt() {
		WebElement msgDiv = driver.findElement(By.xpath("//div[@class='alert alert-danger ng-scope']"));
		String msgString = msgDiv.getText();
		return msgString;
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
}
