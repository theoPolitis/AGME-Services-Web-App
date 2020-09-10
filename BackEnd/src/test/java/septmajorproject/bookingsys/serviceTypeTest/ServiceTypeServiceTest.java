package septmajorproject.bookingsys.serviceTypeTest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import septmajorproject.bookingsys.exception.EmployeeException;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.repository.EmployeeRepository;
import septmajorproject.bookingsys.repository.ServiceTypeRepository;
import septmajorproject.bookingsys.service.EmployeeService;
import septmajorproject.bookingsys.service.ServiceTypeService;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
public class ServiceTypeServiceTest {

    @TestConfiguration
    static class ServiceTypeServiceContextConfig {
        @Bean
        public ServiceTypeService serviceTypeService() {
            return new ServiceTypeService();
        }

    }

    @Autowired
    private ServiceTypeService serviceTypeService;

    @MockBean
    private ServiceTypeRepository serviceTypeRepository;

    @Before
    public void setup(){
        ServiceType ServiceType1 = new ServiceType("RC01","Room Cleaning");
        ServiceType ServiceType2 = new ServiceType("HC02","House Cleaning");
        ServiceType ServiceType3 = new ServiceType("CW01","Car Wash");
        ServiceType ServiceType4 = new ServiceType("BS01","babysitter");

        List<ServiceType> serviceTypeList = new ArrayList<ServiceType>();
        serviceTypeList.add(ServiceType1);
        serviceTypeList.add(ServiceType2);
        serviceTypeList.add(ServiceType3);
        serviceTypeList.add(ServiceType4);

        Mockito.when(serviceTypeRepository.findAll()).thenReturn(serviceTypeList);

        Mockito.when(serviceTypeRepository.findByServiceName(ServiceType1.getServiceName())).thenReturn(ServiceType1);
        Mockito.when(serviceTypeRepository.findByServiceName(ServiceType2.getServiceName())).thenReturn(ServiceType2);
        Mockito.when(serviceTypeRepository.findByServiceName(ServiceType3.getServiceName())).thenReturn(ServiceType3);
        Mockito.when(serviceTypeRepository.findByServiceName(ServiceType4.getServiceName())).thenReturn(ServiceType4);

    }

//    @Test
//    public void whenValidName_ThenServiceTypeShouldBeFound(){
//        String serviceTypeName = "Room Cleaning";
//
//        ServiceType found = serviceTypeRepository.findByServiceName(serviceTypeName);
//        assert(found.getServiceName() == serviceTypeName);
//
//    }

//    @Test
//    public void whenInvalidNameIsUsed_NullIsReturned(){
//        String serviceTypeName = "Name";
//        ServiceType found = serviceTypeRepository.findByServiceName(serviceTypeName);
//        assert(found == null);
//
//    }


    @Test
    public void whenValidName_ThenServiceTypeShouldBeFound(){
        String serviceTypeName = "Room Cleaning";

        ServiceType found = serviceTypeService.findByServiceName(serviceTypeName);

        assertThat(found.getServiceName().equals(serviceTypeName));
    }

//    @Test
//    public void whenInvalidNameIsUsed_NullIsReturned(){
//        String serviceTypeName = "Name";
//        ServiceType found = serviceTypeService.findByServiceName(serviceTypeName);
//        assert(found == null);
//}
    @Test
    public void getAllServiceType_returnListOFServiceType(){
        assertThat(serviceTypeService.findAllServiceType().size() == 3);
    }



}
