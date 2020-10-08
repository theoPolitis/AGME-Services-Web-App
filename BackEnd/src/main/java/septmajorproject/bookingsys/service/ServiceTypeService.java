package septmajorproject.bookingsys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import septmajorproject.bookingsys.exception.ServiceTypeException;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.repository.ServiceTypeRepository;

import java.util.List;
import java.util.Map;

@Service
public class ServiceTypeService {
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;


    //saves or updates an instance of the employee in the database
    public ServiceType saveOrUpdateService(ServiceType serviceType) {
        try {
            serviceType.setServiceName(serviceType.getServiceName().toUpperCase());
            return serviceTypeRepository.save(serviceType);
        } catch (Exception e) {
            throw new ServiceTypeException("Service type name: " + serviceType.getServiceName() + " already exists");
        }
    }

    //update already existing service type
    public ServiceType updateExistingServiceType(String serviceNo, Map<String, String> serviceTypeDataMap) {

        ServiceType existing = serviceTypeRepository.findByServiceNo(serviceNo);

        if (existing != null) {
            existing.setStartTime(serviceTypeDataMap.get("startTime"));
            existing.setEndTime(serviceTypeDataMap.get("endTime"));

            serviceTypeRepository.save(existing);
            return existing;
        } else {
            return null;
        }
    }


    //returns serviceType found by Name
    public ServiceType findByServiceName(String serviceTypeName) {
        ServiceType found = serviceTypeRepository.findByServiceName(serviceTypeName);

        if (found == null) {
            throw new ServiceTypeException("serviceType Name : " + serviceTypeName + " serviceType Name does not exist");
        }

        return found;
    }


    //returns serviceType found by number
    public ServiceType findByServiceNo(String serviceTypeNo) {
        ServiceType found = serviceTypeRepository.findByServiceNo(serviceTypeNo);

        if (found == null) {
            throw new ServiceTypeException("serviceType Number : " + serviceTypeNo + " serviceType number does not exist");
        }

        return found;
    }

    //returns all serviceTypes to the database
    public List<ServiceType> findAllServiceType() {
        return serviceTypeRepository.findAll();
    }

    //deletes a service in the database
    public void deleteServiceTypeByNo(String serviceTypeNo) {

        ServiceType found = serviceTypeRepository.findByServiceNo(serviceTypeNo.toUpperCase());
    }


    public List<ServiceType> findAllCustomers() {
        return serviceTypeRepository.findAll();
    }

}
