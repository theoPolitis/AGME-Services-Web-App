package septmajorproject.bookingsys.databaseLoader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.repository.BookingRepository;

import java.sql.Time;
import java.util.Date;

@Component
public class BookingDataBaseLoader implements CommandLineRunner {
    private final BookingRepository bookingRepository;

    @Autowired
    public BookingDataBaseLoader(BookingRepository bookingRepository){
        this.bookingRepository = bookingRepository;
    }


    // loading the database
    @Override
    public void run(String... args) throws Exception {

        Employee employeeOne = new Employee(
                "E1234",
                "Alex",
                "Test",
                "s3661671@student.rmit.edu.au",
                0424735215,
                "Something",
                "Alex",
                "alex");

        Customer customerOne = new Customer(
                "Theo",
                "Politis",
                "s3661671@student.rmit.edu.au",
                "Something",
                "Theo",
                "4545574654",
                "theo",
                "1TP");

        Time timeOne = new Time(12,30,0);
        Date dateOne = new Date(2020,8,27);

        this.bookingRepository.save(new Booking(dateOne,timeOne,employeeOne,customerOne));

    }
}
