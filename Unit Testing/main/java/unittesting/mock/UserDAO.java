package unittesting.mock;

import java.util.HashMap;

/*
 * Klasa koja simulira DB
 * Umesto da se obracamo nekoj realnoj bazi podataka, sve podatke o User-ima cemo skladistiti u atribut userStore
 */
public class UserDAO {

	// Atribut klase UserDAO
	private HashMap<String, User> userStore;

	// Konstruktor bez parametara
	// Pri instanciranju objekta klase UserDAO u njegov atribut userStore bice dodat
	// novi objekat klase User
	public UserDAO() {
		super();
		this.userStore.put("user", new User("user", "user"));
	}

	// Konstruktor sa parametrima
	public UserDAO(HashMap<String, User> userStore) {
		super();
		this.userStore = userStore;
	}

	// Metoda klase koja na osnovu prosledjenog username-a korisnika
	// vraca objekat klase User
	// Na ovaj nacin smo simulirali postojanje baze
	public User loadByUsername(String userName) {
		User retUser = this.userStore.get(userName);

		return retUser;
	}

}
