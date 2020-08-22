package septmajorproject.bookingsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import septmajorproject.bookingsys.model.Employee;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Override
    List<Employee> findAllById(Iterable<Long> ids);

    Employee findByFirstName(String firstName);

    Employee findByUserName(String userName);

}
