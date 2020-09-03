package septmajorproject.bookingsys.rosterTest;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.model.RosterPK;
import septmajorproject.bookingsys.repository.EmployeeRepository;
import septmajorproject.bookingsys.repository.RosterRepository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RosterRepositoryIntegrationTest {

    Employee employeeOne = new Employee("1234", "Alex", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");
    Employee employeeTwo = new Employee("5678", "Alma", "Tests", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");
    Employee employeeThree = new Employee("3456", "Sam", "Rizzo", "s3661@student.rmit.edu.au", 0424735213, "Something", "s3661673", "password");

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RosterRepository rosterRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    //generate the test data in this part
    @Before
    public  void setUp(){

        Roster rosterOne = new Roster(employeeOne,(new RosterPK((new Date(2020,8,27)),(new Time(12,30,0)))));
        Roster rosterTwo = new Roster(employeeOne,(new RosterPK((new Date(2020,8,28)),(new Time(12,30,0)))));
        Roster rosterThree = new Roster(employeeOne,(new RosterPK((new Date(2020,8,29)),(new Time(12,30,0)))));
        Roster rosterFour = new Roster(employeeTwo,(new RosterPK((new Date(2020,8,30)),(new Time(12,30,0)))));
        Roster rosterFive = new Roster(employeeTwo,(new RosterPK((new Date(2020,8,31)),(new Time(12,30,0)))));

        testEntityManager.persist(employeeOne);
        testEntityManager.persist(rosterOne);
        testEntityManager.persist(rosterTwo);
        testEntityManager.persist(rosterThree);

        testEntityManager.flush();

    }

    @Test
    public void findAllRostersForTheEmployee_returnListRoster(){

        List<Roster> rosterList = rosterRepository.findAllByEmployee(employeeOne);

        assertThat(rosterList.size() == 3);
    }

    @Test
    public void findAllRostersForNonExistingEmployee_returnNull()
    {

        List<Roster> rosterList = rosterRepository.findAllByEmployee(employeeThree);

        assertThat(rosterList.size() == 0);

    }

    @Test
    public void getAllRosters_returnListOfRosters()
    {
        List<Roster> rosterList = rosterRepository.findAll();

        assertThat(rosterList.size() == 5);
    }

    @Test
    public void getAllRosterByEmployeeId_returnListOfRosters(){
        List<Roster> rosterList = rosterRepository.getAllByEmployeeId(employeeOne.getEmployeeIdentifier());

        assertThat(rosterList.size() == 3);
    }

    @Test
    public void getAllRosterByNonExistingEmployeeId_returnNull(){
        List<Roster> rosterList = rosterRepository.getAllByEmployeeId(employeeOne.getEmployeeIdentifier());

        assertThat(rosterList.size() == 0);
    }

}

