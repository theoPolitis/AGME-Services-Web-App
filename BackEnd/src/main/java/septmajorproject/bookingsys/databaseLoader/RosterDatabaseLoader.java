package septmajorproject.bookingsys.databaseLoader;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.repository.EmployeeRepository;
import septmajorproject.bookingsys.repository.RosterRepository;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Component
@Order(4)
public class RosterDatabaseLoader implements CommandLineRunner {
    @Autowired
    private RosterRepository rosterRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    public RosterDatabaseLoader(RosterRepository rosterRepository) {
        this.rosterRepository = rosterRepository;
    }


    //loads rosters into the database
    @Override
    public void run(String... args) throws Exception {
        List<Employee> employeeList = employeeRepository.findAll();
        for(Employee emp : employeeList)
        {
            Roster rost = new Roster(emp);
            rost.setIsApproved(true);
            emp.setRoster(rost);
            rosterRepository.save(rost);
        }

    }
}

