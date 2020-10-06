package septmajorproject.bookingsys.rosterTest;


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
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.repository.EmployeeRepository;
import septmajorproject.bookingsys.repository.RosterRepository;

import javax.xml.validation.Validator;
import java.sql.Date;
import java.sql.Time;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RosterRepositoryTest {

    Employee employeeOne = new Employee("1234", "Alex", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");
    Employee employeeTwo = new Employee("5678", "Alma", "Tests", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");
    Employee employeeThree = new Employee("3456", "Sam", "Rizzo", "s3661@student.rmit.edu.au", 0424735213, "Something", "s3661673", "password");

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RosterRepository rosterRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    private Validator validator;
    private LocalValidatorFactoryBean localValidatorFactory;

    //generate the test data in this part
    @Before
    public  void setUp(){
        employeeOne.setServiceNo("1E");
        employeeTwo.setServiceNo("2E");
        employeeThree.setServiceNo("3E");
        employeeRepository.save(employeeOne);
        employeeRepository.save(employeeTwo);
        employeeRepository.save(employeeThree);

        Roster rosterOne = new Roster(employeeOne);
        Roster rosterTwo = new Roster(employeeOne);
        Roster rosterThree = new Roster(employeeOne);
        Roster rosterFour = new Roster(employeeTwo);
        Roster rosterFive = new Roster(employeeTwo);

        testEntityManager.persist(employeeOne);
        testEntityManager.persist(rosterOne);
        testEntityManager.persist(rosterTwo);
        testEntityManager.persist(rosterThree);
        testEntityManager.persist(rosterFour);
        testEntityManager.persist(rosterFive);

        testEntityManager.flush();

        localValidatorFactory = new LocalValidatorFactoryBean();
        localValidatorFactory.setProviderClass(HibernateValidator.class);
        localValidatorFactory.afterPropertiesSet();

    }

    @Test
    public void findAllRostersForTheEmployee_returnListRoster(){

        List<Roster> rosterList = rosterRepository.findAllByEmployee(employeeOne);

        assertTrue(rosterList.size() == 3);
    }

    @Test
    public void findAllRostersForNonExistingEmployee_returnNull()
    {

        List<Roster> rosterList = rosterRepository.findAllByEmployee(employeeThree);

        assert(rosterList.size() == 0);

    }

    @Test
    public void getAllRosters_returnListOfRosters()
    {
        List<Roster> rosterList = rosterRepository.findAll();

        assert(rosterList.size() == 5);
    }

    @Test
    public void findAllRostersOnTable_thenAssertTrue(){
        List<Roster> rosterList = rosterRepository.findAll();

        assertTrue(rosterList.size() == 5);
    }

//    @Test
//    public void getAllRosterByEmployeeId_returnListOfRosters(){
//        List<Roster> rosterList = rosterRepository.);
//
//        assertThat(rosterList.size() == 3);
//    }
//
//    @Test
//    public void getAllRosterByNonExistingEmployeeId_returnNull(){
//        List<Roster> rosterList = rosterRepository.getAllByEmployeeId(employeeOne.getEmployeeIdentifier());
//
//        assertThat(rosterList.size() == 0);
//    }

}

