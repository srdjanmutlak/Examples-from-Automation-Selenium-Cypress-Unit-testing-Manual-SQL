package javaapp1;

import java.util.Scanner;

public class JavaAppX {

	public static void main(String[] args) {
		
		Scanner s = new Scanner(System.in);
		
		// Funkcija F(x, y) = x*y  /  1-x  +  3
		
		System.out.print("Unesite x i y vrednosti: ");
		
		double x = s.nextDouble();
		double y = s.nextDouble();
		
		double f = x*y / (1-x) + 3;
		
		System.out.println("F(x,y) = " + f);
		
		// Sta ima prednost:
		// ( i )
		// * / + -
		
	}

}
