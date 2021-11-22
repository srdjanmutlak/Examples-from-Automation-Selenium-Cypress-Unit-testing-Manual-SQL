package parcijalni;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TeachersPage {

	private WebDriver driver;

	public TeachersPage(WebDriver driver) {
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
	public WebElement getTeachersTable() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.presenceOfElementLocated(By.className("jh-table")));
		return el;
	}

	/**
	 * Cekamo da dugme "Create a new Nastavnici" selektovano xpath selektorom bude
	 * prisutno u DOM stablu pre nego kliknemo na njega
	 */
	public void clickAddTeacher() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[@ui-sref='nastavnici.new']")));
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
	 * Cekamo da modalni dijalog za dodavanje nastavnika, selektovan css selektorom,
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
		return driver.findElement(By.id("field_ime"));
	}

	public void setName(String value) {
		WebElement nameElement = this.getName();
		nameElement.clear();
		nameElement.sendKeys(value);
	}

	public WebElement getLastName() {
		return driver.findElement(By.id("field_prezime"));
	}

	public void setLastName(String value) {
		WebElement lastNameElement = this.getLastName();
		lastNameElement.clear();
		lastNameElement.sendKeys(value);
	}

	public WebElement getTitle() {
		return driver.findElement(By.id("field_zvanje"));
	}

	public void setTitle(String value) {
		WebElement titleElement = this.getTitle();
		titleElement.clear();
		titleElement.sendKeys(value);
	}

	/**
	 * Klik na "Save" dugme selektovano xpath selektorom
	 */
	public void clickSaveTeacher() {
		driver.findElement(By.xpath("//span[@translate='entity.action.save']")).click();
	}

	/**
	 * Proverava da li nastavnik sa prosledjenim imenom postoji u tabeli.
	 * FindElement metoda baca Exception ukoliko ne pronadje element sa navedenim
	 * selektorom. Ukoliko metoda baci Exception, za nas to znaci da nastavnik ne
	 * postoji i u tom slucaju zelimo da vratimo false. Iz tog razloga, u try blok
	 * postavljamo poziv metode za koji znamo da moze da "pukne". A u catch blok
	 * komande koje izvrsavamo ukoliko do Exceptiona dodje. Ukoliko je sve u redu,
	 * catch blok se nece izvrsiti i try blok ce vratiti true.
	 * 
	 * @param teacherName
	 * @return
	 */
	public boolean isTeacherInTable(String teacherName) {
		try {
			return driver.findElement(By.linkText(teacherName)).isDisplayed();
		} catch (Exception e) {
			return false;
		}

	}

	/**
	 * Metoda koja objedinjuje metode za unos svih polja nastavnika skracujemo posao
	 * - iz test metode dovoljno je pozvati samo ovu jednu metodu
	 * 
	 * @param name
	 * @param lastName
	 * @param title
	 */
	public void populateTeachersFields(String name, String lastName, String title) {
		this.setName(name);
		this.setLastName(lastName);
		this.setTitle(title);
		this.clickSaveTeacher();
	}

	/**
	 * Metoda vraca broj nastavnika u tabeli, selektor proverava broj tr elemenata.
	 * FindElements ce vratiti listu, nad kojom pozivamo.size() metodu, vodimo
	 * racuna da povratna vrednost metode bude int
	 * 
	 * @return
	 */
	public int numberOfTeachersInTable() {
		return driver.findElements(By.xpath("//table/tbody/tr")).size();
	}
	
	/**
	 * 
	 * Selekcija reda na osnovu naziva nastavnika. Prvo se selektuje <a> tag koji ima
	 * tekst kao naziv, a zatim se pokupi njegov roditelj
	 * <td>(/../), a zatim roditelj od
	 * <td>sto predstavlja
	 * <tr>
	 * (/../)
	 * 
	 * @param name - ime nastavnika
	 * 
	 * @return student row
	 * 
	 */
	public WebElement getStudentRowByIndex(String name) {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated((By.xpath("//*[contains(text(),\"" + name + "\")]/../.."))));
		return el;
	}
}
