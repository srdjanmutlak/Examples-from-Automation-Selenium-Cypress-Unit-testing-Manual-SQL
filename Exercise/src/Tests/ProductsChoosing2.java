package Tests;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ProductsChoosing2 {

	public static void main(String[] args) {
		
		System.setProperty("webdriver.chrome.driver", "C:\\work\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		
		int j=0;  //pogledati dole za sta nam treba ovaj int
		
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		
	//PROBLEM: add to cart dugme poseduje xpath koji je jednak sa 30 drugih xpathova, a hocemo da dodamo nekoliko proizvoda
		
		String[] itemsNeeded = {"Cucumber","Brocolli","Beetroot"}; // Resenje: koristimo arrays 
		
		driver.get("https://rahulshettyacademy.com/seleniumPractise/");    
		
		List<WebElement> products = driver.findElements(By.cssSelector("h4.product-name")); //izlistamo sva product imena (isto ih ima 30)
		
		for(int i=0;i<products.size();i++)         //krecemo od prvog i listacemo do poslednjeg proizvoda dok ne nadjemo nasa 3 proizvoda
		{
			
			String[] name=products.get(i).getText().split("-"); 
			//da bi smo odabrali samo naziv proizvoda a ne i dodatak "- 1kg" biramo split i oznaku, program potom bira sve levo od "-"
			
			String formatedName=name[0].trim(); //trim koristimo da trimujemo prazna mesta izmedju reci i znakova
			
			List itemsNeededList = Arrays.asList(itemsNeeded);  // pretvaramo listu u array-e
			
			if (itemsNeededList.contains(formatedName))           //ovde proveravamo da li formatedName odgovara nekom od nasa tri nabrojana proizvoda
			{	
				j++;
				
				driver.findElements(By.xpath("//div[@class='product-action']/button")).get(i).click();
				//zatim ako odgovara program klikne na add to cart (izbegavati xpathove sa "text()" i odabrati xpath koji je kreiran preko parenta)				
				
				if(j==3)
				{
					break;
				}
	 // u medjuvremenu "j" dolazi do trojke sa svakim novoubacenim proizvodom u ovaj loop i posto nasih proizvoda ima 3, po naredbi ako je j==3, izlazimo iz loop-a
			}
			
		}
	}

}
