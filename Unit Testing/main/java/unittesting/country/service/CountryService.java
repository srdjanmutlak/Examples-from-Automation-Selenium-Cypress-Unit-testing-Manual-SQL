package unittesting.country.service;

import unittesting.country.dao.CountryDAO;
import unittesting.country.model.Country;

public class CountryService {
	
	private CountryDAO countryDAO;

	// metode klasifikuje drzavu na osnovu broja stanovnika
	// vraca oznaku grupe u koju je drzava klasifikovana prema sledecem pravilu:
	// 1 - drzave koje imaju vise od 10 miliona stanovnika
	// 2 - drzave koje imaju izmedju 1 i 10 miliona stanovnika
	// 3 - drzave koje imaju manje od milion stanovnika
	public int classifyCountry(int countryId) {
		Country country = countryDAO.findById(countryId);
		
		if (country != null) {
			if (country.getPopulation() > 10000000) {
				return 1;
			} else if (country.getPopulation() > 1000000) {
				return 2;
			} else {
				return 3;
			}
		} else {
			return -1;
		}
	}

	public CountryDAO getCountryDAO() {
		return countryDAO;
	}

	public void setCountryDAO(CountryDAO countryDAO) {
		this.countryDAO = countryDAO;
	}
	
}
