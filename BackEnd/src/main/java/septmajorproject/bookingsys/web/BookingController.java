package septmajorproject.bookingsys.web;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.model.dto.BookingDto;
import septmajorproject.bookingsys.model.dto.BookingMapper;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.service.BookingService;
import septmajorproject.bookingsys.service.CustomerService;
import septmajorproject.bookingsys.service.EmployeeService;
import septmajorproject.bookingsys.service.ServiceTypeService;
import septmajorproject.bookingsys.web.request.NewBookingCommand;

import javax.validation.Valid;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;


@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/booking")
public class BookingController {
    //TODO: Add functionality for communication between frontend and backend.

    private final BookingService bookingService;
    private final EmployeeService employeeService;
    private final CustomerService customerService;
    private final ServiceTypeService serviceTypeService;
    //Postmapping to create new bookings in the backend
    @PostMapping("")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result) {
        Map<String, String> errorMap = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }

        Booking booking1 = bookingService.saveOrUpdateBooking(booking);

        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }
    //Get mapping that returns all booking objects
    @GetMapping("/all")
    public List<BookingDto> all(
        @RequestParam(name = "date", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
        @RequestParam(name = "serviceNo", required = false) String serviceNo
    ) {
        return bookingService.getBookings(date, serviceNo).stream()
            .map(BookingMapper.INSTANCE::bookingToBookingDto)
            .collect(toList());
    }
    //Getmapping that returns the given booking object by its given identifier
    @GetMapping("/{bookingId}")
    public ResponseEntity<?> findBookingById(@PathVariable Long bookingId) {
        Booking booking = bookingService.findBookingByIdentificationNumber(bookingId);

        return new ResponseEntity<>(booking, HttpStatus.OK);
    }
    //Deletemapping that deletes a given booking associated with the given identifier
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBookingById(@PathVariable Long bookingId) {
        bookingService.deleteBookingByIdentifier(bookingId);
        return new ResponseEntity<>("Booking with ID: " + bookingId + " was deleted", HttpStatus.OK);
    }
    //Postmapping that creates a new booking, this time using a differently formatted request body
    @PostMapping("/newBooking")
    @ResponseBody
    public ResponseEntity<?> createNewBooking(@RequestBody NewBookingCommand booking) {
        Employee emp = employeeService.findByEmployeeIdentifier(booking.getEmployeeIdentifier());
        Customer cust = customerService.findCustomerByIdentificatioNumber(booking.getCustomerIdentifier());
        ServiceType serviceType = serviceTypeService.findByServiceNo(booking.getServiceNo());
        Booking newBooking = new Booking(booking.getRosterDate(), booking.getRosterTime(), emp, cust, serviceType);
        bookingService.saveOrUpdateBooking(newBooking);
        return new ResponseEntity<>("New Booking Created", HttpStatus.OK);
    }
    //Get mapping that finds all bookings by date and employee
    @GetMapping("/{date}/{employeeId}")
    public List<Map<String, String>> getBookingsByTimesByDateAndEmployee(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @PathVariable String employeeId) {
        Employee emp = employeeService.findByEmployeeIdentifier(employeeId);
        List<Booking> bookings = bookingService.findAllByDateAndEmployee(emp, date);
        List<Map<String, String>> bookingTimes = new ArrayList<Map<String, String>>();
        for (Booking booking : bookings) {
            Map<String, String> map = new HashMap<String, String>();
            Time time = booking.getRosterTime();
            String format = time.getHours() + ":00";
            map.put("time", format);
            bookingTimes.add(map);
        }
        return bookingTimes;
    }

    //Get mapping that gets all bookings by the employee from the employee associated with the given id.
    @GetMapping("/employee/{employeeId}")
    public List<BookingDto> getBookingsForEmployee(@PathVariable("employeeId") Long employeeId) {
        return bookingService.getBookingsForEmployee(employeeId).stream()
            .map(BookingMapper.INSTANCE::bookingToBookingDto)
            .collect(toList());
    }
    //Get mapping that finds a bookings by the customer associated with the given customer id
    @GetMapping("/customer/{customerId}")
    public List<BookingDto> getBookingsForCustomer(@PathVariable("customerId") Long customerId) {
        return bookingService.getBookingsForCustomer(customerId).stream()
            .map(BookingMapper.INSTANCE::bookingToBookingDto)
            .collect(toList());
    }
    //Post mapping that completes a booking by the given bookings id
    @PostMapping("/{bookingId}/complete")
    public void completeBooking(@PathVariable("bookingId") Long bookingId) {
        bookingService.completeBooking(bookingId);
    }

}
