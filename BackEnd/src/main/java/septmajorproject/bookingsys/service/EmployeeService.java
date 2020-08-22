package septmajorproject.bookingsys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.repository.EmployeeRepository;

@Service
public class EmployeeService{
    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee saveOrUpdateEmployee(Employee employee){
        return employeeRepository.save(employee);
    }


}
