package septmajorproject.bookingsys.databaseLoader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.repository.EmployeeRepository;

@Order(2)
@Component
public class EmployeeDatabaseLoader implements CommandLineRunner {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeDatabaseLoader(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Employee alex = new Employee(
            "E1234",
            "Alex",
            "Test",
            "s3661671@student.rmit.edu.au",
            "0424735215",
            "Something",
            "Alex",
            "alex");
        alex.setAdmin(false);
        alex.setServiceNo("1E");

        Employee adminGym = new Employee(
            "E2351",
            "AdminGym",
            "AdminGym",
            "AdminGym@student.rmit.edu.au",
            "000",
            "admin",
            "AdminGym",
            "adminGym");
        adminGym.setAdmin(true);
        adminGym.setServiceNo("2E");

        Employee adminPhrezCut = new Employee(
                "E2361",
                "AdminPhrezCut",
                "AdminPhrezCut",
                "AdminPhrezCut@student.rmit.edu.au",
                "000",
                "admin",
                "AdminPhrezCut",
                "adminPhrezCut");
        adminPhrezCut.setAdmin(true);
        adminPhrezCut.setServiceNo("1E");

        Employee adminBarber = new Employee(
                "E2371",
                "AdminBarber",
                "AdminBarber",
                "AdminBarber@student.rmit.edu.au",
                "000",
                "admin",
                "AdminBarber",
                "adminBarber");
        adminBarber.setAdmin(true);
        adminBarber.setServiceNo("3E");


        Employee sam = new Employee(
            "E3456",
            "Sam",
            "ten",
            "sam@student.rmit.edu.au",
            "0544654634",
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
            "463413476",
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
            "658454556",
            "10 link parade",
            "Massimo",
            "massimo");
        massimo.setAdmin(false);
        massimo.setServiceNo("3E");
        employeeRepository.save(alex);
        employeeRepository.save(adminBarber);
        employeeRepository.save(adminGym);
        employeeRepository.save(adminPhrezCut);
        employeeRepository.save(sam);
        employeeRepository.save(lucas);
        employeeRepository.save(massimo);
    }
}
