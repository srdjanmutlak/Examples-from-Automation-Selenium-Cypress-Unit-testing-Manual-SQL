package Tests;

import java.util.Iterator;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class UsingWhileFor {

	public static void main(String[] args) throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.get("https://www.desmos.com/scientific");
		
		
//		int i=1;
//		while (i<5) {
//			driver.findElement(By.xpath("//span[@aria-label='5']")).click();  jedan nacin ako treba kliknuti vise puta(4) na isto mesto
//			i++;
		
		for (int i=1;i<5;i++) {
			driver.findElement(By.xpath("//span[@aria-label='5']")).click();
		}
		
		driver.findElement(By.xpath("//span[@aria-label='Squared']")).click();
		
		System.out.println(driver.findElement(By.xpath("//div[@aria-label='Expression 1:']")).getText());
		
// ovo je drugi nacin gde koristimo for + komanda da printujemo sebi rezultat u konzoli
	}

}
