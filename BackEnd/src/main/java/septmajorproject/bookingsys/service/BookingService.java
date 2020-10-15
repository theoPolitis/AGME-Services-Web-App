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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final EmployeeRepository employeeRepository;
    private final CustomerRepository customerRepository;

    //Saves the given booking in the backend
    @Transactional
    public Booking saveOrUpdateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
    //Returns the booking associated with the given id
    @Transactional(readOnly = true)
    public Booking findBookingByIdentificationNumber(Long id) {
        Booking found = bookingRepository.findBookingById(id);

        if (found == null) {
            throw new BookingException("Booking with ID: " + id + " does not exist");
        } else {
            return found;
        }

    }
    //Returns all bookings
    @Transactional(readOnly = true)
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }
    //Deletes a booking associated with the given id
    @Transactional
    public void deleteBookingByIdentifier(Long id) {
        Booking found = bookingRepository.findBookingById(id);

        if (found == null) {
            throw new BookingException("Booking with ID: " + id + " does not exist");
        } else {
            bookingRepository.delete(found);
        }
    }
    //Used to find all bookings associated with the employee on a given date
    @Transactional(readOnly = true)
    public List<Booking> findAllByDateAndEmployee(Employee employee, Date date) {
        List<Booking> bookings = bookingRepository.findAllByEmployee(employee);
        List<Booking> returned = new ArrayList<Booking>();
        for(Booking bk : bookings)
        {
            Date dt = bk.getRosterDate();
            if(dt.getDate() == date.getDate() && dt.getMonth() == date.getMonth() && dt.getYear() == date.getYear())
            {
                returned.add(bk);
            }
        }
        return returned;
    }
    //Used to get all bookings associated with the employee
    @Transactional(readOnly = true)
    public List<Booking> getBookingsForEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new RuntimeException("Employee not found: " + employeeId));
        return bookingRepository.findAllByEmployeeAndCompleted(employee, false);
    }
    //Used to get all bookings associated with a given customer
    @Transactional(readOnly = true)
    public List<Booking> getBookingsForCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found: " + customerId));
        return bookingRepository.findAllByCustomerAndCompleted(customer, false);
    }
    //Used to update the bookings completed attribute (a boolean)
    @Transactional
    public void completeBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("No booking found with id: " + bookingId));
        booking.setCompleted(true);
        bookingRepository.save(booking);
    }
    //Gets all bookings associated with a date and service
    public List<Booking> getBookings(Date date, String serviceNo) {
        String dateStr = null;
        if (date != null) {
            dateStr = new SimpleDateFormat("yyyy-MM-dd").format(date);
        }
        return bookingRepository.findAllByDateAndService(date, serviceNo);
    }
}
