package unittesting.parcijalni;

public class Car {

	private String chassisNumber;
	private String name;
	private int productionYear;
	private int currentMileage;
	private int lastServiceMileage;

	public Car() {
		super();
	}

	public Car(int currentMileage) {
		super();
		this.currentMileage = currentMileage;
	}

	public Car(String chassisNumber, String name, int productionYear, int currentMileage, int lastServiceMileage) {
		super();
		this.chassisNumber = chassisNumber;
		this.name = name;
		this.productionYear = productionYear;
		this.currentMileage = currentMileage;
		this.lastServiceMileage = lastServiceMileage;
	}

	public String getChassisNumber() {
		return chassisNumber;
	}

	public void setChassisNumber(String chassisNumber) {
		this.chassisNumber = chassisNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getProductionYear() {
		return productionYear;
	}

	public void setProductionYear(int productionYear) {
		this.productionYear = productionYear;
	}

	public int getCurrentMileage() {
		return currentMileage;
	}

	public void setCurrentMileage(int currentMileage) {
		this.currentMileage = currentMileage;
	}

	public int getLastServiceMileage() {
		return lastServiceMileage;
	}

	public void setLastServiceMileage(int lastServiceMileage) {
		this.lastServiceMileage = lastServiceMileage;
	}

}
