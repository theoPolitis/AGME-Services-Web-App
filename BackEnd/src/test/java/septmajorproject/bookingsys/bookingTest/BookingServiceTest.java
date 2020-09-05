package septmajorproject.bookingsys.bookingTest;


import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.repository.BookingRepository;
import septmajorproject.bookingsys.service.BookingService;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
public class BookingServiceTest {

    @TestConfiguration
    static class BookingServiceContextConfig {
        @Bean
        public BookingService bookingService() {
            return new BookingService();
        }
    }

    @Autowired
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @Before
    public void setUp(){

//        Time time = new Time(12,30,0);
//        Date date = new Date(2020,8,27);
//
//        Time time2 = new Time(3,30,0);
//        Date date2 = new Date(2020,8,27);
//
//        Time time3 = new Time(9,30,0);
//        Date date3 = new Date(2020,9,17);
//
//        Employee emp = new Employee("Bob", "Smith", "bob@smith.com", 39593925, "123 street", "anotherOne", "test");
//        Employee emp2 = new Employee("Sarah", "Doe", "sarah@doe.com", 39593925, "123 street", "somethingHere", "test");
//
//        Customer cust = new Customer("test", "test@email.com", "Julz", "riz", "123 street", "04373847545", "testSomething");
//        Customer cust2 = new Customer("test", "test@email.com", "Rufus", "Du Sol", "123 street", "04373847545", "Rufus");
//
//        Booking booking = new Booking(date, time, emp, cust);
//        Booking booking2 = new Booking(date2, time2, emp, cust);
//        Booking booking3 = new Booking(date3, time3, emp, cust);
//
//        List<Booking> bookingList = new ArrayList<>();
//
//        bookingList.add(booking);
//        bookingList.add(booking2);
//        bookingList.add(booking3);
//
//        Mockito.when(bookingRepository.findAllByCustomer(cust)).thenReturn(bookingList);
//        Mockito.when(bookingRepository.findAllByEmployee(emp)).thenReturn(bookingList);
//        Mockito.when(bookingRepository.findAll()).thenReturn(bookingList);


    }

}
