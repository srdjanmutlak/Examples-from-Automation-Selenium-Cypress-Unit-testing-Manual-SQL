package unittesting.parcijalni;

import org.testng.annotations.DataProvider;

public class KlasaDataProvider {

	@DataProvider(name = "zadatak1Provajder")
	public static Object[][] provideData() {

		return new Object[][] { 
			{ 1000, 900, 800, "Over limit charge" }, 
			{ 1000, 1500, 2000, "Not enough money" }, 
			{ 1000, 200, 500, "Success" },
			{ 2000, 5000, 300, "Success"}
		};
	}
}
