package septmajorproject.bookingsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface RosterRepository extends JpaRepository<Roster, Long> {

//    Employee employee = new Employee();

    List<Roster> findAllByEmployee(Employee employee);

    @Override
    //returns all rosters
    List<Roster> findAll();

//    @Override
//    Roster findById(RosterPK rosterPK);

//    public Roster findByDateAndTime(Date date, Time time);

//    public Roster findByPK(RosterPK rosterPK);

    //    List<Roster> getAllByEmployeeId(String employeeId);


}
