package septmajorproject.bookingsys.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import septmajorproject.bookingsys.exception.BookingException;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.repository.BookingRepository;
import septmajorproject.bookingsys.repository.CustomerRepository;
import septmajorproject.bookingsys.repository.EmployeeRepository;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final EmployeeRepository employeeRepository;
    private final CustomerRepository customerRepository;

    //Add in addition/modification/retrieval logic

    @Transactional
    public Booking saveOrUpdateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Transactional(readOnly = true)
    public Booking findBookingByIdentificationNumber(Long id) {
        Booking found = bookingRepository.findBookingById(id);

        if (found == null) {
            throw new BookingException("Booking with ID: " + id + " does not exist");
        } else {
            return found;
        }

    }

    @Transactional(readOnly = true)
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @Transactional
    public void deleteBookingByIdentifier(Long id) {
        Booking found = bookingRepository.findBookingById(id);

        if (found == null) {
            throw new BookingException("Booking with ID: " + id + " does not exist");
        } else {
            bookingRepository.delete(found);
        }
    }

    @Transactional(readOnly = true)
    public List<Booking> findAllByDateAndEmployee(Employee employee, Date date) {
        return bookingRepository.findAllByEmployeeAndRosterDate(employee, date);
    }

    @Transactional(readOnly = true)
    public List<Booking> getBookingsForEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new RuntimeException("Employee not found: " + employeeId));
        return bookingRepository.findAllByEmployeeAndCompleted(employee, false);
    }

    @Transactional(readOnly = true)
    public List<Booking> getBookingsForCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found: " + customerId));
        return bookingRepository.findAllByCustomerAndCompleted(customer, false);
    }

    @Transactional
    public void completeBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("No booking found with id: " + bookingId));
        booking.setCompleted(true);
        bookingRepository.save(booking);
    }

    public List<Booking> getBookings(Date date, String serviceNo) {
        String dateStr = null;
        if (date != null) {
            dateStr = new SimpleDateFormat("yyyy-MM-dd").format(date);
        }
        return bookingRepository.findAllByDateAndService(date, serviceNo);
    }
}
