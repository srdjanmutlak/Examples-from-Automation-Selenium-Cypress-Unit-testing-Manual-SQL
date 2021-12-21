package unittesting.parcijalni;

import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.mockito.Mockito;
import org.omg.CosNaming.NamingContextPackage.NotFound;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import org.testng.annotations.BeforeSuite;


public class Zadatak1 {
	
	private TehnicalInspection tehnicalInspection;
	private CarRepository mockedCarRepository;
	
	@BeforeMethod
	@BeforeSuite
	public void setUp() {
		
		tehnicalInspection = new TehnicalInspection();
		mockedCarRepository = Mockito.mock(CarRepository.class);
		tehnicalInspection.setCarRepository(mockedCarRepository);
	}
	
	@Test
	public void needCarSeviceTest1() throws NotFound {
		
		Car car = new Car();
		car.setCurrentMileage(9999);
		
		when(mockedCarRepository.findByChassisNumber("11111111111111111")).thenReturn(car);
		
		String actual = tehnicalInspection.needCarService("11111111111111111");
		
		assertEquals(actual, "Bez servisa");
	}
	
	@Test
	public void needCarSeviceTest2() throws NotFound {
		
		Car car = new Car();
		car.setCurrentMileage(10000);
		
		when(mockedCarRepository.findByChassisNumber("11111111111111111")).thenReturn(car);
		
		String actual = tehnicalInspection.needCarService("11111111111111111");
		
		assertEquals(actual, "Mali servis");
	}
	
	@Test
	public void needCarSeviceTest3() throws NotFound {
		
		Car car = new Car();
		car.setCurrentMileage(50000);
		
		when(mockedCarRepository.findByChassisNumber("11111111111111111")).thenReturn(car);
		
		String actual = tehnicalInspection.needCarService("11111111111111111");
		
		assertEquals(actual, "Mali servis");
	}
	
	@Test
	public void needCarSeviceTest4() throws NotFound {
		
		Car car = new Car();
		car.setCurrentMileage(90000);
		
		when(mockedCarRepository.findByChassisNumber("11111111111111111")).thenReturn(car);
		
		String actual = tehnicalInspection.needCarService("11111111111111111");
		
		assertEquals(actual, "Veliki servis");
	}
	
	@Test (expectedExceptions = NotFound.class)
	public void needCarSeviceNotFoundTest() throws NotFound {
		
		// mokujemo iako findByChassisNumber svakako vraca null
		
		when(mockedCarRepository.findByChassisNumber("11111111111111111")).thenReturn(null);
		
		tehnicalInspection.needCarService("11111111111111111");
		
	}
	
	@Test (expectedExceptions = IllegalArgumentException.class)
	public void needCarSeviceIllegalArgumentExceptionTest1() throws NotFound {
		
		// mokujemo iako findByChassisNumber svakako vraca null
		
		when(mockedCarRepository.findByChassisNumber("111111111111111111")).thenReturn(null);
		
		tehnicalInspection.needCarService("111111111111111111");
		
	}
	
	@Test (expectedExceptions = IllegalArgumentException.class)
	public void needCarSeviceIllegalArgumentExceptionTest2() throws NotFound {
		
		// mokujemo iako findByChassisNumber svakako vraca null
		
		when(mockedCarRepository.findByChassisNumber("1111111111111111")).thenReturn(null);
		
		tehnicalInspection.needCarService("1111111111111111");
		
	}

}
