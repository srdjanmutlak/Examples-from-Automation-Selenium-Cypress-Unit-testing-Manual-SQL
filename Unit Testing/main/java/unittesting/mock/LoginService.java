package unittesting.mock;

public class LoginService {

	// atribut klase UserDAO i referenca
	// Posto zelimo da metodu login testiramo u izolaciji
	// potrebno je da mokujemo ovu klasu i njenu metodu loadByUsername
	UserDAO userDao;

	public boolean login(String username, String password) {
		User user = this.userDao.loadByUsername(username);

		// login je uspesan ukoliko se korisnik sa prosledjenim username-om pronadje u
		// UserDAO klasi
		if (user != null) {
			return true;
		}

		return false;
	}

	// getter
	public UserDAO getUserDao() {
		return userDao;
	}

	// setter
	public void setUserDao(UserDAO userDao) {
		this.userDao = userDao;
	}
}
