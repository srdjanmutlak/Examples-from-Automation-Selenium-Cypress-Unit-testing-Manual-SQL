
public class Array_exception {

	public static void main(String[] args) {
		
		System.out.println("Beginning");
		
		try {
		
		int i[] = new int[4];
		
		i[5] = 100;
		} catch (Exception e) {
			System.out.println("Error occured");
			
			e.printStackTrace();
		}
		
		System.out.println("Ending");
		
		
	}

}
