package Tests;

import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class MultipleWindows {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		
		driver.get("https://pulse.rs/neprilagodenost-i-korporativna-eksploatacija-postpatrijarhata/");
		
		driver.findElement(By.xpath("//strong//a")).click();
		System.out.println(driver.getTitle());
		
		Set<String>ids=driver.getWindowHandles(); 
		
		Iterator<String> it = ids.iterator();
		String parentId = it.next();
		String childId = it.next();
		
		driver.switchTo().window(childId);
		System.out.println(driver.getTitle());
		
		driver.switchTo().window(parentId);
		System.out.println(driver.getTitle());  //prelazimo sa parent stranice (prozora) na child stranicu (prozor) i nazad sto dokazuje getTitle
		
	}

}
