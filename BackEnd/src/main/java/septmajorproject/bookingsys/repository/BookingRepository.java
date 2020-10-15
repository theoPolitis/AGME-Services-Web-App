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

    @Override
    List<Booking> findAllById(Iterable<Long> ids);
    //Finds all bookings by employee.
    List<Booking> findAllByEmployee(Employee employee);
    //Finds all bookings by customer.
    List<Booking> findAllByCustomer(Customer customer);
    //Finds all bookings.
    List<Booking> findAll();
    //Finds an individual booking by its unique identifier
    Booking findBookingById(Long id);
    //Finds all bookings by employee and date, ie finds the bookings for the employee on a given day.
    List<Booking> findAllByEmployeeAndRosterDate(Employee employee, Date rosterDate);
    //Finds all bookings by employee that have been completed, useful to find employee booking history.
    List<Booking> findAllByEmployeeAndCompleted(Employee employee, boolean completed);
    //Finds all bookings by customer that have been completed, useful to find customer booking history.
    List<Booking> findAllByCustomerAndCompleted(Customer customer, boolean completed);
    //Custom query that finds all bookings by the date and service, useful to display data to the front end
    @Query("FROM Booking WHERE (:date IS NULL OR (" +
        "(extract(day from rosterDate) || '-' || extract(month from rosterDate) || '-' || extract(year from rosterDate)) = " +
        "(extract(day from :date) || '-' || extract(month from :date) || '-' || extract(year from :date))" +
        ")) " +
        "AND (:serviceNo IS NULL OR serviceType.serviceNo = :serviceNo)")
    List<Booking> findAllByDateAndService(@Param("date") Date date, @Param("serviceNo") String serviceNo);

}
