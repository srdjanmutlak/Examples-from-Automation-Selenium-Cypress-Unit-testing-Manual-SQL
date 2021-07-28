package Tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class Dropdown {

	public static void main(String[] args) throws InterruptedException {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.get("https://book.spicejet.com/");
		driver.findElement(By.xpath("//span[normalize-space()='Hotels']")).click();
			Thread.sleep(2000l); //thread.sleep izbegavamo da koristimo u automatizovanom testiranju
	
		Select s = new Select(driver.findElement(By.id("MySpiceTripSearchView_DropDownListPassengerType_ADT")));
		s.selectByValue("2");
		s.selectByIndex(5);
		s.selectByVisibleText("8");
		
		//postoji i opcija deselect ali nemamo sta da deselectujemo
		
	}

}
