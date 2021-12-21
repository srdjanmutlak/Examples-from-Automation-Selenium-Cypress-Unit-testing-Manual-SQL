package unittesting.customer;

public class CustomerService {

	CustomerDAO customerDao;

	public boolean checkCustomerCreditCardNumber(long creditCardNumber) throws IllegalArgumentException {

		if (creditCardNumber <= 0) {
			throw new IllegalArgumentException();
		}

		int lengthOfCreditCardNumber = String.valueOf(creditCardNumber).length();

		if (lengthOfCreditCardNumber != 16) {
			return false;
		}

		return true;
	}

	public String findCustomerFullName(int id) {
		Customer customer = customerDao.find(id);

		if (customer == null)
			return "";

		return customer.getFirstName() + " " + customer.getLastName();
	}

	public CustomerDAO getCustomerDao() {
		return customerDao;
	}

	public void setCustomerDao(CustomerDAO customerDao) {
		this.customerDao = customerDao;
	}
}
