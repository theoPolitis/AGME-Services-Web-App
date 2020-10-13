package septmajorproject.bookingsys.bookingTest;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import septmajorproject.bookingsys.exception.BookingException;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.repository.BookingRepository;
import septmajorproject.bookingsys.repository.CustomerRepository;
import septmajorproject.bookingsys.repository.EmployeeRepository;
import septmajorproject.bookingsys.service.BookingService;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class BookingServiceTest {

    @TestConfiguration
    static class BookingServiceContextConfig {
        @MockBean
        private EmployeeRepository employeeRepository;
        @MockBean
        private CustomerRepository customerRepository;

        @Bean
        public BookingService bookingService(BookingRepository bookingRepository,
                                             EmployeeRepository employeeRepository,
                                             CustomerRepository customerRepository) {
            return new BookingService(bookingRepository, employeeRepository, customerRepository);
        }
    }

    @Autowired
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @Before
    public void setUp(){

        Time time = new Time(12,30,0);
        Date date = new Date(2020,8,27);

        Time time2 = new Time(3,30,0);
        Date date2 = new Date(2020,8,27);

        Time time3 = new Time(9,30,0);
        Date date3 = new Date(2020,9,17);

        Employee emp = new Employee("1234","Bob", "Smith", "bob@smith.com", 39593925, "123 street", "anotherOne", "test");
        Employee emp2 = new Employee("5678","Sarah", "Doe", "sarah@doe.com", 39593925, "123 street", "somethingHere", "test");

        Customer cust = new Customer("test", "test@email.com", "Julz", "riz", "123 street", "04373847545", "testSomething");
        Customer cust2 = new Customer("test", "test@email.com", "Rufus", "Du Sol", "123 street", "04373847545", "Rufus");
        ServiceType serviceType = new ServiceType("1", "haircut","08:00","20:00");
        Booking booking = new Booking(date, time, emp, cust, serviceType);
        Booking booking2 = new Booking(date2, time2, emp, cust, serviceType);
        Booking booking3 = new Booking(date3, time3, emp, cust, serviceType);

        List<Booking> bookingList = new ArrayList<>();

        bookingList.add(booking);
        bookingList.add(booking2);
        bookingList.add(booking3);

        Mockito.when(bookingRepository.findBookingById(booking.getId())).thenReturn(booking);
        Mockito.when(bookingRepository.findAllByCustomer(cust)).thenReturn(bookingList);
        Mockito.when(bookingRepository.findAllByEmployee(emp)).thenReturn(bookingList);
        Mockito.when(bookingRepository.findAll()).thenReturn(bookingList);
    }

    // Test finding a booking with a valid id
    @Test
    public void whenGettingBookingWithValidIdentifier_ThenBookingShouldBeFound(){
        Long id = 0L;

        Booking found = bookingService.findBookingByIdentificationNumber(id);

        assertThat(String.valueOf(found.getId()).equals(id));
    }

    //Test finding a booking with an invalid id (does not exist)
    @Test(expected = BookingException.class)
    public void whenInvalidIdentifier_ThenThrowBookingException() {
        Long id = 453L;

        bookingService.findBookingByIdentificationNumber(id);
    }

    // Test that all bookings returns a list of 3 objects
    @Test
    public void getAllBookings_thenReturnListOfBookings() {
        assertThat(bookingService.getAll().size() == 3);
    }

    // Test deleting a booking with a valid id
    @Test
    public void whenDeletingBookingWithValidIdentifier_ThenSuccessfulDeleteRequest() {
        Long id = 0L;

        bookingService.deleteBookingByIdentifier(id);
    }

    // Test deleting a booking with an invalid id (does not exist)
    @Test(expected = BookingException.class)
    public void whenDeletingBookingWithInvalidIdentifier_ThenThrowBookingException() {
        Long id = 453L;

        bookingService.deleteBookingByIdentifier(id);
    }

}
