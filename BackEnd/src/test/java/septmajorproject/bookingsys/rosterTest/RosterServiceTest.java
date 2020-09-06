package septmajorproject.bookingsys.rosterTest;

import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.MockitoPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.TestConstructor;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import septmajorproject.bookingsys.exception.RosterException;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.repository.RosterRepository;
import septmajorproject.bookingsys.service.RosterService;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RosterServiceTest {

    @TestConfiguration
    class RosterServiceContextConfig{
        @Bean
        public RosterService rosterService(){
            return new RosterService();
        }
    }

    @Autowired
    private RosterService rosterService;

    @MockBean
    private RosterRepository rosterRepository;

    @Before
    public void setUp(){

        Employee employeeOne = new Employee("1234", "Alex", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");
        Employee employeeTwo = new Employee("5678", "Alma", "Tests", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");
        Employee employeeThree = new Employee("3456", "Sam", "Rizzo", "s3661@student.rmit.edu.au", 0424735213, "Something", "s3661673", "password");

        Roster rosterOne = new Roster(employeeOne,(new Date(2020,8,27)),(new Time(12,30,0)));
        Roster rosterTwo = new Roster(employeeOne,(new Date(2020,8,28)),(new Time(12,30,0)));
        Roster rosterThree = new Roster(employeeOne,(new Date(2020,8,29)),(new Time(12,30,0)));
//        Roster rosterFour = new Roster(employeeTwo,(new Date(2020,8,30)),(new Time(12,30,0)));
//        Roster rosterFive = new Roster(employeeTwo,(new Date(2020,8,31)),(new Time(12,30,0)));

        List<Roster> rosterListAll = new ArrayList<>();

        rosterListAll.add(rosterOne);
        rosterListAll.add(rosterTwo);
        rosterListAll.add(rosterThree);
//        rosterListAll.add(rosterFour);
//        rosterListAll.add(rosterFive);

        Mockito.when(rosterRepository.findAll()).thenReturn(rosterListAll);
        Mockito.when(rosterRepository.findAllByEmployee(employeeOne)).thenReturn(rosterListAll);
        Mockito.when(rosterRepository.findRosterById(String.valueOf(rosterOne.getId()))).thenReturn(rosterOne);

    }

    @Test
    public void whenGettingRosterWithValidIdentifier_thenRosterShouldBeFound(){
        String id = "0";

        Roster rosterFound = rosterService.findRosterByIdentificationNumber(id);

        assertTrue(String.valueOf(rosterFound.getId()).equals(id));
    }

    @Test(expected = RosterException.class)
    public void whenInvalidIdentifier_ThenThrowBookingException() {
        String id = "453";

        rosterService.findRosterByIdentificationNumber(id);
    }

    @Test
    public void getAllRoster_thenReturnListOfRosters(){
        assert(rosterService.getAll().size() == 3);
    }

    @Test
    public void whenDeletingRosterWithValidIdentifier_thenSuccessfulDeleteRequest(){
        String id = "0";

        rosterService.deleteRosterByIdentifier(id);
    }


}

