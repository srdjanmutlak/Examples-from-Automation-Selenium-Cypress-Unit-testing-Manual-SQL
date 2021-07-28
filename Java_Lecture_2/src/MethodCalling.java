
public class MethodCalling {

	public static void main(String[] args) {
		
		MethodCalling m = new MethodCalling();
		m.go();
		//m.go1();
		
		
		go3();
	}
	
	public static void go3() {
		
		System.out.println("inside Go3 Method");
	}
	public void go() {
		
		System.out.println("Inside Go Method");
		go1();
		go3();
	}
	
	public void go1() {
		
		System.out.println("Inside Go4 Method");
	}

	public void go2() {
	
	System.out.println("Inside Go2 Method");
}

}
