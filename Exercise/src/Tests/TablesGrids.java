package Tests;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TablesGrids {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(8, TimeUnit.SECONDS);
		
		int sum = 0;
		
		driver.get("https://www.cricbuzz.com/live-cricket-scorecard/33343/som-vs-leic-group-2-county-championship-2021");
		
		WebElement table = driver.findElement(By.cssSelector("div[class='cb-col cb-col-100 cb-ltst-wgt-hdr']"));
		int rowcount = table.findElements(By.cssSelector("cb-col cb-col-100 cb-scrd-itms")).size();
		int count = table.findElements(By.cssSelector("div[class='cb-col cb-col-100 cb-scrd-itms'] div:nth-child(3)")).size();
		
		for(int i=0; i<count-2; i++)
		{
			String value = table.findElements(By.cssSelector("div[class='cb-col cb-col-100 cb-scrd-itms'] div:nth-child(3)")).get(i).getText();
			int valuentiger = Integer.parseInt(value);
			sum = sum + valuentiger;
		}
		
		System.out.println(driver.findElement(By.xpath("//div[contains(.,'Extras')]/following-sibling::div ")).getText());
		System.out.println(driver.findElement(By.xpath("//div[contains(.,'Total')]/following-sibling::div ")).getText());
	}

}
