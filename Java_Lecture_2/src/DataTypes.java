
public class DataTypes {
	
	public void show() {
		int a;
		int b;
		String c;
	}
	

	

	public static void main(String[] args) {
		
		/*
		DataTypes data = new DataTypes();
		
		data.show();
		
		Home h = new Home(); //h --> Object --> i = 10
		h.i++; //Object1 --> i = 11;
		
		Home h1 = new Home(); //h1 --> Object2 --> i = 10
		h1.i++; //Object2 --> i = 11;
		
		Home h2 = new Home(); //h1 --> Object3 --> i = 10
		System.out.println(h2.i); //10
		
		int myMinintValue = Integer.MIN_VALUE;
		int myMaxintValue = Integer.MAX_VALUE;
		
		System.out.println("int Minimum Value = " + myMinintValue);
		System.out.println("int Maximum Value = " + myMaxintValue);
		
		byte myMinByteValue = Byte.MIN_VALUE;
		byte myMaxByteValue = Byte.MAX_VALUE;
		
		System.out.println("Byte Minimum Value = " + myMinByteValue);
		System.out.println("Byte Maximum Value = " + myMaxByteValue);
		
		short myMinshortValue = Short.MIN_VALUE;
		short myMaxshortValue = Short.MAX_VALUE;
		
		System.out.println("short Minimum Value = " + myMinshortValue);
		System.out.println("short Maximum Value = " + myMaxshortValue);
		
		int myTotal = (myMinintValue / 2);
		
		byte myNewByteValue = (byte) (myMinByteValue / 2);
		
		short myNewshortValue = (short) (myMinshortValue / 2);

		System.out.println(myNewByteValue);
		*/
		
		Calculator calc = new Calculator();
		int i = calc.getSum(10, 4);
		System.out.println("The sum is : "+i);
		System.out.println(calc.getMult(10, 4));
		System.out.println(calc.getDiv(10, 4));
		System.out.println(calc.getSub(10, 4));

	}

}
