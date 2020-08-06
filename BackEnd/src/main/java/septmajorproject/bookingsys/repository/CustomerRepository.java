package septmajorproject.bookingsys.repository;

import org.springframework.data.repository.CrudRepository;
import septmajorproject.bookingsys.model.Customer;

public interface CustomerRepository extends CrudRepository<Customer,Integer> {

}
