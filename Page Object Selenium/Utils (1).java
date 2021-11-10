package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Utils klasa sadrzi helper funkcije koje se koriste na vise mesta u page
 * klasama. Na ovaj nacin su delovi koje se ponavljaju izvuceni na jedno mesto.
 * Sve metode su staticke, tako da se mogu pozivati bez instanciranja sama
 * klase.
 * 
 * @author mkondic
 *
 */
public class Utils {

	/**
	 * 
	 * This function will check element presence
	 * 
	 * @param webdriver
	 * @param selector
	 * 
	 */
	public static boolean isPresent(WebDriver webdriver, By selector) {
		// try to find element by specified selector
		try {
			webdriver.findElement(selector);
		} catch (NoSuchElementException e) {
			// if element not exist return false
			return false;
		}
		return true;
	}

	/**
	 * Metoda ceka da element sa prosledjenim selektorom postan klikabilan
	 * (displayed and enabled)
	 * 
	 * @param driver       - web driver
	 * @param selector     - selektor elementa koji cekamo
	 * @param waitInterval - vreme koje ce driver da ceka da se element pojavi u DOM
	 *                     stablu
	 * @return WebElement selektovani element
	 */
	public static WebElement waitToBeClickable(WebDriver driver, By selector, int waitInterval) {
		WebElement element = (new WebDriverWait(driver, waitInterval))
				.until(ExpectedConditions.elementToBeClickable(selector));
		return element;
	}

	/**
	 * Metoda ceka da se element sa prosledjenim selektorom pojavi u DOM stablu
	 * 
	 * @param driver       - web driver
	 * @param selector     - selektor elementa cije prisustvo cekamo
	 * @param waitInterval - vreme koje ce driver da ceka da se element pojavi u DOM
	 *                     stablu
	 * @return WebElement selektovani element
	 */
	public static WebElement waitForElementPresence(WebDriver driver, By selector, int waitInterval) {
		WebElement element = (new WebDriverWait(driver, waitInterval))
				.until(ExpectedConditions.presenceOfElementLocated(selector));
		return element;
	}

	/**
	 * Metoda ceka da se element sa prosledjenim selektorom postane vidljiva i
	 * enable-ovana u DOM stablu
	 * 
	 * @param driver       - web driver
	 * @param selector     - selektor elementa cije prisustvo cekamo
	 * @param waitInterval - vreme koje ce driver da ceka da se element pojavi u DOM
	 *                     stablu
	 * @return WebElement selektovani element
	 */
	public static WebElement waitForElementVisibility(WebDriver driver, By selector, int waitInterval) {
		WebElement element = (new WebDriverWait(driver, waitInterval))
				.until(ExpectedConditions.visibilityOfElementLocated(selector));
		return element;
	}

	/**
	 * Metoda ceka da naslov stranice postane jednak prosledjenom stringu
	 * 
	 * @param driver
	 * @param title        - naslov koji cekamo
	 * @param waitInterval - vreme koje ce driver da ceka da se element pojavi u DOM
	 *                     stablu
	 */
	public static boolean waitForTitle(WebDriver driver, String title, int waitInterval) {
		return (new WebDriverWait(driver, waitInterval)).until(ExpectedConditions.titleIs(title));
	}

	/**
	 * Metoda ceka da url stranice postane jednak prosledjenom stringu
	 * 
	 * @param driver
	 * @param url          - url koji cekamo
	 * @param waitInterval - vreme koje ce driver da ceka da se element pojavi u DOM
	 *                     stablu
	 */
	public static boolean waitForUrl(WebDriver driver, String url, int waitInterval) {
		return (new WebDriverWait(driver, waitInterval)).until(ExpectedConditions.urlToBe(url));
	}

}
