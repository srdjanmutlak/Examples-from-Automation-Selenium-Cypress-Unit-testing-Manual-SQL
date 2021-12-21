package unittesting.parcijalni;

import static org.testng.Assert.assertEquals;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;


public class Zadatak2 {

	private TehnicalInspection tehnicalInspection;

	@BeforeMethod
	public void setUp() {
		tehnicalInspection = new TehnicalInspection();
	}
	
	@Test(dataProvider = "zadatak2Provajder", dataProviderClass = KlasaDataProvider.class)
	public void testZadatak2(int productionYear, String status) {
		String actual = tehnicalInspection.carAgeCategory(productionYear);
		
		assertEquals(actual, status);
	}
}