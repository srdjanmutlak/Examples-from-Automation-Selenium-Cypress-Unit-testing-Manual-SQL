package Tests;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class E2e {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(8, TimeUnit.SECONDS);  // Implicit wait
		
		driver.get("https://www.spicejet.com/"); //Odlazak na zeljenu adresu
		
		driver.findElement(By.id("ctl00_mainContent_rbtnl_Trip_0")).click(); //Klik na "One Way"
		
		driver.findElement(By.id("ctl00_mainContent_ddl_originStation1_CTXT")).click(); //Klik na biranje "from" gradova
		driver.findElement(By.xpath("//a[@value='DEL']")).click(); // Klik na "Delhi" iz prve liste gradova
		
		WebDriverWait w = new WebDriverWait(driver, 10); // Explicit wait, sacekamo da se prikaze sledeca lista gradova
		//Problem: chropath pokazuje da postoje dva xpath-a za svaki grad u drugoj koloni. Resenja:
		w.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//a[@value='MAA'])[2]")));  // Pokazujem znanje u pisanju jedinstvenog xpath-a sa koriscenjem zagrada i [2]
		
		driver.findElement(By.xpath("//div[@id='glsctl00_mainContent_ddl_destinationStation1_CTNR'] //a[@value='MAA']")).click(); // Pokazujem znanje u pisanju jedinstvenog xpath-a gde umesto gorenavedenih
		// zagrada i [2]  ovaj put dodajem parent xpath 
		
		//Pokazujem da znam da koristim funkcije "while", negaciju("!") i "for" za manipulaciju kalendara. Trazimo 23. Decembar:
		while(!driver.findElement(By.xpath("//div[@class='ui-datepicker-title']")).getText().contains("December"))
		{
			driver.findElement(By.cssSelector("a[title='Next']")).click();
		}
		// Postupak: odaberemo jedinstven css preko parenta za naziv meseca van loop-a i za next dugme unutar loop-a. Zeljeni mesec unesemo u contains polje.
		// Zatim izmenimo funkciju "while" negacijom iz true u false (dodajuci !) tako da kliktaji na next dugme traju sve dok ne dodjemo do zeljenog meseca.
		// Kada dodje do zeljenog meseca, prepoznaje se false funkcija i automatski prelazimo na biranje dana u mesecu.		
		// Biranje dana:
		List<WebElement> dates = driver.findElements(By.className("ui-state-default")); //kreiramo "listu dana" za sve dane u mesecu
		
		int count = driver.findElements(By.className("ui-state-default")).size(); //kreiramo int count uz naredbu "size"
		
		for(int i=0; i<count; i++)  //naredimo da pocne listanje dana
		{
			String text = driver.findElements(By.className("ui-state-default")).get(i).getText(); // naredimo da posmatra koji tekst sadrze ti dani
			if(text.equalsIgnoreCase("23"))          // naredimo da stane sa listanjem ako naidje na dan koji sadrzi "23" tekst
			{
				driver.findElements(By.className("ui-state-default")).get(i).click(); 
				break;   // naredimo da klikne na "23" i da prekine loop
			}
		}
		// Drugi kalendar bi morao ostati "Disabled"
		System.out.println(driver.findElement(By.id("Div1")).getAttribute("style"));
		
		if (driver.findElement(By.id("Div1")).getAttribute("style").contains("0.5"))   
		{
			System.out.println("It is disabled!");
			Assert.assertTrue(true);
		}
		else
		{
			Assert.assertTrue(false);
		}
		// Pokazujem da znam da prepoznam promene unutar html koje ukazuju na to da li je kalendar disabled (ako je enabled onda je opacity: 1) --> pogledati Console
		
		driver.findElement(By.id("divpaxinfo")).click();  // Klik na "passengers"
		w.until(ExpectedConditions.visibilityOfElementLocated(By.id("ctl00_mainContent_ddl_Adult")));  //Sacekamo da se pojavi
		Select s = new Select(driver.findElement(By.id("ctl00_mainContent_ddl_Adult"))); // Pokazujem da znam da koristim "select"
		s.selectByValue("5");
		
		driver.findElement(By.cssSelector("input[id*='SeniorCitizenD']")).click();     // Klik na "Sr Citizen". Pokazujem da znam da skratim css a da on ostane jedinstven
		
		driver.findElement(By.id("ctl00_mainContent_btn_FindFlights")).click();   //  Klik na trazenje (slicica sa avionom koji polece)
		
	}

}
