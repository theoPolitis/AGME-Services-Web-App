package septmajorproject.bookingsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import septmajorproject.bookingsys.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//    @Override
//    Iterable<Employee> findAllById(Iterable<Long> iterable);
}
