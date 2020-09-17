package septmajorproject.bookingsys.bookingTest;

import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.repository.BookingRepository;
import septmajorproject.bookingsys.repository.CustomerRepository;
import septmajorproject.bookingsys.repository.EmployeeRepository;

import javax.xml.validation.Validator;
import java.sql.Time;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BookingRepositoryIntegrationTest {
    @Autowired
    private TestEntityManager testManager;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    private Validator validator;
    private LocalValidatorFactoryBean localValidatorFactory;

    Time time = new Time(12,30,0);
    Date date = new Date(2020,8,27);

    Time time2 = new Time(3,30,0);
    Date date2 = new Date(2020,8,27);

    Time time3 = new Time(9,30,0);
    Date date3 = new Date(2020,9,17);

    Employee emp = new Employee("1234","Bob", "Smith", "bob@smith.com", 39593925, "123 street", "anotherOne", "test");
    Employee emp2 = new Employee("5678","Sarah", "Doe", "sarah@doe.com", 39593925, "123 street", "somethingHere", "test");

    Customer cust = new Customer("Julz", "riz", "test@email.com","123 street","testSomething","04373847545","password","1E");
    Customer cust2 = new Customer("Rufus", "Du Sol","test@email.com", "123 street",  "test", "04373847545", "password","2E");



    @Before
    public void setUp() {
        emp.setServiceNo("1E");
        emp2.setServiceNo("2E");
        customerRepository.save(cust);
        customerRepository.save(cust2);
        employeeRepository.save(emp);
        employeeRepository.save(emp2);

        Booking booking = new Booking(date, time, emp, cust);
        Booking booking2 = new Booking(date2, time2, emp, cust);
        Booking booking3 = new Booking(date3, time3, emp, cust);

//        bookingRepository.save(booking);
//        bookingRepository.save(booking2);
//        bookingRepository.save(booking3);

        testManager.persist(booking);
        testManager.persist(booking2);
        testManager.persist(booking3);

        testManager.flush();

        localValidatorFactory = new LocalValidatorFactoryBean();
        localValidatorFactory.setProviderClass(HibernateValidator.class);
        localValidatorFactory.afterPropertiesSet();

    }

    // Testing find by employee method with a valid employee that has previously had a booking under their name
    @Test
    public void whenFindBookingByValidEmployee_thenAssertTrue() {
        List<Booking> output = bookingRepository.findAllByEmployee(emp);

        boolean foundFlag = false;

        for (Booking book : output) {
            if (book.getEmployee().equals(emp)) {
                foundFlag = true;
            }
        }

        System.out.println(output.size());

        assertTrue(foundFlag);
    }

    // Tests to see if an a specific employee is not found in the repository, as there are no bookings made with them
    @Test
    public void whenFindBookingByNonExistentEmployee_thenAssertFalse() {
        employeeRepository.save(emp2);

        List<Booking> output = bookingRepository.findAllByEmployee(emp2);

        boolean foundFlag = false;

        for (Booking book : output) {
            if (book.getEmployee().equals(emp)) {
                foundFlag = true;
            }
        }

        System.out.println(output);
        System.out.println(output.size());

        assertTrue(!foundFlag);
    }

    // Testing find by employee method with a valid customer that has previously made a booking
    @Test
    public void whenFindBookingByValidCustomer_thenAssertTrue() {
        List<Booking> output = bookingRepository.findAllByCustomer(cust);

        boolean foundFlag = false;

        for (Booking book : output) {
            if (book.getCustomer().equals(cust)) {
                foundFlag = true;
            }
        }

        System.out.println(output.size());

        assertTrue(foundFlag);
    }

    // Tests to see if an a specific customer is not found in the repository, as they made no bookings
    @Test
    public void whenFindBookingByNonExistentCustomer_thenAssertFalse() {
        employeeRepository.save(emp2);

        List<Booking> output = bookingRepository.findAllByCustomer(cust2);

        boolean foundFlag = false;

        for (Booking book : output) {
            if (book.getCustomer().equals(cust2)) {
                foundFlag = true;
            }
        }

        System.out.println(output);
        System.out.println(output.size());

        assertTrue(!foundFlag);
    }

    // Checks if repository returns all bookings made
    @Test
    public void whenFindAllThreeBookingsEntered_thenAssertTrue() {
        List<Booking> output = bookingRepository.findAll();

        System.out.println(output.size());

        assert(output.size() == 3);

    }
}
