package unittesting.country;

import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import unittesting.country.dao.CountryDAO;
import unittesting.country.model.Country;
import unittesting.country.service.CountryService;

public class CountryServiceTest {
	
	CountryService countryService;
	CountryDAO mockedCountryDAO;

	@BeforeMethod
	public void setUp() {
		countryService = new CountryService();
		
		mockedCountryDAO = mock(CountryDAO.class);
		countryService.setCountryDAO(mockedCountryDAO);
		
	}
	
	@Test
	public void testClassifyCountry1() {
		when(mockedCountryDAO.findById(3)).thenReturn(new Country(3, "Germany", 82000000));
		
		int actual = countryService.classifyCountry(3);
		
		assertEquals(actual, 1);
	}
	
	@Test
	public void testClassifyCountry2() {
		when(mockedCountryDAO.findById(99)).thenReturn(new Country(99, "Serbia", 7000000));
		
		int actual = countryService.classifyCountry(99);
		
		assertEquals(actual, 2);
	}
	
	@Test
	public void testClassifyCountry3() {
		when(mockedCountryDAO.findById(anyInt())).thenReturn(new Country(1, "Monaco", 38000));
		
		int actual = countryService.classifyCountry(6438);
		
		assertEquals(actual, 3);
	}
	
	@Test
	public void testClassifyCountryNoResult() {
		when(mockedCountryDAO.findById(1)).thenReturn(null);
		
		int actual = countryService.classifyCountry(1);
		
		assertEquals(actual, -1);
	}
}
