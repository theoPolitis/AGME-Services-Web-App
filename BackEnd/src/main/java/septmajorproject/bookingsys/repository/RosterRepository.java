package septmajorproject.bookingsys.repository;

import org.springframework.data.repository.CrudRepository;
import septmajorproject.bookingsys.model.Roster;

public interface RosterRepository extends CrudRepository<Roster, Long> {
}
