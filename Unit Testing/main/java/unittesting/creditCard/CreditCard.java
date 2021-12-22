package unittesting.parcijalni;

public class CreditCard {

	private Long id;
	private Long creditCardNumber;
	private int pin;
	private int numOfTries;
	private double limit;
	private double balance;

	public CreditCard() {
		super();
	}

	public CreditCard(Long id, Long creditCardNumber, int pin, int numOfTries) {
		super();
		this.id = id;
		this.creditCardNumber = creditCardNumber;
		this.pin = pin;
		this.numOfTries = numOfTries;
	}

	public CreditCard(Long id, Long creditCardNumber, double limit, double balance) {
		super();
		this.id = id;
		this.creditCardNumber = creditCardNumber;
		this.limit = limit;
		this.balance = balance;
	}

	public CreditCard(Long id, Long creditCardNumber, int pin, int numOfTries, double limit, double balance) {
		super();
		this.id = id;
		this.creditCardNumber = creditCardNumber;
		this.pin = pin;
		this.numOfTries = numOfTries;
		this.limit = limit;
		this.balance = balance;
	}

	public CreditCard(Long creditCardNumber, int pin, int numOfTries, double limit, double balance) {
		super();
		this.creditCardNumber = creditCardNumber;
		this.pin = pin;
		this.numOfTries = numOfTries;
		this.limit = limit;
		this.balance = balance;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCreditCardNumber() {
		return creditCardNumber;
	}

	public void setCreditCardNumber(Long creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

	public int getPin() {
		return pin;
	}

	public void setPin(int pin) {
		this.pin = pin;
	}

	public int getNumOfTries() {
		return numOfTries;
	}

	public void setNumOfTries(int numOfTries) {
		this.numOfTries = numOfTries;
	}

	public double getLimit() {
		return limit;
	}

	public void setLimitation(double limit) {
		this.limit = limit;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}
}
