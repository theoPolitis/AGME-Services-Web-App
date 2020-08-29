package septmajorproject.bookingsys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.service.BookingService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/booking")
public class BookingController {
    //TODO: Add functionality for communication between frontend and backend.

    @Autowired
    private BookingService bookingService;

    @PostMapping("")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result) {
        Map<String, String> errorMap = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }


        Booking booking1 = bookingService.saveOrUpdateEmployee(booking);

        return new ResponseEntity<Booking>(booking, HttpStatus.CREATED);

    }



}
