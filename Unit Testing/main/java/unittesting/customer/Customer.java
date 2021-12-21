package unittesting.customer;

public class Customer {

	private int id;
	private String firstName;
	private String lastName;
	private long creditCardNumber;

	public Customer() {
		super();
	}

	public Customer(int id, String firstName, String lastName, long creditCardNumber) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.creditCardNumber = creditCardNumber;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public long getCreditCardNumber() {
		return creditCardNumber;
	}

	public void setCreditCardNumber(long creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

}
