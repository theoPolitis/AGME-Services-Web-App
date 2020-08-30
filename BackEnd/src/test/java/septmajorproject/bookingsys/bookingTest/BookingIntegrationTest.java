package septmajorproject.bookingsys.bookingTest;


import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.BookingPK;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;

import javax.validation.ConstraintViolation;
import javax.xml.validation.Validator;
import java.sql.Time;
import java.util.Date;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BookingIntegrationTest {

    private Validator validator;
    private LocalValidatorFactoryBean localValidatorFactory;

    @Before
    public void setUp() {
        localValidatorFactory = new LocalValidatorFactoryBean();
        localValidatorFactory.setProviderClass(HibernateValidator.class);
        localValidatorFactory.afterPropertiesSet();
    }

    @Test
    public void whenInsertBookingWithValidValues_thenReturnTrue(){

        Time time = new Time(12,30,0);
        Date date = new Date(2020,8,27);

        BookingPK pk = new BookingPK(date, time);
        Employee emp = new Employee("Bob", "Smith", "bob@smith.com", 39593925, "123 street", "anotherOne", "test");
        Customer cust = new Customer("test", "test@email.com", "Julz", "riz", "123 street", "04373847545", "testSomething");

        Booking booking = new Booking(pk, emp, cust);

        Set<ConstraintViolation<Booking>> constraintViolations = localValidatorFactory.validate(booking);

        // assertTrue(constraintViolations.size() == 0, "Enter a Valid first name that is greater than three characters.");
    }

}
