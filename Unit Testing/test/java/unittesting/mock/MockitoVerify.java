package unittesting.mock;

import org.mockito.InOrder;
import org.mockito.Matchers;
import org.mockito.Mockito;
import org.mockito.verification.VerificationMode;
import org.testng.annotations.Test;

import static org.mockito.Mockito.*;

import java.io.IOException;

public class MockitoVerify {

	@Test
	public void testVerify()  {
	  // create and configure mock
	  ExampleClass test = Mockito.mock(ExampleClass.class);
	  
	  when(test.return12()).thenReturn(43);
	 	  
	  // test some methods
	  test.exampleFunctionality("master");
	  test.return12();
	  test.return12();
	  
	  //verify method calls
	  
	  // verify have we called exampleFunctionality with a parameter starting with "master"
	  verify(test).exampleFunctionality(Matchers.startsWith("master"));
	  
	  // verify have we called method return12() twice
	  verify(test, times(2)).return12();
	  
	  //other verifications
	  verify(test, never()).getSignature();
	  verify(test, times(0)).getSignature();
	  verify(test, atLeastOnce()).exampleFunctionality("master");
	  	  
//	  verify(mock, atLeast(2)).someMethod(params);  
//	  verify(mock, atMost(5)).someMethod(params);
	}
	
	@Test
	public void testVerifyNoMoreInteractions()  {
	  // create and configure mock
	  ExampleClass test = Mockito.mock(ExampleClass.class);
	  
	  // test some methods
	  test.exampleFunctionality("master");
	  //test.return12();
	  
	  //verify method calls
	  verify(test).exampleFunctionality("master");
	  verifyNoMoreInteractions(test);
	}
	
	@Test
	public void testVerifyInOrder() throws IOException  {
	  // create and configure mock
	  ExampleClass test = Mockito.mock(ExampleClass.class);
	  
	  // test some methods
	  test.exampleFunctionality("master");
	  test.return12();
	  test.doSomethingRisky();
	  test.doSomethingRisky();
	  
	  //verify method calls orders
	  InOrder inOrder= Mockito.inOrder(test);
	  inOrder.verify(test).exampleFunctionality(anyString());
	  inOrder.verify(test).return12();
	  inOrder.verify(test, times(2)).doSomethingRisky();
	}
}
