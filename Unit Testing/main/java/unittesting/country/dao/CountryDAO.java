package unittesting.country.dao;

import java.util.HashMap;

import unittesting.country.model.Country;

public class CountryDAO {

	private HashMap<Integer, Country> countryStorage;

	public CountryDAO() {
		super();

		this.countryStorage.put(1, new Country(1, "Belgium", 11000000));
	}

	public Country findById(int id) {
		Country country = this.countryStorage.get(id);
		return country;
	}
}
