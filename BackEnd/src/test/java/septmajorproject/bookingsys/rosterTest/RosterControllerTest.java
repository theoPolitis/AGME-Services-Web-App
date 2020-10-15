package septmajorproject.bookingsys.rosterTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.service.EmployeeService;
import septmajorproject.bookingsys.service.RosterService;
import septmajorproject.bookingsys.web.RosterController;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(RosterController.class)
public class RosterControllerTest {

    @Autowired
    private MockMvc mockMVC;

    @MockBean
    private RosterService rosterService;

    @MockBean
    private EmployeeService employeeService;

    @Autowired
    private ObjectMapper objectMapper;

    Employee employeeOne = new Employee("1234", "Alex", "Test", "s3661671@student.rmit.edu.au", "0424735215", "Something", "s3661671", "password");

    Roster rosterOne = new Roster(employeeOne);
    Roster rosterTwo = new Roster(employeeOne);
    Roster rosterThree = new Roster(employeeOne);

    @Before
    public void setUp(){

    }

    @Test
    public void givenRoster_whenGetRosterById_thenReturnRoster() throws Exception {
        given(rosterService.findRosterByIdentificationNumber(1234)).willReturn(rosterOne);

        mockMVC.perform(get("/api/roster/{rosterId}", "1234").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employee.firstName",is(employeeOne.getFirstName())));
    }

    @Test
    public void givenRoster_whenGetAllRosters_thenReturnRosterList() throws Exception
    {
        List<Roster> allRosters = new ArrayList<Roster>();
        allRosters.add(rosterOne);
        allRosters.add(rosterThree);
        allRosters.add(rosterTwo);

        given(rosterService.getAll()).willReturn(allRosters);

        mockMVC.perform(get("/api/roster/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",hasSize(3)))
                .andExpect(jsonPath("$[0].employee.firstName",is(employeeOne.getFirstName())));
    }

    @Test
    public void givenRoster_whenDeleteRosterById_thenSuccessfulDeleteRequest() throws Exception
    {
        String deleteString = "Roster with ID: " +rosterOne.getId() + " was deleted";

        mockMVC.perform(delete("/api/roster/{rosterId}",rosterOne.getId()).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",is(deleteString)));
    }



}
