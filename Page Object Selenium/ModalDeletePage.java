package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Modalni dijalog mozemo modelovati kao poseban Page Objekat. Svaki entitet
 * koji ima mogucnost da bude obrisan ima potpuno isti modalni dijalog, na ovaj
 * nacin smanjujemo redudantnost koda
 *
 */
public class ModalDeletePage {

	private WebDriver driver;

	public ModalDeletePage(WebDriver driver) {
		super();
		this.driver = driver;
	}

	/**
	 * Proveravamo da li je modalni dijalog sa className lokatorom vidljiv
	 * 
	 * @return
	 */
	public WebElement getModal() {
		WebElement element = (new WebDriverWait(driver, 15))
				.until(ExpectedConditions.visibilityOfElementLocated(By.className("modal-dialog")));
		return element;
	}

	/**
	 * Nad modalnim dijalogom trazimo dugme "Confirm" sa className lokatorom i
	 * izvrsavamo klik akciju
	 */
	public void confirmDelete() {
		getModal().findElement(By.className("btn-danger")).click();
	}

	/**
	 * Nad modalnim dijalogom trazimo "Cancel" dugme sa className lokatorom i
	 * izvrsavamo klik akciju
	 */
	public void cancelDelete() {
		getModal().findElement(By.className("btn-default")).click();
	}

}
