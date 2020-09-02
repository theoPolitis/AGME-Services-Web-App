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
import septmajorproject.bookingsys.model.RosterPK;

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

    Time time = new Time(12,30,0);
    Date date = new Date(2020,8,27);

    RosterPK rosterPK = new RosterPK(date, time);
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
        RosterPK nullTimePK = new RosterPK();
        nullTimePK.setRosterDate(date);

        Set<ConstraintViolation<RosterPK>> constraintViolations = localValidatorFactoryBean.validate(nullTimePK);

        assertFalse(constraintViolations.size() == 0, "Time cannot be null");
    }

    @Test
    //testing when the roster is without date
    public void whenInsertRosterWithNoDate_thenReturnFalse(){
        RosterPK nullDatePK = new RosterPK();
        nullDatePK.setRosterTime(time);

        Set<ConstraintViolation<RosterPK>> constraintViolations = localValidatorFactoryBean.validate(nullDatePK);

        assertFalse(constraintViolations.size() == 0, "Date cannot be null");
    }

    @Test
    // testing when the entered roster Employee does not exist in the database
    public void whenInsertRosterWithNonExistingEmployee_thenReturnFalse(){

    }

    @Test
    //
    public void whenInsertRosterWithExistingEmployee_thenReturnTrue(){

    }




}
