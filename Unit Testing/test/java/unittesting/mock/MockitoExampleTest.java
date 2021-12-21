package unittesting.mock;

import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNull;
import static org.testng.Assert.assertTrue;

import java.io.IOException;
import java.util.Iterator;

import org.mockito.Mockito;
import org.testng.annotations.Test;

public class MockitoExampleTest {

	@Test
	public void testSimpleReturnValue() {
		// create mock object
		ExampleClass mockedExampleObject = Mockito.mock(ExampleClass.class);

		// define what happens when exampleFunctionality() method is invoked
		when(mockedExampleObject.exampleFunctionality("Joka")).thenReturn("Hello mock!");

		// use mock in the test
		assertEquals(mockedExampleObject.exampleFunctionality("Joka"), "Hello mock!");
	}
	
	@Test
	public void testSimpleReturnValue2() {
		// create mock object
		ExampleClass mockedExampleObject = Mockito.mock(ExampleClass.class);

		// define what happens when exampleFunctionality() method is invoked
		doReturn("Hello mock!").when(mockedExampleObject).exampleFunctionality("Joka");

		// use mock in the test
		assertEquals(mockedExampleObject.exampleFunctionality("Joka"), "Hello mock!");
	}
	
	@Test(expectedExceptions = IOException.class) // we expect IOException during test execution
	public void testForIOException() throws IOException {
		// create and configure mock object
		ExampleClass mockedExampleObject = mock(ExampleClass.class);

		// it throws IOException when the doSomethingRisky() method is called
		doThrow(new IOException()).when(mockedExampleObject).doSomethingRisky();

		// call mocked method. It will throw IOException
		mockedExampleObject.doSomethingRisky();
	}

	@Test
	public void testMoreThanOneReturnValue() {
		// mocking existing Java class Iterator
		Iterator mockedIterator = Mockito.mock(Iterator.class);

		when(mockedIterator.next()).thenReturn("Hello").thenReturn(" ").thenReturn("testers!");
		String r1 = (String) mockedIterator.next();
		String r2 = (String) mockedIterator.next();
		String r3 = (String) mockedIterator.next();
		String result = r1 + r2 + r3;

		assertEquals(result, "Hello bug-seeders!");
	}
	
	@Test
	public void testCallMethodThatIsNotMocked() {
		// create mock object
		ExampleClass mockedExampleObject = Mockito.mock(ExampleClass.class);

		// mocked method
		when(mockedExampleObject.exampleFunctionality("Joka")).thenReturn("Hello mock!");
		assertEquals(mockedExampleObject.exampleFunctionality("Joka"), "Hello mock!");
		
		// non mocked method
		assertEquals(mockedExampleObject.return12(), 0);
		assertNull(mockedExampleObject.createObject());
	}

	@Test
	public void testReturnValueDependentOnMethodParameter() {
		// mocking existing Java class Comparable
		Comparable c = Mockito.mock(Comparable.class);

		when(c.compareTo("some text")).thenReturn(1);
		when(c.compareTo("some other text")).thenReturn(2);

		assertEquals(c.compareTo("some other text"), 2);
	}

	@Test
	public void testReturnValueInDependentOnMethodParameter() {
		Comparable c = mock(Comparable.class);

		// return 0 for any int parameter
		when(c.compareTo(anyInt())).thenReturn(0);

		assertEquals(0, c.compareTo(9));
	}
	
	@Test
	public void testStringMockEquals() {
		// mocking Java String.equals()d
		String aString = mock(String.class);

		when(aString.equals("unity")).thenReturn(false);

		assertTrue("unity".equals("unity"));
	}

}
