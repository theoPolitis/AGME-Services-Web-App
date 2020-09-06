package septmajorproject.bookingsys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import septmajorproject.bookingsys.exception.BookingException;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.repository.BookingRepository;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    //Add in addition/modification/retrieval logic

    public Booking saveOrUpdateBooking(Booking booking){
        return bookingRepository.save(booking);
    }

    public Booking findBookingByIdentificationNumber(String id) {
        Booking found = bookingRepository.findBookingById(id);

        if (found == null) {
            throw new BookingException("Booking with ID: " + id + " does not exist");
        } else {
            return found;
        }

    }

    public List<Booking> getAll(){
        return bookingRepository.findAll();
    }

    public void deleteBookingByIdentifier(String id) {

        Booking found = bookingRepository.findBookingById(id);

        if (found == null) {
            throw new BookingException("Booking with ID: " + id + " does not exist");
        } else {
            bookingRepository.delete(found);
        }


    }
}
