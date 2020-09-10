package septmajorproject.bookingsys.repository;

import org.springframework.data.repository.CrudRepository;
import septmajorproject.bookingsys.model.ServiceType;

import java.util.List;

public interface ServiceTypeRepository extends CrudRepository<ServiceType, Long> {
    @Override
    List<ServiceType> findAllById(Iterable<Long> iterable);

    ServiceType findByServiceName(String serviceName);

    List<ServiceType> findAll();
}
