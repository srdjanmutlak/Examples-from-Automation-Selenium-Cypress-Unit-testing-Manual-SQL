package pckg3;

public class Sample {

	public static void main(String[] args) {
		
		Test obj = new Test();
		
	//	System.out.println(obj.privateVariable); //posto je private dostupna samo u svojoj klasi, 
//ovde je podvucena crveno
		System.out.println(obj.publicVariable);
		System.out.println(obj.protectedVariable);
		System.out.println(obj.defaultVariable);
		
//ostale su dostupne (u drugoj klasi ali moraju biti u istom paketu)		
	}

}
