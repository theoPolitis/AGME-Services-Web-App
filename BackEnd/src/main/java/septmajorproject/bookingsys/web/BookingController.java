package septmajorproject.bookingsys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.BookingPK;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.service.BookingService;
import septmajorproject.bookingsys.service.CustomerService;
import septmajorproject.bookingsys.service.EmployeeService;

import javax.validation.Valid;
import java.sql.Time;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/booking")
public class BookingController {
    //TODO: Add functionality for communication between frontend and backend.

    @Autowired
    private BookingService bookingService;
    private EmployeeService employeeService;
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

//    @GetMapping("/all")
//    public List<Booking> all() {
//
//        Time time = new Time(12,30,0);
//        Date date = new Date(2020,8,27);
//
//        BookingPK pk = new BookingPK(date, time);
//        Employee emp = new Employee("Bob", "Smith", "bob@smith.com", 39593925, "123 street", "anotherOne", "test");
//        Customer cust = new Customer("test", "test@email.com", "Julz", "riz", "123 street", "04373847545", "testSomething");
//
//        Booking booking = new Booking(pk, emp, cust);
//
//        bookingService.saveOrUpdateBooking(booking);
//
//        return bookingService.getAll();
//    }

    @GetMapping("/tester")
    public Booking test() {
        Time time = new Time(12,30,0);
        Date date = new Date(2020,8,27);

        BookingPK pk = new BookingPK(date, time);
        Employee emp = new Employee("Bob", "Smith", "bob@smith.com", 39593925, "123 street", "anotherOne", "test");
        Customer cust = new Customer("test", "test@email.com", "Julz", "riz", "123 street", "04373847545", "testSomething");

        Booking booking = new Booking(pk, emp, cust);

        customerService.saveOrUpdateCustomer(cust);
        employeeService.saveOrUpdateEmployee(emp);
        bookingService.saveOrUpdateBooking(booking);

        return booking;

    }

}
