package septmajorproject.bookingsys.databaseLoader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.repository.ServiceTypeRepository;

@Order(1)
@Component
public class ServiceTypeDataBaseLoader implements CommandLineRunner {

    private final ServiceTypeRepository serviceTypeRepository;

    @Autowired
    public ServiceTypeDataBaseLoader(ServiceTypeRepository serviceTypeRepository) {
        this.serviceTypeRepository = serviceTypeRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        ServiceType hairDresser = new ServiceType("1E", "Phresh Cutz");
        serviceTypeRepository.save(hairDresser);

        ServiceType gym = new ServiceType("2E", "Gym");
        serviceTypeRepository.save(gym);

        ServiceType barber = new ServiceType("3E", "Barber");
        serviceTypeRepository.save(barber);
    }
}
