package septmajorproject.bookingsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.model.RosterPK;

import java.util.Date;
import java.util.List;

@Repository
public interface RosterRepository extends JpaRepository<Roster, RosterPK> {

//    Employee employee = new Employee();

    List<Roster> findAllByEmployee(Employee employee);

    @Override
    //returns all rosters
    List<Roster> findAll();

//    List<Roster> getAllByEmployeeId(String employeeId);


}
