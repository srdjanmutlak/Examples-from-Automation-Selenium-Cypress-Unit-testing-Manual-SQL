package unittesting.parcijalni;

import org.testng.annotations.DataProvider;

public class KlasaDataProvider {

	@DataProvider(name = "zadatak2Provajder")
	public static Object[][] provideData() {

		return new Object[][] { 
			{ 2020, "Modern Car" },
			{ 1991, "Modern Car" },
			{ 1989, "Classic Car" }, 
			{ 1976, "Classic Car" },
			{ 1974, "Antique Car" },
			{ 1931, "Antique Car" },
			{ 1929, "Vintage Car" },
			{ 1920, "Vintage Car" },
			{ 1918, "Not classified" },
			{ 2022, "Not classified" }
		};
	}
}
