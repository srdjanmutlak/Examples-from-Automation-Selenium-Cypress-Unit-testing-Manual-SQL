package Tests;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class CalendarsDates {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		
		driver.get("https://www.path2usa.com/travel-companions");
		
		driver.findElement(By.xpath("//input[@id='travel_date']")).click(); // klik na biranje datuma
		
		while(!driver.findElement(By.cssSelector("[class=' table-condensed'] [class='datepicker-switch']")).getText().contains("December"))
		{
			driver.findElement(By.cssSelector("[class=' table-condensed'] [class='next']")).click();
		}
// Odaberemo jedinstven css preko parenta za naziv meseca van loop-a i za next dugme unutar loop-a. Zeljeni mesec unesemo u contains polje.
// Zatim izmenimo funkciju "while" negacijom iz true u false (dodajuci !) tako da kliktaji na next dugme traju sve dok ne dodjemo do zeljenog meseca.
// Kada dodje do zeljenog meseca, prepoznaje se false funkcija i automatski prelazimo na biranje dana u mesecu
		
		List<WebElement> dates = driver.findElements(By.className("day")); //kreiramo "listu dana" za sve dane u mesecu
		
		int count = driver.findElements(By.className("day")).size(); //kreiramo int count uz naredbu "size"
		
		for(int i=0; i<count; i++)  //naredimo da pocne listanje dana
		{
			String text = driver.findElements(By.className("day")).get(i).getText(); // naredimo da posmatra koji tekst sadrze ti dani
			if(text.equalsIgnoreCase("23"))          // naredimo da stane sa listanjem ako naidje na dan koji sadrzi "23" tekst
			{
				driver.findElements(By.className("day")).get(i).click(); 
				break;   // naredimo da klikne na "23" i da prekine loop
			}
		}
		
	}

}
