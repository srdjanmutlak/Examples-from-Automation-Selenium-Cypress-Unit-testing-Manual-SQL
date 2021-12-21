package unittesting.country.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class Country {

	private int id;
	private String name;
	private int population;
	private ArrayList<City> cities = new ArrayList<City>();

	public Country() {

	}

	public Country(String name, int population) {
		super();
		this.name = name;
		this.population = population;
	}

	public Country(int id, String name, int population) {
		super();
		this.id = id;
		this.name = name;
		this.population = population;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPopulation() {
		return population;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	public ArrayList<City> getCities() {
		return cities;
	}

	public void setCities(ArrayList<City> cities) {
		this.cities = cities;
	}

}
