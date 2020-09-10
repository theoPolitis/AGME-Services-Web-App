package septmajorproject.bookingsys.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.service.BookingService;
import septmajorproject.bookingsys.service.CustomerService;
import septmajorproject.bookingsys.service.EmployeeService;

import javax.validation.Valid;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


@RestController
@CrossOrigin
@RequestMapping("/api/booking")
public class BookingController {
    //TODO: Add functionality for communication between frontend and backend.

    @Autowired
    private BookingService bookingService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private CustomerService customerService;

    @PostMapping("")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result) {
        Map<String, String> errorMap = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }

        Booking booking1 = bookingService.saveOrUpdateBooking(booking);

        return new ResponseEntity<Booking>(booking, HttpStatus.CREATED);

    }

    @GetMapping("/all")
    public List<Booking> all() {
        return bookingService.getAll();

    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<?> findBookingById(@PathVariable String bookingId) {
        Booking booking = bookingService.findBookingByIdentificationNumber(bookingId);

        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBookingById(@PathVariable String bookingId) {
        bookingService.deleteBookingByIdentifier(bookingId);
        return new ResponseEntity<String>("Booking with ID: " + bookingId + " was deleted", HttpStatus.OK);
    }

    @GetMapping("/tester")
    public Booking test() {
        Time time = new Time(12,30,0);
        Date date = new Date(2020,8,27);

        Employee emp = new Employee("1234","Bob", "Smith", "bob@smith.com", 39593925, "123 street", "anotherOne", "test");
        Customer cust = new Customer("test", "test@email.com", "Julz", "riz", "123 street", "04373847545", "testSomething");

        Booking booking = new Booking(date, time, emp, cust);

        customerService.saveOrUpdateCustomer(cust);
        employeeService.saveOrUpdateEmployee(emp);
        bookingService.saveOrUpdateBooking(booking);

        return booking;

    }

    @PostMapping("/newBooking/{time}/{date}")
    @ResponseBody
    public ResponseEntity<?> createNewBooking(@RequestBody Map<String, String> map,
                                              @PathVariable @JsonFormat(pattern = "HH:mm:ss") Time time, @PathVariable @DateTimeFormat(pattern = "yyyy-mm-dd") Date date,
                                              BindingResult result)
    {
        Map<String, String> errorMap = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        String employeeId = map.get("employeeId");
        String customerId = map.get("customerId");
        Employee emp= employeeService.findByEmployeeIdentifier(employeeId);
        Customer cust = customerService.findCustomerByIdentificatioNumber(customerId);
        Booking newBooking = new Booking(date, time, emp, cust);
        bookingService.saveOrUpdateBooking(newBooking);
        return new ResponseEntity<String>("New Booking Created", HttpStatus.OK);
    }

    @GetMapping("/{date}/{employeeId}")
    public List<Map<String,String>> getBookingsByTimesByDateAndEmployee(@PathVariable @DateTimeFormat(pattern = "yyyy-mm-dd") Date date, @PathVariable String employeeId)
    {
        Employee emp = employeeService.findByEmployeeIdentifier(employeeId);
        List<Booking> bookings = bookingService.findAllByDateAndEmployee(emp,date);
        List<Map<String, String>> bookingTimes = new ArrayList<Map<String, String>>();
        for(Booking booking: bookings)
        {
            Map<String, String> map = new HashMap<String,String>();
            Time time = booking.getRosterTime();
            String format = time.getHours()+":00";
            map.put("time",format);
            bookingTimes.add(map);
        }
        return bookingTimes;

    }

}
