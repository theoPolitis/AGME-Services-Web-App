package septmajorproject.bookingsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import septmajorproject.bookingsys.model.ServiceType;

import java.util.List;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    @Override
        //returns all serviceTypes
    List<ServiceType> findAll();

    @Override
    List<ServiceType> findAllById(Iterable<Long> iterable);

    //returns serviceTypes by unique serviceName
    ServiceType findByServiceName(String serviceName);


    //returns serviceTypes by unique serviceNumber
    ServiceType findByServiceNo(String ServiceNo);
}
