package septmajorproject.bookingsys.databaseLoader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.repository.BookingRepository;
import septmajorproject.bookingsys.repository.CustomerRepository;
import septmajorproject.bookingsys.repository.EmployeeRepository;
import septmajorproject.bookingsys.repository.ServiceTypeRepository;

import java.sql.Time;
import java.util.Date;

@Component
public class DataBaseLoader implements CommandLineRunner {
    private final CustomerRepository customerRepository;
    private final BookingRepository bookingRepository;
    private final EmployeeRepository employeeRepository;
    private final ServiceTypeRepository serviceTypeRepository;

    @Autowired
    public DataBaseLoader(CustomerRepository customerRepository, BookingRepository bookingRepository, EmployeeRepository employeeRepository, ServiceTypeRepository serviceTypeRepository){
        this.customerRepository = customerRepository;
        this.bookingRepository = bookingRepository;
        this.employeeRepository = employeeRepository;
        this.serviceTypeRepository = serviceTypeRepository;
    }


    //loads customers into the database
    @Override
    public void run(String... strings) throws Exception {
        //add customers to database
        Customer customerTheo = new Customer(
                "Theo",
                "Politis",
                "s3661671@student.rmit.edu.au",
                "Something",
                "Theo",
                "4545574654",
                "theo",
                "1TP");
        this.customerRepository.save(customerTheo);

        Customer customerAngus = new Customer(
                "Angus",
                "Newman",
                "something@gmail.com",
                "9 alloy way",
                "Angus",
                "555444555",
                "angus",
                "1AE");
        this.customerRepository.save(customerAngus);

        Customer customerSam = new Customer(
                "Sam",
                "Timothy",
                "Timothy@gmail.com",
                "5 point avenue",
                "Sam",
                "8744544545",
                "sam",
                "1ST");
        this.customerRepository.save(customerSam);

        Customer customerMarg = new Customer(
                "Margaret",
                "Wiley",
                "Margeret@gmail.com",
                "3 wiley street",
                "Margaret",
                "78354653",
                "margaret",
                "1MW");
        this.customerRepository.save(customerMarg);

        Customer customerReb = new Customer(
                "Rebecca",
                "Luscombe",
                "rebecca@gmail.com",
                "10 philips road",
                "Rebecca",
                "8744544545",
                "rebecca",
                "1RL");
        this.customerRepository.save(customerReb);

        Customer customerTom = new Customer(
                "Tom",
                "Yamaha",
                "tom@student.rmit.edu.au",
                "15 Maccas road",
                "Tom",
                "87455544545",
                "tom",
                "1TY");

        this.customerRepository.save(customerTom);

        //adds employees to database
        Employee alex = new Employee(
                "E1234",
                "Alex",
                "Test",
                "s3661671@student.rmit.edu.au",
                0424735215,
                "Something",
                "Alex",
                "alex");
        alex.setAdmin(false);
        alex.setServiceNo("1E");

        Employee admin = new Employee(
                "E2341",
                "Admin",
                "Admin",
                "admin@student.rmit.edu.au",
                000,
                "admin",
                "Admin",
                "admin");
        admin.setAdmin(true);
        admin.setServiceNo("2E");
        Employee sam = new Employee(
                "E3456",
                "Sam",
                "ten",
                "sam@student.rmit.edu.au",
                0544654634,
                "10 the parade",
                "Sam",
                "sam");
        sam.setAdmin(false);
        sam.setServiceNo("2E");
        Employee lucas = new Employee(
                "E9876",
                "Lucas",
                "Angelo",
                "lucas@student.rmit.edu.au",
                463413476,
                "10 rover street",
                "Lucas",
                "lucas");
        lucas.setAdmin(false);
        lucas.setServiceNo("3E");
        Employee massimo = new Employee(
                "E7688",
                "Massimo",
                "Sette",
                "massimo@student.rmit.edu.au",
                658454556,
                "10 link parade",
                "Massimo",
                "massimo");
        massimo.setAdmin(false);
        massimo.setServiceNo("3E");

        employeeRepository.save(alex);
        employeeRepository.save(admin);
        employeeRepository.save(sam);
        employeeRepository.save(lucas);
        employeeRepository.save(massimo);

        //adds service type to the database
        ServiceType hairDresser = new ServiceType("1E","Phresh Cutz");
        serviceTypeRepository.save(hairDresser);

        ServiceType gym = new ServiceType("2E","Gym");
        serviceTypeRepository.save(gym);

        ServiceType barber = new ServiceType("3E","Barber");
        serviceTypeRepository.save(barber);

        Time timeOne = new Time(12,30,0);
        Date dateOne = new Date(2020,8,27);

        //adds booking to the database
        this.bookingRepository.save(new Booking(dateOne,timeOne, alex, customerTheo));
    }


}
