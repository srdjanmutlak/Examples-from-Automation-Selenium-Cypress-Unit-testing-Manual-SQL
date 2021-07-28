package pckg4;

import pckg3.Test;

public class Sample extends Test {

	public static void main(String[] args) {
		
		//Inheritance - one class object will inherit other class properties
		//extends, implements
		
		Sample obj = new Sample ();
		
		System.out.println(obj.privateVariable);
		System.out.println(obj.publicVariable); // samo je public dostupna u novom paketu, ostale su podvucene crveno
		System.out.println(obj.protectedVariable); //protected  moze postati dostupna u drugom paketu ako 
//koristimo inheritance - dodamo extends Test i promenimo Test obj = new Test (); u Sample obj = new Sample ();
		System.out.println(obj.defaultVariable);
		
		Sample s = new Sample();
		System.out.println(s.publicVariable);
	}

}
