package septmajorproject.bookingsys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.service.BookingService;

import java.util.List;


@RestController
@RequestMapping("/api/booking")
@CrossOrigin
public class BookingController {
    //TODO: Add functionality for communication between frontend and backend
    @Autowired
    private BookingService bookingService;

    @GetMapping("/all")
    public List<Booking> getAllBookings(){
        return bookingService.getAll();
    }
}
