package septmajorproject.bookingsys.employeeTest;

import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.repository.EmployeeRepository;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.ValidatorFactory;
import javax.xml.validation.Validator;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.util.AssertionErrors.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class EmployeeRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager testManager;

    @Autowired
    private EmployeeRepository employeeRepository;

    private Validator validator;
    private LocalValidatorFactoryBean localValidatorFactory;


    //generates test data and constructs testing objects
    @Before
    public void setUp(){
        Employee newEmployeeOne = new Employee("Alex", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");
        Employee newEmployeeTwo = new Employee("Tom", "Anthont", "s36@student.rmit.edu.au", 0424735214, "Something", "s3661672", "password");
        Employee newEmployeeThree = new Employee("Sam", "Rizzo", "s3661@student.rmit.edu.au", 0424735213, "Something", "s3661673", "password");
        Employee newEmployeeFour = new Employee("Leigh", "Dean", "s36616@student.rmit.edu.au", 0424735211, "Something", "s3661674", "password");

        testManager.persist(newEmployeeOne);
        testManager.persist(newEmployeeTwo);
        testManager.persist(newEmployeeThree);
        testManager.persist(newEmployeeFour);

        testManager.flush();

        localValidatorFactory = new LocalValidatorFactoryBean();
        localValidatorFactory.setProviderClass(HibernateValidator.class);
        localValidatorFactory.afterPropertiesSet();

    }

    //finds employee by firstName
    @Test
    public void whenFindEmployeeByName_thenReturnEmployee(){
        Employee foundEmployee = employeeRepository.findByFirstName("Alex");

        assertThat(foundEmployee.getFirstName().equals("Alex"));
    }

    //finds user by username
    @Test
    public void whenFindByEmployeeUsernam_thenReturnEmployee(){
        Employee foundEmployee = employeeRepository.findByUserName("s3661674");

        assertThat(foundEmployee.getFirstName().equals("Leigh"));
    }

    //looks for an employee in databse that doesnt exist
    @Test
    public void whenEmployeeDoesNotExist_thenReturnNull(){
        Employee foundEmployee = employeeRepository.findByFirstName("sam");

        assertThat(foundEmployee == null);
    }

    //testing employee firstName with lest then three character
    @Test
    public void whenInsertEmployeeFirstNameWithWrongSize_thenReturnFalse(){
        Employee newEmployee = new Employee("A", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);

        assertFalse(constraintViolations.size() == 0, "Enter a Valid first name that is greater than three characters.");
    }

    //testing what happens if the firstname is greater than three charcters
    @Test
    public void whenInsertFisrtNameGreaterThanThreeCharacter_thenReturnTrue(){
        Employee newEmployee = new Employee("AAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertTrue( " ", constraintViolations.size() == 0);
    }

    //testing what happens iof the lastname is les than three charcters
    @Test
    public void whenInsertLastnameLessThanThreeCharcters_thenReturnFalse(){
        Employee newEmployee = new Employee("A", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertFalse(constraintViolations.size() == 0, "Enter a Valid first name that is greater than two characters.");
    }

    //testing what happens if the last name is greater than three charcters
    @Test
    public void whenInsertLastnameGreaterThanThreeCharcters_thenReturnTrue(){
        Employee newEmployee = new Employee("AAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertTrue( " ", constraintViolations.size() == 0);
    }

    //testing what happens if the firstname is blank
    @Test
    public void insertFirstNameThatIsBlank_thenReturnFalse(){
        Employee newEmployee = new Employee("", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertFalse(constraintViolations.size() == 0, "firstName must not be blank.");
    }

    //testing what happens if the lastname is blank
    @Test
    public void insertLastNameThatIsBlank_theReturnTrue(){
        Employee newEmployee = new Employee("AAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertTrue( " ", constraintViolations.size() == 0);
    }

    //testing what happens when email is blank
    @Test
    public void insertEmailThatIsBlank_ThenReturnFalse(){
        Employee newEmployee = new Employee("AAAA", "Test", "", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertFalse(constraintViolations.size() == 0, "Email must not be blank.");
    }

    //testing what happens when the email is not blank
    @Test
    public void insertEmailThatIsNotBlank_thenReturnTrue(){
        Employee newEmployee = new Employee("AAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertTrue( " ", constraintViolations.size() == 0);
    }

    //testing what happens if the address is blank
    @Test
    public void insertAddressThatIsBlank_thenReturnFalse(){
        Employee newEmployee = new Employee("AAAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertFalse(constraintViolations.size() == 0, "Address must not be blank.");
    }

    //testing that the address is not blank
    @Test
    public void insertAddressThatIsNotBlank_thenReturnTrue(){
        Employee newEmployee = new Employee("AAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertTrue( " ", constraintViolations.size() == 0);
    }

    //testing to see if the username is blank
    @Test
    public void insertUserNameThatIsBlank_thenReturnFalse(){
        Employee newEmployee = new Employee("AAAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertFalse(constraintViolations.size() == 0, "Username must not be blank");
    }

    //testing to see if the username is blank
    @Test
    public void insertUserNameThatIsNotBlank_thenReturnTrue(){
        Employee newEmployee = new Employee("AAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertTrue( " ", constraintViolations.size() == 0);
    }

    //testing what happens if the password is empty
    @Test
    public void insertPasswordThatIsBlank_thenReturnFalse(){
        Employee newEmployee = new Employee("AAAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertFalse(constraintViolations.size() == 0, "Password must not be blank");
    }

    //testing the password is not empty
    @Test
    public void insertPasswordThatIsNotBlank_thenReturnTrue(){
        Employee newEmployee = new Employee("AAA", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Set<ConstraintViolation<Employee>> constraintViolations = localValidatorFactory.validate(newEmployee);
        assertTrue( " ", constraintViolations.size() == 0);
    }
}
