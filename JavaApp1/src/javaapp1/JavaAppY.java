package javaapp1;

import java.util.Scanner;

public class JavaAppY {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in); //mehanizam ucitavanja informacija sa konzole
		
		System.out.print("Unesite neki broj: ");
		
		double x = s.nextDouble();
		
		double f = Math.sqrt(x);
		
		System.out.println("Kvadratni koren tog broja je: " + f);

	}

}
