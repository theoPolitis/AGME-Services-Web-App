package septmajorproject.bookingsys.databaseLoader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.repository.BookingRepository;
import septmajorproject.bookingsys.repository.CustomerRepository;
import septmajorproject.bookingsys.repository.EmployeeRepository;
import septmajorproject.bookingsys.repository.ServiceTypeRepository;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Order(3)
@Component
public class BookingDataBaseLoader implements CommandLineRunner {

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public void run(String... strings) throws Exception {
        List<ServiceType> services = serviceTypeRepository.findAll();
        List<Customer> customers = customerRepository.findAll();
        Random r = new Random();
        employeeRepository.findAll().forEach(employee -> {
            for (int i = 0; i < 2 + r.nextInt(2); ++i) {
                Date date = new Date();
                Customer customer = customers.get(r.nextInt(customers.size()));
                ServiceType service = services.get(r.nextInt(services.size()));
                Booking booking = new Booking(date, new Time(date.getTime() + r.nextInt(10_000)), employee, customer, service);
                bookingRepository.save(booking);
            }
        });
    }
}
