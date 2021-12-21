package unittesting.testng.param;

import org.testng.Assert;
import org.testng.annotations.Test;

public class TestParamDataProvider2 {

	//ova test metoda poziva DataProvider iz druge klase,
	//stoga moramo navesti atribut dataProviderClass
	@Test(dataProvider = "provideText", dataProviderClass = TestParamDataProvider.class)
	public void testDPFromAnotherClass(String initialText, String expected) {
		Assert.assertEquals(initialText + " with this!", expected);
	}

}
