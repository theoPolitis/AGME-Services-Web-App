package septmajorproject.bookingsys.rosterTest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import septmajorproject.bookingsys.exception.RosterException;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.repository.RosterRepository;
import septmajorproject.bookingsys.service.RosterService;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RosterServiceTest {

    @TestConfiguration
    static class RosterServiceContextConfig{
        @Bean
        public RosterService rosterService(){
            return new RosterService();
        }
    }

    private long identifier;

    @Autowired
    private RosterService rosterService;

    @MockBean
    private RosterRepository rosterRepository;

    @Before
    public void setUp(){

        Employee employeeOne = new Employee("1234", "Alex", "Test", "s3661671@student.rmit.edu.au", "0424735215", "Something", "s3661671", "password");

        Roster rosterOne = new Roster(employeeOne);
        Roster rosterTwo = new Roster(employeeOne);
        Roster rosterThree = new Roster(employeeOne);

        List<Roster> rosterListAll = new ArrayList<>();

        rosterListAll.add(rosterOne);
        rosterListAll.add(rosterTwo);
        rosterListAll.add(rosterThree);
        identifier = rosterOne.getId();
        Mockito.when(rosterRepository.findAll()).thenReturn(rosterListAll);
        Mockito.when(rosterRepository.findAllByEmployee(employeeOne)).thenReturn(rosterListAll);
        Mockito.when(rosterRepository.findRosterById(rosterOne.getId())).thenReturn(rosterOne);

    }

    @Test
    public void whenGettingRosterWithValidIdentifier_thenRosterShouldBeFound(){

        Roster rosterFound = rosterService.findRosterByIdentificationNumber(identifier);

        assertTrue(rosterFound.getId() == identifier);
    }

    @Test(expected = RosterException.class)
    public void whenInvalidIdentifier_ThenThrowRosterException() {
        long id = 453;

        rosterService.findRosterByIdentificationNumber(id);
    }

    @Test
    public void getAllRoster_thenReturnListOfRosters(){
        assert(rosterService.getAll().size() == 3);
    }

    @Test
    public void whenDeletingRosterWithValidIdentifier_thenSuccessfulDeleteRequest(){
        long id = 0;

        rosterService.deleteRosterByIdentifier(id);
    }


}

