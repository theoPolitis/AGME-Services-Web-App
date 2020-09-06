package septmajorproject.bookingsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;

import java.util.List;

@Repository
public interface RosterRepository extends JpaRepository<Roster, Long> {

    List<Roster> findAllByEmployee(Employee employee);

    @Override
    //returns all rosters
    List<Roster> findAll();

    @Override
    List<Roster> findAllById(Iterable<Long> Ids);

    Roster findRosterById(String rosterId);
}
