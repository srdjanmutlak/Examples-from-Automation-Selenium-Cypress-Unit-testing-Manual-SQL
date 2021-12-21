package unittesting.book;

import java.util.Collections;
import java.util.List;

/**
* API layer for persisting and retrieving the Book objects.
*/
public class BookDAO {

  private static BookDAO bookDAO = new BookDAO();

  public List<Book> getAllBooks(){
      return Collections.emptyList();
  }

  public Book getBook(String isbn){
      return null;
  }

  public String addBook(Book book){
      return book.getIsbn();
  }

  public String updateBook(Book book){
      return book.getIsbn();
  }

  public static BookDAO getInstance(){
      return bookDAO;
  }
}
