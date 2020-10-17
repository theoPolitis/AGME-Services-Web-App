package septmajorproject.bookingsys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import septmajorproject.bookingsys.exception.EmployeeException;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.repository.EmployeeRepository;

import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    //saves or updates an instance of the employee in the database
    public Employee saveOrUpdateEmployee(Employee employee) {
        try {
            employee.setEmployeeIdentifier(employee.getEmployeeIdentifier().toUpperCase());
            employee.setRoster(new Roster(employee));
            return employeeRepository.save(employee);
        } catch (Exception e) {
            throw new EmployeeException("Employee Identifier: " + employee.getEmployeeIdentifier() + " already exists");
        }

    }

    public Employee updateExistingEmployee(String id, Map<String, String> userDataMap) {

        Employee existing = employeeRepository.findByEmployeeIdentifier(id);

        System.out.println("FIRSTNAME HERE: " + existing.getFirstName());

        if (existing != null) {
            if (userDataMap.get("password") != "") {
                existing.setPassword(userDataMap.get("password"));
            }

            existing.setFirstName(userDataMap.get("firstName"));
            existing.setLastName(userDataMap.get("lastName"));
            existing.setAddress(userDataMap.get("address"));
            existing.setPhoneNumber(userDataMap.get("phoneNumber"));
            existing.setEmail(userDataMap.get("email"));
            existing.setUserName(userDataMap.get("userName"));

            employeeRepository.save(existing);
            return existing;
        } else {
            return null;
        }
    }

    //returns an employee using employee Identifier
    public Employee findByEmployeeIdentifier(String id) {
        Employee found = employeeRepository.findByEmployeeIdentifier(id.toUpperCase());

        if (found == null) {
            throw new EmployeeException("Employee Indentifier: " + id.toUpperCase() + " This Employee does not exist");
        }

        return found;
    }

    //returns employee found by userName
    public Employee findByEmployeeUserName(String userName) {
        Employee found = employeeRepository.findByUserName(userName);

        if (found == null) {
            throw new EmployeeException("Employee UserName: " + userName + " Username does not exist");
        }

        return found;
    }

    //returns employee found by email
    public Employee findByEmployeeEmail(String email) {
        Employee found = employeeRepository.findByEmail(email);

        if (found == null) {
            throw new EmployeeException("Employee Email: " + email + " Email does not exist");
        }

        return found;
    }

    //returns Employee found by phone number 
    public Employee findEmployeeByPhoneNumber(String phoneNumber) {
        Employee found = employeeRepository.findByPhoneNumber(phoneNumber);

        if (found == null) {
            throw new EmployeeException("Employee Phone Number: " + phoneNumber + "Phone number does not exist");
        }

        return found;
    }

    //returns all employees to the database
    public List<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    //deletes an employee in the database
    public void deleteEmployeeByIdentifier(String id) {
        Employee found = employeeRepository.findByEmployeeIdentifier(id.toUpperCase());

        if (found == null) {
            throw new EmployeeException("Employee Identifier " + id.toUpperCase() + "This Employee does not exist");
        }

        employeeRepository.delete(found);
    }

    public Employee findByUsernameAndPassword(String username, String password) {
        Employee found = employeeRepository.findByUserNameAndPassword(username, password);

        if (found == null) {
            throw new EmployeeException("Employee not found");
        }

        return found;
    }

    public List<Employee> findByServiceNo(String ServiceNo) {
        return employeeRepository.findAllByServiceNo(ServiceNo);
    }
}
