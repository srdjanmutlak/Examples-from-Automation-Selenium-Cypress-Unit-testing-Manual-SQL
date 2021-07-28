package Tests;

import java.util.Iterator;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class AutoSuggestiveDropdowns {

	public static void main(String[] args) throws InterruptedException {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.get("https://www.seleniumeasy.com/test/jquery-dropdown-search-demo.html");
		
		driver.findElement(By.xpath("//input[@placeholder='Select state(s)']")).sendKeys("al");
		Thread.sleep(2000);
		List<WebElement> options =driver.findElements(By.cssSelector("ul[aria-hidden='false'] li"));
		//Posle ukucavanja "al" inspect na Alaska-u i potom nadjemo parenta od Alaska-e, ukucamo njegov css, razmak, i dodamo "li"
		//sto je nastavak za 3 izbora koje imamo, a jedan od njih je Alaska (selectors hub ce potvrditi da imamo tri izbora)
		
		for (WebElement option :options) {
			
			if(option.getText().equalsIgnoreCase("Alaska"))
					{
				option.click();
				break;
		//potom napravimo program da kad naleti na Alaska-u on mora da klikne na nju 		
					}
		}
		
	}

}
