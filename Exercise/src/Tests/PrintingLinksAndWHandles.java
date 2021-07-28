package Tests;

import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class PrintingLinksAndWHandles {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		
		driver.get("https://www.rahulshettyacademy.com/AutomationPractice/");
		
		System.out.println(driver.findElements(By.tagName("a")).size()); // koliko linkova sadrzi stranica?
		
		WebElement footerdriver = driver.findElement(By.id("gf-BIG"));
		System.out.println(footerdriver.findElements(By.tagName("a")).size()); // koliko linkova sadrzi footer (dole)?
		
		WebElement columndriver = footerdriver.findElement(By.xpath("//table/tbody/tr/td[1]/ul")); 
		System.out.println(columndriver.findElements(By.tagName("a")).size()); 
		//koliko linkova sadrzi prva kolona u footeru dole (odaberemo jedinstvenu parent xpath  putanju za tu kolonu i onda tek pitamo za broj linkova)?
		
		for (int i=1; i< columndriver.findElements(By.tagName("a")).size(); i++)
		{
			String clickOnLinkTab = Keys.chord(Keys.CONTROL, Keys.ENTER);
			
			columndriver.findElements(By.tagName("a")).get(i).sendKeys(clickOnLinkTab);
			//otvori 4 linka u toj prvoj koloni u posebnim tabovima (saljemo ctrl + enter tipke na linkove uz pomoc "for")
		}
		
		Set<String> abc = driver.getWindowHandles();
		Iterator<String> it = abc.iterator();
		
		while(it.hasNext())
		{
			driver.switchTo().window(it.next());
			System.out.println(driver.getTitle()); // uzmi nazive stranica i predji od jedne do druge (uz pomoc "while")
		}
	}

}
