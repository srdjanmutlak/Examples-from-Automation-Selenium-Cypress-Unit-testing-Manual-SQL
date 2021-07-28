package arrays;

public class ThreeDArray {

	public static void main(String[] args) {
		
		int[][][] array= new int [2][3][4];
		
		for(int i=0; i<array.length; i++) {
			
			for(int j=0; j<array[i].length; j++) {
				
				for(int k=0; k<array[i][j].length; k++) {
					//000
					//001
					
					//000
					//010
					
					
					array[i][j][k] = (int) (Math.random()*1000);
					System.out.print(array[i] [j] [k]+ " "); //ovde ide print umesto println
				}
				System.out.println(); // ovo pisemo zbog novih redova
			}
			System.out.println(); // ovo pisemo zbog novih redova
		}
		
	}

}
