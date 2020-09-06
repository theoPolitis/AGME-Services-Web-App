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

        Roster rosterOne = new Roster(employeeOne,(new Date(2020,8,27)),(new Time(12,30,0)));
        Roster rosterTwo = new Roster(employeeOne,(new Date(2020,8,28)),(new Time(12,30,0)));
        Roster rosterThree = new Roster(employeeOne,(new Date(2020,8,29)),(new Time(12,30,0)));

        List<Roster> rosterListAll = new ArrayList<>();

        rosterListAll.add(rosterOne);
        rosterListAll.add(rosterTwo);
        rosterListAll.add(rosterThree);

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
    public void whenInvalidIdentifier_ThenThrowRosterException() {
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

