package unittesting.parcijalni;

public class CreditCardService {

	private CreditCardDAO creditCardDAO;
	
	/**
	 * Metoda izvršava novčanu transakciju 
	 * 
	 * Ukoliko je limit transakcije kreditne kartice manji od sume novca koja se prenosi, 
	 * metoda vraca "Over limit charge"
	 * 
	 * Ukoliko se na računu kreditne kartice nalazi manje novca od sume koja se prenosi,
	 * metoda vraca "Not enough money"
	 * 
	 * Ukoliko je moguće izvršiti transakciju metoda vraca "Sucess"
	 * 
	 * @param balanceOnAccount stanje na kreditnoj kartici
	 * @param amount suma novca koja se prenosi transakcijom
	 * @param limit ogranicenje po transakciji
	 */
	public String transaction(double balanceOnAccount, double amount, double limit) {

		if (limit < amount) {
			return "Over limit charge";
		}

		if (balanceOnAccount < amount) {
			return "Not enough money";
		}

		return "Success";
	}

	/**
	 * Metoda proverava da li prosleđeni PIN odgovara prosleđenom broju kreditne
	 * kartice
	 * 
	 * Ukoliko kreditna kartica ne postoji u sistemu, baca NullPointerException()
	 * 
	 * Ukoliko PIN nije ispavan i broj pokušaja je manji od 3, vraća False
	 * 
	 * Ukoliko PIN nije isparav i broj pokušaja je veći od 3, baca
	 * RuntimeException()
	 * 
	 * Ukoliko je PIN isparav vraća True
	 * 
	 */
	public boolean tryPIN(Long creditCardNumber, int PIN) {

		CreditCard creditCard = creditCardDAO.findByCreditCardNumber(creditCardNumber);

		if (creditCard == null) {
			throw new NullPointerException();
		}

		if (creditCard.getPin() != PIN && creditCard.getNumOfTries() < 3) {
			return false;
		} else if (creditCard.getPin() != PIN && creditCard.getNumOfTries() >= 3) {
			throw new RuntimeException();
		}

		return true;
	}

	public void setCreditCardDAO(CreditCardDAO creditCardDAO) {
		this.creditCardDAO = creditCardDAO;
	}

}
