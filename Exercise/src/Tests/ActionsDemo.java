package Tests;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class ActionsDemo {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		
		driver.get("https://www.amazon.com/");
		Actions a = new Actions (driver);
		WebElement move=driver.findElement(By.cssSelector("a[id*='acc']"));
		
		//a.moveToElement(move).build().perform();  //akcija da hoverujemo misom iznad
		
		a.moveToElement(driver.findElement(By.id("twotabsearchtextbox"))).click().keyDown(Keys.SHIFT).sendKeys("longines").doubleClick().build().perform();
		//pisati velikim slovima u search i posle dupli klik da oznacimo ta napisana slova
		
		a.moveToElement(move).contextClick().build().perform(); //desni klik misom na odredjenu lokaciju
		
		
	}

}
