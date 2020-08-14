package septmajorproject.bookingsys.repository;

import org.springframework.data.repository.CrudRepository;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.model.RosterPK;

import java.util.Date;

public interface RosterRepository extends CrudRepository<Roster, RosterPK> {
}
