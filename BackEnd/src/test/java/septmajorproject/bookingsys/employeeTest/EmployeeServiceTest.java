package septmajorproject.bookingsys.employeeTest;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.repository.EmployeeRepository;
import septmajorproject.bookingsys.service.EmployeeService;

@RunWith(SpringRunner.class)
public class EmployeeServiceTest {

    @Autowired
    private EmployeeService employeeService;

    @MockBean
    private EmployeeRepository employeeRepository;

    @Before
    public void setUp(){
        Employee newEmployeeOne = new Employee("1234", "Alex", "Test", "s3661671@student.rmit.edu.au", 0424735215, "Something", "s3661671", "password");

        Mockito.when(employeeRepository.findByEmployeeIdentifier(newEmployeeOne.getEmployeeIdentifier()));
        Mockito.when(employeeRepository.findByEmail() )
    }
}
