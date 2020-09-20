package septmajorproject.bookingsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;

import java.util.Date;
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

    List<Booking> findAllByEmployeeAndRosterDate(Employee employee, Date rosterDate);

    List<Booking> findAllByEmployeeAndCompleted(Employee employee, boolean completed);

    List<Booking> findAllByCustomerAndCompleted(Customer customer, boolean completed);

    @Query("FROM Booking WHERE (:date IS NULL OR (" +
        "(extract(day from rosterDate) || '-' || extract(month from rosterDate) || '-' || extract(year from rosterDate)) = " +
        "(extract(day from :date) || '-' || extract(month from :date) || '-' || extract(year from :date))" +
        ")) " +
        "AND (:serviceNo IS NULL OR serviceType.serviceNo = :serviceNo)")
    List<Booking> findAllByDateAndService(@Param("date") Date date, @Param("serviceNo") String serviceNo);

}
