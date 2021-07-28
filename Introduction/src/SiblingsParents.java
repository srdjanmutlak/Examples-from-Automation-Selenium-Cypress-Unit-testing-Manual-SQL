import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.SendKeysAction;

public class SiblingsParents {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.get("http://testautomationpractice.blogspot.com/");
		driver.findElement(By.xpath("//label[normalize-space()='Your age:']/following-sibling::input")).sendKeys("GOgo");

// Kada biramo xpath preko siblinga moramo da ukucamo xpath siblinga, zatim gledamo da li je nas path following ili preceding.

// Ako je following onda kucamo following-sibling:: +pocetna oznaka naseg path-a

// Ako je preceding onda kucamo preceding-sibling:: +pocetna oznaka naseg path-a
		
		
		driver.findElement(By.cssSelector("[class='wikipedia-search-input']")).sendKeys("Death metal");
		
// css selektor univerzalni kod je tagname[attribute='value']
// mada se moze pisati i samo [attribute='value']
		
		driver.findElement(By.xpath("//*[text()='Click Me']")).click();
		
//Univerzalni kod za biranje vidljivog teksta je //*[text()=' Example '] - moramo paziti i da li tekst sadrzi i razmake pre i posle teksta
		
	}

}
