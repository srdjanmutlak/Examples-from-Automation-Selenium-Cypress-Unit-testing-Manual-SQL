package pages.termin18;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

public class SubjectsPage {

	private WebDriver driver;

	public SubjectsPage(WebDriver driver) {
		super();
		this.driver = driver;
	}

	/**
	 * Cekamo da dugme "Create a new Predmeti" selektovano xpath selektorom bude
	 * prisutno u DOM stablu pre nego kliknemo na njega
	 */
	public void clickAddSubject() {
		Utils.waitForElementPresence(driver, By.xpath("//button[@ui-sref='predmeti.new']"), 10).click();
	}

	public WebElement getName() {
		return driver.findElement(By.id("field_naziv"));
	}

	public void setName(String value) {
		WebElement nameElement = this.getName();
		nameElement.clear();
		nameElement.sendKeys(value);
	}

	public void selectStudent(String nameLastName) {
		Select studentsDropdown = new Select(driver.findElement(By.name("studenti")));
		studentsDropdown.selectByVisibleText(nameLastName);
	}

	public void selectTeacher(String nameLastName) {
		Select teachersDropdown = new Select(driver.findElement(By.name("nastavnici")));
		teachersDropdown.selectByVisibleText(nameLastName);
	}

	/**
	 * Metoda koja objedinjuje metode za unos svih polja predmeta skracujemo posao -
	 * iz test metode dovoljno je pozvati samo ovu jednu metodu
	 * 
	 * @param name
	 * @param nameOfStudent
	 * @param nameOfTeacher
	 */
	public void populateSubjectFields(String name, String nameOfStudent, String nameOfTeacher) {
		this.setName(name);
		this.selectStudent(nameOfStudent);
		this.selectTeacher(nameOfTeacher);
	}

}
