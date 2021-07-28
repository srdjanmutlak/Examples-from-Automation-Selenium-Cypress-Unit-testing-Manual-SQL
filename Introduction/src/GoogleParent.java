import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class GoogleParent {

	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.get("http://google.com/");
		driver.findElement(By.xpath("//div[@class='SDkEP']/div[2]/input")).sendKeys("GO!");
		
//Biramo predaka za kojeg mislimo da je jedinstven, a potom redjamo pocetne oznake do naseg patha.
//Ako se neka oznaka ponavlja u toj grani onda dodeljujemo broj u zagradi i oznacavamo koja je to oznaka po redu u toj grani.
		

	}

}
