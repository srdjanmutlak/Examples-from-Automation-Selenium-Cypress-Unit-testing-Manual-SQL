package unittesting.mock;

import org.mockito.Mockito;
import org.testng.annotations.Test;

import static org.mockito.Mockito.*;
import static org.testng.Assert.*;

import java.util.ArrayList;

public class SpyTest {

	@Test
	public void SpyTest() {
		// spy Java ArrayList class
		ArrayList<String> list = new ArrayList<String>() {{
				add("one");
				add("two");
		}};
		
		ArrayList spy = spy(list);
		
		// call ArrayList real methods
		System.out.println("list.get(1) is " + list.get(1));
		System.out.println("spy.get(1) is " + spy.get(1));

		// returns "foo" when called get(1) on spy object
		doReturn("foo").when(spy).get(1);
		
		System.out.println("spy.get(1) is " + spy.get(1));
		
		assertEquals(spy.get(1), "foo");
	}
	
	@Test
	public void testCallMethodThatIsNotMocked() {
		// create spy object
		ExampleClass test = Mockito.spy(ExampleClass.class);

		// mocked method
		when(test.exampleFunctionality("Joka")).thenReturn("Hello mock!");
		assertEquals(test.exampleFunctionality("Joka"), "Hello mock!");
		
		// non mocked method
		assertNotEquals(test.return12(), 0);
		assertNotNull(test.createObject());
	}
}
