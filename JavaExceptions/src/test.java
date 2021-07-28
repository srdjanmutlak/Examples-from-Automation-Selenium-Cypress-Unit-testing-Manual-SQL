
public class test {

	public static void main(String[] args) {
		
		System.out.println("Before try block");
		
		try{
		
		System.out.println("Beginning");
		
		int divide = 10/0;                //proveri sta se desava ako 0 promenimo u 5
		System.out.println(divide);
		
		System.out.println("Ending");
		
		}catch(Exception e) {          //moze i Throwable, to ukljucuje sve greske u javi
			
			System.out.println("Error occured");
			System.out.println(e.getMessage());  // objasnjava e Exception
			e.printStackTrace();  // kaze nam podatke o gresci i u kom redu je napravljena
		}
		System.out.println("After try catch block");
	}

}
