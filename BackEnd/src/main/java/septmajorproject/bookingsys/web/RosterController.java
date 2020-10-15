package septmajorproject.bookingsys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.service.EmployeeService;
import septmajorproject.bookingsys.service.RosterService;
import septmajorproject.bookingsys.web.request.NewRosterCommand;

import javax.validation.Valid;
import java.sql.Time;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/roster")
public class RosterController {

    @Autowired
    private RosterService rosterService;
    @Autowired
    private EmployeeService employeeService;
    //Post mapping that saves a new employee in the backend
    @PostMapping("")
    public ResponseEntity<?> createNewRoster(@Valid @RequestBody Roster roster, BindingResult result) {
        Map<String, String> errorMap = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }

        Roster roster1 = rosterService.createOrUpdateRosterEntry(roster);

        return new ResponseEntity<Roster>(roster, HttpStatus.CREATED);
    }
    //Get mapping that returns all rosters in the backend
    @GetMapping("/all")
    public List<Roster> all() {
        return rosterService.getAll();
    }
    //Get mapping that returns all rosters that have been approved - useful to show roster information to admins
    @GetMapping("/all/approved")
    public List<Roster> findApprovedRosters()
    {
        List<Roster> rosters = rosterService.findRostersByApproval(true);
        return rosters;
    }
    //Get mapping that returns all non approved rosters - useful to show roster information to admins
    @GetMapping("/all/notApproved")
    public List<Roster> findUnApprovedRosters()
    {
        List<Roster> rosters = rosterService.findRostersByApproval(false);
        return rosters;
    }
    //Get mapping to return the roster associated with the given roster id
    @GetMapping("/{rosterId}")
    public ResponseEntity<?> findRosterById(@PathVariable long rosterId) {
        Roster roster = rosterService.findRosterByIdentificationNumber(rosterId);

        return new ResponseEntity<>(roster, HttpStatus.OK);
    }
    //Delete mapping that removes the roster from the backend associated with the given roster id
    @DeleteMapping("/{rosterId}")
    public ResponseEntity<?> deleteRosterById(@PathVariable long rosterId) {
        rosterService.deleteRosterByIdentifier(rosterId);
        ;
        return new ResponseEntity<String>("Roster with ID: " + rosterId + " was deleted", HttpStatus.OK);
    }
    //Getmapping used to test the API in the JUNIT tests
    @GetMapping("/tester")
    public Roster test() {

        Employee employeeOne = new Employee("1234", "Alex", "Test", "s3661671@student.rmit.edu.au", "0424735215", "Something", "s3661671", "password");

        Roster roster = new Roster(employeeOne);

        employeeService.saveOrUpdateEmployee(employeeOne);
        rosterService.createOrUpdateRosterEntry(roster);

        return roster;

    }
    //GetMapping that returns the roster associated with the givne employee identifier
    @GetMapping("/employee/{employeeIdentifier}")
    public ResponseEntity<?> getRostersByEmployee(@PathVariable String employeeIdentifier)
    {
        Employee emp = employeeService.findByEmployeeIdentifier(employeeIdentifier);
        List<Roster> roster = rosterService.findRostersByEmployee(emp);
        return new ResponseEntity<>(roster, HttpStatus.OK);
    }
    //Putmapping that updates the roster using the given request body
    @PutMapping("/update")
    public ResponseEntity<?> updateRoster(@RequestBody NewRosterCommand newRoster)
    {
        Roster rost = rosterService.updateExistingRoster(newRoster);
        if(rost == null) {
            return new ResponseEntity<>("Error - Couldn't update the roster", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Roster Updated Successfully",HttpStatus.OK);
    }

}
