package Tests;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ProductsChoosing {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		
		driver.get("https://rahulshettyacademy.com/seleniumPractise/");    //PROBLEM: Cucumber add to cart dugme poseduje xpath koji je jednak sa 30 drugih xpathova
		
		List<WebElement> products = driver.findElements(By.cssSelector("h4.product-name")); //Resenje: izlistamo sva product imena (isto ih ima 30)
		
		for(int i=0;i<products.size();i++)           //krecemo od prvog i listacemo do poslednjeg proizvoda dok ne nadjemo nas proizvod
		{
			
			String name=products.get(i).getText();    //naredimo da se uzme tekst proizvoda koji je odabran iz liste i koji je na redu
			
			if (name.contains("Cucumber"))            //i da se proveri da li taj tekst sadrzi rec "Cucumber"
			{	
				driver.findElements(By.xpath("//div[@class='product-action']/button")).get(i).click(); 
				
				// ako sadrzi "Cucumber" naredimo da klikne na add to cart (izbegavati xpathove sa "text()" i odabrati xpath koji je kreiran preko parenta)
				
				break;          //zatim prekinemo loop
			}
			
		}
		
		
		
		
		
	}

}
