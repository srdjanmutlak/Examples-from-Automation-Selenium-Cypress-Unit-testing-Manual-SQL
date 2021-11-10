package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**

 */
public class RegisterPage {

	private WebDriver driver;

	public RegisterPage(WebDriver driver) {
		super();
		this.driver = driver;
	}

	/**
	urn
	 */
	
	public void clickAccountLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.id("account-menu")));
		el.click();
	}
	
	public void clickRegisterLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@ui-sref='register']")));
		el.click();
	}
	
	public WebElement getEmail() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
		return el;
	}

	/**
	 * Standardan nacin pisanja settera za input text polje
	 * 
	 * @param value
	 */
	public void setEmail(String value) {
		WebElement emailElement = this.getEmail();
		emailElement.clear();
		emailElement.sendKeys(value);
	}
	
	public WebElement getUsername() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated(By.id("login")));
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
	public WebElement getNewPassword() {
		return driver.findElement(By.id("password"));
	}

	/**
	 * Standardan nacin pisanja settera za input text polje
	 * 
	 * @param value
	 */
	public void setNewPassword(String value) {
		WebElement newPasswordElement = this.getNewPassword();
		newPasswordElement.clear();
		newPasswordElement.sendKeys(value);
	}
	
	public WebElement getConfirmPassword() {
		return driver.findElement(By.id("confirmPassword"));
	}

	/**
	 * Standardan nacin pisanja settera za input text polje
	 * 
	 * @param value
	 */
	public void setConfirmPassword(String value) {
		WebElement ConfirmPasswordElement = this.getConfirmPassword();
		ConfirmPasswordElement.clear();
		ConfirmPasswordElement.sendKeys(value);
	}

	/**
	 * Metoda pronalazi "Sign in" dugme na osnovu izgenerisanog xpath selektora i
	 * vrsi klik na njega
	 */
	public void clickRegisterButton() {
		driver.findElement(By.xpath("//button[normalize-space()='Register']")).click();
	}
	
	public void populateRegisterFields(String username, String email, String newPassword, String confirmPassword) {
		this.setUsername(username);
		this.setEmail(email);
		this.setNewPassword(newPassword);
		this.setConfirmPassword(confirmPassword);
		this.clickRegisterButton();
	}
	
	
}