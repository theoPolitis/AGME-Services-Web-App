package septmajorproject.bookingsys.repository;

import org.springframework.data.repository.CrudRepository;
import septmajorproject.bookingsys.model.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    @Override
    Iterable<Employee> findAllById(Iterable<Long> iterable);
}
