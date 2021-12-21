package unittesting.customer;

import java.util.HashMap;

public class CustomerDAO {

	private HashMap<Integer, Customer> customerStorage;

	public CustomerDAO() {
		super();

		this.customerStorage.put(1, new Customer(1, "Pera", "Peric", 1111222233334444L));
		this.customerStorage.put(2, new Customer(2, "Mira", "Miric", 3333444455556666L));
	}

	public Customer find(int id) {
		Customer customer = this.customerStorage.get(id);
		return customer;
	}
}
