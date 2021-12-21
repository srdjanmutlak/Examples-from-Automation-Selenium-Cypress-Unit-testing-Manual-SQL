package unittesting.country.model;

public class City {
	
	private Long id;
	private int zipCode;
	private String name;

	public City() {
		super();
	}

	public City(Long id, int zipCode, String name) {
		super();
		this.id = id;
		this.zipCode = zipCode;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getZipCode() {
		return zipCode;
	}

	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
