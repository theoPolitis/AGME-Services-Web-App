package septmajorproject.bookingsys.repository;

import org.springframework.data.repository.CrudRepository;
import septmajorproject.bookingsys.model.Roster;

import java.util.Date;

public interface RosterRepository extends CrudRepository<Roster, Date> {
}
