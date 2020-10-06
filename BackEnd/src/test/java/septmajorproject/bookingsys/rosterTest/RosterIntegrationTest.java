package septmajorproject.bookingsys.rosterTest;


import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;

import javax.validation.ConstraintViolation;
import javax.xml.validation.Validator;
import java.sql.Date;
import java.sql.Time;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RosterIntegrationTest {
    private Validator validator;
    private LocalValidatorFactoryBean localValidatorFactoryBean;


    Employee employee = new Employee("EmpIdentity", "Bob", "Smith", "bob@smith.com", 39593925, "123 street", "anotherOne", "test");



    @Before
    public void setUp(){
        localValidatorFactoryBean = new LocalValidatorFactoryBean();
        localValidatorFactoryBean.setProviderClass(HibernateValidator.class);
        localValidatorFactoryBean.afterPropertiesSet();
    }

    @Test
    //testing when the roster without time
    public void whenInsertRosterWithNoTime_thenReturnFalse() {
        Roster nullTimeRoster = new Roster();
        Set<ConstraintViolation<Roster>> constraintViolations = localValidatorFactoryBean.validate(nullTimeRoster);

        assertFalse(constraintViolations.size() == 0, "Time cannot be null");
    }

    @Test
    //testing when the roster is without date
    public void whenInsertRosterWithNoDate_thenReturnFalse(){
        Roster nullDateRoster = new Roster();

        Set<ConstraintViolation<Roster>> constraintViolations = localValidatorFactoryBean.validate(nullDateRoster);

        assertFalse(constraintViolations.size() == 0, "Date cannot be null");
    }

    @Test
    // testing when the entered roster Employee does not exist in the database
    public void whenInsertRosterWithNonExistingEmployee_thenReturnFalse(){
        Roster invalidRoster = new Roster();

        Set<ConstraintViolation<Roster>> constraintViolations = localValidatorFactoryBean.validate((invalidRoster));

        assertFalse(constraintViolations.size() == 0,"Employee required");

    }

    @Test
    //
    public void whenInsertRosterWithExistingEmployee_thenReturnTrue(){
        Roster validRoster = new Roster(employee);

        Set<ConstraintViolation<Roster>> constraintViolations = localValidatorFactoryBean.validate((validRoster));

        assertTrue(constraintViolations.size() == 0);

    }




}
