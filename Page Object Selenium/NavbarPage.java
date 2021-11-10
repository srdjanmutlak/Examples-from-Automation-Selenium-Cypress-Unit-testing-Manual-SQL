package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class NavbarPage {

	private WebDriver driver;

	public NavbarPage(WebDriver driver) {
		super();
		this.driver = driver;
	}

	public void clickAccountLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.id("account-menu")));
		el.click();
	}
	
	public void clickAdministrationLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.id("admin-menu")));
		el.click();
	}
	
	public void clickUserMngmntLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@ui-sref='user-management']")));
		el.click();
	}

	public void clickSignInLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@ui-sref='login']")));
		el.click();
	}
	
	public void clickSignOutLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.id("logout")));
		el.click();
	}

	public void clickEntitiesLink() {
		WebElement el = new WebDriverWait(driver, 10).until(
				ExpectedConditions.elementToBeClickable(By.cssSelector("#navbar-collapse > ul > li:nth-child(2) > a")));
		el.click();
	}
	
	public WebElement getLanguagesLink() {
		return new WebDriverWait(driver, 10).until(
				ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#navbar-collapse > ul > li:nth-child(5)")));
	}
	
	public void clickFranceLink() {
		WebElement el = new WebDriverWait(driver, 10).until(
				ExpectedConditions.elementToBeClickable(By.linkText("Français")));
		el.click();
	}

	public void clickTeachersLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@ui-sref='nastavnici']")));
		el.click();
	}

	public void clickStudentsLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@ui-sref='studenti']")));
		el.click();
	}

	public void clickSubjectsLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@ui-sref='predmeti']")));
		el.click();
	}
	
	public void clickIspitniRokoviLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[normalize-space()='IspitniRokovi']")));
		el.click();
	}
	
	public void clickIspitnePrijaveLink() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@ui-sref='ispitnePrijave']")));
		el.click();
	}
	
}
