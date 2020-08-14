package septmajorproject.bookingsys.repository;

import org.springframework.data.repository.CrudRepository;
import septmajorproject.bookingsys.model.Booking;

import java.util.Date;

public interface BookingRepository extends CrudRepository<Booking, Date> {
}
