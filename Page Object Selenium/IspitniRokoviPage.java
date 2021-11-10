package pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import pages.Utils;

public class IspitniRokoviPage {
	private WebDriver driver;

	public IspitniRokoviPage(WebDriver driver) {
		super();
		this.driver = driver;
	}

	public WebElement getModalDialog() {
		return Utils.waitForElementPresence(driver, By.className("modal-dialog"), 10);
	}

	public WebElement getModalTitle() {
		return Utils.waitForElementPresence(driver, By.id("myIspitniRokoviLabel"), 10);
	}
	
	public void clickCreateButton() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[@class='btn btn-primary']")));
		el.click();
	}

	public WebElement getNaziv() {
		return Utils.waitForElementPresence(driver, By.name("naziv"), 10);
	}

	public void setNaziv(String value) {
		WebElement el = this.getNaziv();
		el.clear();
		el.sendKeys(value);
	}

	public WebElement getPocetak() {
		return Utils.waitForElementPresence(driver, By.id("field_pocetak"), 10);
	}

	public void setPocetak(String value) {
		WebElement el = this.getPocetak();
		el.clear();
		el.sendKeys(value);
	}

	public WebElement getKraj() {
		return Utils.waitForElementPresence(driver, By.id("field_kraj"), 10);
	}

	public void setKraj(String value) {
		WebElement el = this.getKraj();
		el.clear();
		el.sendKeys(value);
	}

	public WebElement getCancelBtn() {
		return Utils.waitToBeClickable(driver, By.className("btn-default"), 10);
	}

	public WebElement getSaveBtn() {
		return getModalDialog().findElement(By.className("btn-primary"));
	}

	/**
	 * Helper metoda za kreiranje ispitnog roka
	 * 
	 * @param naziv
	 * @param pocetak
	 * @param kraj
	 */
	public void createIspitniRok(String naziv, String pocetak, String kraj) {
		setNaziv(naziv);
		setPocetak(pocetak);
		setKraj(kraj);
		getSaveBtn().click();
	}
	
	public WebElement getIspitniRokoviTable() {
		return Utils.waitForElementPresence(driver, By.className("jh-table"), 10);
	}

	public int numberOfIsRokoviInTable() {
		return driver.findElements(By.xpath("//table/tbody/tr")).size();
	}

	public WebElement getIspitniRokByName(String index) {
		return Utils.waitForElementPresence(driver, By.xpath("//*[contains(text(),\"" + index + "\")]/../.."), 15);
	}

	public void deleteIspitniRokByName(String index) {
		getIspitniRokByName(index).findElement(By.className("btn-danger")).click();
	}

	public void editIspitniRokByName(String index) {
		getIspitniRokByName(index).findElement(By.className("btn-primary")).click();
	}

	public void viewIspitniRokByName(String index) {
		getIspitniRokByName(index).findElement(By.className("btn-info")).click();
	}
	
	public boolean checkUrl(String url) {
		boolean isSame = new WebDriverWait(driver, 10).until(ExpectedConditions.urlToBe(url));
		return isSame;
	}
	
	public boolean isEntityInTable(String value) {
		return Utils.isPresent(driver, By.linkText(value));
	}

}
