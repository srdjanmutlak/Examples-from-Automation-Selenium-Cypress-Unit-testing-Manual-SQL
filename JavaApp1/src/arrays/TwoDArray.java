package arrays;

public class TwoDArray {

	public static void main(String[] args) {
		
		int[][] myArray= new int [2][3];
		
		myArray [0][0]=1;
		myArray [0][1]=2;
		myArray [0][2]=3;
		
		myArray [1][0]=4;
		myArray [1][1]=5;
		myArray [1][2]=6;
		
//		System.out.println(myArray[1][1]);
//		
//		System.out.println(myArray.length);
//		
//		System.out.println(myArray[0].length); ako hocemo da printujemo duzinu unutar prvog arraya
		
		for (int i=0; i<myArray.length; i++) {
			
			for(int j=0; j<myArray[i].length; j++) {
				
				System.out.print(myArray[i][j]+ " "); //ovde ide print umesto println
			}
			System.out.println(); // ovo pisemo zbog novih redova
		}
		
	}

}
