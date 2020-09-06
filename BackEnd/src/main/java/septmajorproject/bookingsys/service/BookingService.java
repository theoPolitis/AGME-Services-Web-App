package septmajorproject.bookingsys.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.repository.BookingRepository;

import java.awt.print.Book;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllByBookingDate(Date date)
    {
        List<Booking> bookings = bookingRepository.findAll();
        List<Booking> book;

        for(Booking booking : bookings)
        {
            booking.getBookingPK().getRosterDate().equals(date);
        }

        return bookings;
    }

    public List<Booking> getAll(){
        return bookingRepository.findAll();
    }

    //Add in addition/modification/retrieval logic
}
