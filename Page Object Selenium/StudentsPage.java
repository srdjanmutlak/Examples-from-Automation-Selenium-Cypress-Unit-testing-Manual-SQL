package parcijalni;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class StudentsPage {

	// globalni atribut
	private WebDriver driver;

	// konstruktor sa parametrom
	public StudentsPage(WebDriver driver) {
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
	public WebElement getStudentsTable() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.presenceOfElementLocated(By.className("jh-table")));
		return el;
	}

	/**
	 * Cekamo da dugme "Create a new Studenti" selektovano xpath selektorom bude
	 * prisutno u DOM stablu pre nego kliknemo na njega
	 */
	public void clickAddStudent() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[@ui-sref='studenti.new']")));
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
	 * Cekamo da modalni dijalog za dodavanje studenata, selektovan css selektorom,
	 * postane prisutan u DOM stablu
	 * 
	 * @return
	 */
	public WebElement getModalDialog() {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".modal-content")));
		return el;
	}

	public WebElement getIndex() {
		return driver.findElement(By.id("field_indeks"));
	}

	public void setIndex(String value) {
		WebElement indexElement = this.getIndex();
		indexElement.clear();
		indexElement.sendKeys(value);
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

	public WebElement getCity() {
		return driver.findElement(By.id("field_grad"));
	}

	public void setCity(String value) {
		WebElement cityElement = this.getCity();
		cityElement.clear();
		cityElement.sendKeys(value);
	}

	/**
	 * Klik na "Save" dugme selektovano xpath selektorom
	 */
	public void clickSaveStudent() {
		driver.findElement(By.xpath("//span[@translate='entity.action.save']")).click();
	}

	/**
	 * Proverava da li student sa prosledjenim indexom postoji u tabeli. FindElement
	 * metoda baca Exception ukoliko ne pronadje element sa navedenim selektorom.
	 * Ukoliko metoda baci Exception, za nas to znaci da student ne postoji i u tom
	 * slucaju zelimo da vratimo false. Iz tog razloga, u try blok postavljamo poziv
	 * metode za koji znamo da moze da "pukne". A u catch blok komande koje
	 * izvrsavamo ukoliko do Exceptiona dodje. Ukoliko je sve u redu, catch blok se
	 * nece izvrsiti i try blok ce vratiti true.
	 * 
	 * @param studentIndex
	 * @return
	 */
	public boolean isStudentInTable(String studentIndex) {
		try {
			return driver.findElement(By.linkText(studentIndex)).isDisplayed();
		} catch (Exception e) {
			return false;
		}

	}

	/**
	 * Metoda koja objedinjuje metode za unos svih polja studenta skracujemo posao -
	 * iz test metode dovoljno je pozvati samo ovu jednu metodu
	 * 
	 * @param index
	 * @param name
	 * @param lastName
	 * @param city
	 */
	public void populateStudentsFields(String index, String name, String lastName, String city) {
		this.setIndex(index);
		this.setName(name);
		this.setLastName(lastName);
		this.setCity(city);
		this.clickSaveStudent();
	}

	/**
	 * Metoda vraca broj studenata u tabeli, selektor proverava broj tr elemenata.
	 * FindElements ce vratiti listu, nad kojom pozivamo.size() metodu, vodimo
	 * racuna da povratna vrednost metode bude int
	 * 
	 * @return
	 */
	public int numberOfStudentsInTable() {
		return driver.findElements(By.xpath("//table/tbody/tr")).size();
	}

	/**
	 * Metoda ce da izvrsi klik na "Edit" dugme onog studenta ciji se index poklopi
	 * sa onim koji je prosledjen kao parametar. Ovde imamo primer da smo parametar
	 * metode prosledili lokatoru tako da metoda moze da izvrsi klik na edit dugme
	 * bilo kog studenta ciji index prosledimo kao parametar
	 * 
	 * @param index
	 */
	public void clickEditButtonWithIndex(String index) {
		WebElement el = driver.findElement(By.xpath("//tr/td[a/text() = '" + index
				+ "']/following-sibling::td//button[@ui-sref='studenti.edit({id:studenti.id})']"));
		el.click();
	}

	/**
	 * Metoda ce da izvrsi klik na "Delete" dugme onog studenta ciji se index
	 * poklopi sa onim koji je prosledjen kao parametar. Ovde imamo primer da smo
	 * parametar metode prosledili lokatoru tako da metoda moze da izvrsi klik na
	 * delete dugme bilo kog studenta ciji index prosledimo kao parametar
	 * 
	 * @param index
	 */
	public void clickDeleteButtonWithIndex(String index) {
		WebElement el = driver.findElement(By.xpath("//tr/td[a/text() = '" + index
				+ "']/following-sibling::td//button[@ui-sref='studenti.delete({id:studenti.id})']"));
		el.click();
	}

	/**
	 * 
	 * Selekcija reda na osnovu broja indeksa. Prvo se selektuje <a> tag koji ima
	 * tekst kao indeks, a zatim se pokupi njegov roditelj
	 * <td>(/../), a zatim roditelj od
	 * <td>sto predstavlja
	 * <tr>
	 * (/../)
	 * 
	 * @param index - broj indeksa
	 * 
	 * @return student row
	 * 
	 */
	public WebElement getStudentRowByIndex(String index) {
		WebElement el = new WebDriverWait(driver, 10)
				.until(ExpectedConditions.visibilityOfElementLocated((By.xpath("//*[contains(text(),\"" + index + "\")]/../.."))));
		return el;
	}
}
