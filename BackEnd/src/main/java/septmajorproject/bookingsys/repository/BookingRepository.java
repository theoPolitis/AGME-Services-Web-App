package septmajorproject.bookingsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    //Further table functionality will be entered as needed

    @Override
    List<Booking> findAllById(Iterable<Long> ids);

    List<Booking> findAllByEmployee(Employee employee);

    List<Booking> findAllByCustomer(Customer customer);

    List<Booking> findAll();

    Booking findBookingById(Long id);
}
