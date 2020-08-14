package septmajorproject.bookingsys.repository;

import org.springframework.data.repository.CrudRepository;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.BookingPK;


public interface BookingRepository extends CrudRepository<Booking, BookingPK> {
}
