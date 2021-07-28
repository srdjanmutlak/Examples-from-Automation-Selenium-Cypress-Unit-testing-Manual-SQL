package javaapp1;

import java.util.Scanner;

public class JavaApp1 {

	public static void main(String[] args) {
		
		Scanner s = new Scanner(System.in);
		
		System.out.print("Unesite neki realan broj: ");
		
		double broj = s.nextDouble();
		
		double korenBroja = Math.sqrt(broj);
		
		if (korenBroja == 5.0) {
			System.out.println("Ispravno!");
		} else {
			System.out.println("Nije ispravno!");
		}

		System.out.println("Program je zavrsen!");
	}

}
