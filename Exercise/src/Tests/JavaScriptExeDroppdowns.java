package Tests;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class JavaScriptExeDroppdowns {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
		
		driver.get("https://ksrtc.in/");
		
		driver.findElement(By.id("fromPlaceName")).sendKeys("BENG");
		driver.findElement(By.id("fromPlaceName")).sendKeys(Keys.DOWN);
		
		System.out.println(driver.findElement(By.id("fromPlaceName")).getText());
		// Nekad nam nece prikazati tekst iako smo sve dobro uradili. Onda koristimo JavascriptExecutor koji moze da identifikuje skrivene elemente:
		
		JavascriptExecutor js = (JavascriptExecutor)driver;
		
		String script = "return document.getElementById(\"fromPlaceName\").value;";
		String text = (String) js.executeScript(script);
		System.out.println(text);
		int i = 0;
		
		while(!text.equalsIgnoreCase("CHIKKALSANDRA BENGALURU")) // Ako promenimo nesto u tekstu, test ce pokusati da provrti opcije 10 puta i onda ce da odustane
		{
			i++;
			driver.findElement(By.id("fromPlaceName")).sendKeys(Keys.DOWN);
			
			text = (String) js.executeScript(script);
			System.out.println(text);
			if(i>10) {
				break;
			}
		}
		if(i>10) {
			System.out.println("Element not found!");
		}
		else {
			System.out.println("Element found!");
		}
	}

}
