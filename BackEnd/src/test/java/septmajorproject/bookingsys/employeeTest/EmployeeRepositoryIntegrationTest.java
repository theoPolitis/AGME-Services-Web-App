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

import javax.xml.validation.Validator;

import static org.assertj.core.api.Assertions.assertThat;

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
    public void setUp() {
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
    public void whenFindEmployeeByName_thenReturnEmployee() {
        Employee foundEmployee = employeeRepository.findByFirstName("Alex");

        assertThat(foundEmployee.getFirstName().equals("Alex"));
    }

    //finds user by username
    @Test
    public void whenFindByEmployeeUsernam_thenReturnEmployee() {
        Employee foundEmployee = employeeRepository.findByUserName("s3661674");

        assertThat(foundEmployee.getFirstName().equals("Leigh"));
    }

    //looks for an employee in databse that doesnt exist with firstName
    @Test
    public void whenEmployeeDoesNotExistWithFirstName_thenReturnNull() {
        Employee foundEmployee = employeeRepository.findByFirstName("sam");

        assertThat(foundEmployee == null);
    }

    //user doesnt exist with provided username
    @Test
    public void whenEmployeeDoesntExistWithUserName(){
        Employee foundEmployee = employeeRepository.findByUserName("s");

        assertThat(foundEmployee == null);
    }
}