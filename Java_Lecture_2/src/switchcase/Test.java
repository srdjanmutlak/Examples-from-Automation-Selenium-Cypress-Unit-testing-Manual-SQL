package switchcase;

public class Test {

	public static void main(String[] args) {
		
		int day = 3;
		
		switch (day) {
		case 1: 
			
			System.out.println("Monday");
			break;
		case 2: 
			System.out.println("Tuesday");
			break;
		case 3: 
			System.out.println("Wednesday");
			break;
		case 4: 
			System.out.println("Thursday");
			break;
		case 5: 
			System.out.println("Friday");
			break;
		case 6: 
			System.out.println("Satuday");
			break;
		case 7: 
			System.out.println("Sunday");
			break;
		default:
			System.out.println("No case matched!"); //za int 8 i navise
		}

	}

}
