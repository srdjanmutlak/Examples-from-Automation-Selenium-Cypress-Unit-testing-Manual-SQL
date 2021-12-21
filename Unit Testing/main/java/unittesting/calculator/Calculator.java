package unittesting.calculator;

public class Calculator {
	
	private static int result;      // Statička promenljiva za smeštanje rezultata
	
	public void add(int n) {
		result = result + n;
	}
	
	public void substract(int n) {  // Greška: trebalo bi result = result - n
		result = result - 1;      
	}
	
	public void multiply(int n) {   // nije jos spremno za testiranje
	}
	
	public void divide(int n) {
		result = result / n;
	}
	
	public void square(int n) {
		result = n * n;
	}
	
	public void squareRoot(int n) {  // Greška: mrtva petlja
		for (; ;) ;                 
	}
	
	public void clear() {            // Postavlja rezultat na nulu   
		result = 0;
	}
	
	public void switchOn() {         // Početak korišćenja kalkulatora
		result = 0;
	}
	
	public void switchOff() {        // Kraj korišćenja kalkulatora
	
	}
	
	public int getResult() {
		return result;
	}  

}
