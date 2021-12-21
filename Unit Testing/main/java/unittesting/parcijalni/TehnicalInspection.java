package unittesting.parcijalni;

import org.omg.CosNaming.NamingContextPackage.NotFound;

public class TehnicalInspection {

	private CarRepository carRepository;

	public String needCarService(String chassisNumber) throws NotFound {

		int lengthOfChassisNumber = String.valueOf(chassisNumber).length();

		if (lengthOfChassisNumber == 17) {

			Car car = this.carRepository.findByChassisNumber(chassisNumber);

			if (car != null) {

				if (car.getCurrentMileage() < 10000) {
					return "Bez servisa";
				} else if (car.getCurrentMileage() >= 10000 && car.getCurrentMileage() < 80000) {
					return "Mali servis";
				} else {
					return "Veliki servis";
				}

			} else {
				throw new NotFound();
			}

		} else {
			throw new IllegalArgumentException();
		}
	}

	public String carAgeCategory(int productionYear) {
		if (productionYear < 1919 || productionYear > 2021) 
			return "Not classified";
		else if (productionYear >= 1919 && productionYear < 1930)
			return "Vintage Car";
		else if (productionYear <= 1975)
			return "Antique Car";
		else if (productionYear <= 1990)
			return "Classic Car";
		else
			return "Modern Car";
	}

	public CarRepository getCarRepository() {
		return carRepository;
	}

	public void setCarRepository(CarRepository carRepository) {
		this.carRepository = carRepository;
	}

}
