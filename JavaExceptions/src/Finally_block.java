
public class Finally_block {

	public static void main(String[] args) {
		
		try {
			
			int i[] = new int[4];
			
			i[5] = 100;
			System.out.println("Close DB Connection in try block");
			
		} catch (Exception e) {
			
			System.out.println("Error occured");
			
		}finally {
			
			
			System.out.println("Closing the DB Connection in finally block");
// finally block will execute all the time			
		}
	}

}
