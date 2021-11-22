package parcijalni;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SubjectsPage {

	private WebDriver driver;

	public SubjectsPage(WebDriver driver) {
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
	public WebElement getSubjectsTable() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.presenceOfElementLocated(By.className("jh-table")));
		return el;
	}

	/**
	 * Cekamo da dugme "Create a new Predmeti" selektovano xpath selektorom bude
	 * prisutno u DOM stablu pre nego kliknemo na njega
	 */
	public void clickAddSubject() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[@ui-sref='predmeti.new']")));
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
	 * Cekamo da modalni dijalog za dodavanje predmeta, selektovan css selektorom,
	 * postane prisutan u DOM stablu
	 * 
	 * @return
	 */
	public WebElement getModalDialog() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".modal-content")));
		return el;
	}

	public WebElement getName() {
		return driver.findElement(By.id("field_naziv"));
	}

	public void setName(String value) {
		WebElement nameElement = this.getName();
		nameElement.clear();
		nameElement.sendKeys(value);
	}

	public void selectMultipleStudents(String student1, String student2, String student3) {
		
		Select studentsDropdown = new Select(driver.findElement(By.name("studenti")));
		studentsDropdown.selectByVisibleText(student1);
		studentsDropdown.selectByVisibleText(student2);
		studentsDropdown.selectByVisibleText(student3);

	}

	public void selectTeacher(String nameLastName) {
		Select teachersDropdown = new Select(driver.findElement(By.name("nastavnici")));
		teachersDropdown.selectByVisibleText(nameLastName);
	}

	/**
	 * Klik na "Save" dugme selektovano xpath selektorom
	 */
	public void clickSaveSubject() {
		driver.findElement(By.xpath("//span[@translate='entity.action.save']")).click();
	}

	/**
	 * Proverava da li predmet sa prosledjenim nazivom postoji u tabeli. FindElement
	 * metoda baca Exception ukoliko ne pronadje element sa navedenim selektorom.
	 * Ukoliko metoda baci Exception, za nas to znaci da predmet ne postoji i u tom
	 * slucaju zelimo da vratimo false. Iz tog razloga, u try blok postavljamo poziv
	 * metode za koji znamo da moze da "pukne". A u catch blok komande koje
	 * izvrsavamo ukoliko do Exceptiona dodje. Ukoliko je sve u redu, catch blok se
	 * nece izvrsiti i try blok ce vratiti true.
	 * 
	 * @param studentIndex
	 * @return
	 */
	public boolean isSubjectInTable(String name) {
		try {
			return driver.findElement(By.linkText(name)).isDisplayed();
		} catch (Exception e) {
			return false;
		}

	}

	/**
	 * Metoda koja objedinjuje metode za unos svih polja predmeta skracujemo posao -
	 * iz test metode dovoljno je pozvati samo ovu jednu metodu
	 * 
	 * @param name
	 * @param nameOfStudent
	 * @param nameOfTeacher
	 */
	public void populateSubjectFields(String name, String nameOfTeacher) {
		this.setName(name);
		this.selectMultipleStudents("ImeStudenta1 PrezimeStudenta1", "ImeStudenta2 PrezimeStudenta2", "ImeStudenta3 PrezimeStudenta3");
		this.selectTeacher(nameOfTeacher);
		this.clickSaveSubject();
	}

	/**
	 * Metoda vraca broj predmeta u tabeli, selektor proverava broj tr elemenata.
	 * FindElements ce vratiti listu, nad kojom pozivamo.size() metodu, vodimo
	 * racuna da povratna vrednost metode bude int
	 * 
	 * @return
	 */
	public int numberOfSubjectsInTable() {
		return driver.findElements(By.xpath("//table/tbody/tr")).size();
	}
}
