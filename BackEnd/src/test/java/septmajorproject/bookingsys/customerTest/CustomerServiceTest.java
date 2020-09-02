package septmajorproject.bookingsys.customerTest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.repository.CustomerRepository;
import septmajorproject.bookingsys.service.CustomerService;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
public class CustomerServiceTest {

    @TestConfiguration
    static class CustomerServiceImplTestContextConfiguration{
        @Bean
        public CustomerService customerService() {
            return new CustomerService();
        }
    }

    @Autowired
    private CustomerService customerService;

    @MockBean
    private CustomerRepository customerRepository;

    @Before
    public void setup()
    {
        Customer cust1 = new Customer("John","Test","s3788167@student.rmit.edu.au",
                "123 this street","johntest","0400000000","password","1");
        Customer cust2 = new Customer("Jess","Test","s3788168@student.rmit.edu.au",
                "123 this street","jesstest","0400000000","password","2");
        Customer cust3 = new Customer("Steve","Test","s3788169@student.rmit.edu.au",
                "123 this street","stevetest","0400000000","password","3");

        List<Customer> custList = new ArrayList<Customer>();
        custList.add(cust1);
        custList.add(cust2);
        custList.add(cust3);

        Mockito.when(customerRepository.findByUsername(cust1.getUsername())).thenReturn(cust1);
        Mockito.when(customerRepository.findByUsername(cust2.getUsername())).thenReturn(cust2);
        Mockito.when(customerRepository.findByUsername(cust3.getUsername())).thenReturn(cust3);

        Mockito.when(customerRepository.findAll()).thenReturn(custList);

        Mockito.when(customerRepository.findByIdentificationNumber(cust1.getIdentificationNumber())).thenReturn(cust1);
        Mockito.when(customerRepository.findByIdentificationNumber(cust2.getIdentificationNumber())).thenReturn(cust2);
        Mockito.when(customerRepository.findByIdentificationNumber(cust3.getIdentificationNumber())).thenReturn(cust3);

        Mockito.when(customerRepository.findByEmail(cust1.getEmail())).thenReturn(cust1);
        Mockito.when(customerRepository.findByEmail(cust2.getEmail())).thenReturn(cust2);
        Mockito.when(customerRepository.findByEmail(cust3.getEmail())).thenReturn(cust3);
    }

    @Test
    public void whenValidUsernameIsUsed_CustomerShouldBeReturned(){
        String username = "johntest";

        Customer cust = customerRepository.findByUsername(username);

        assert(cust.getUsername() == username);
    }

    @Test
    public void whenValidEmailIsUsed_CustomerShouldBeReturned(){
        String email = "s3788169@student.rmit.edu.au";
        Customer cust= customerRepository.findByEmail(email);
        assert(cust.getEmail().equals(email));
    }

    @Test
    public void whenInvalidEmailIsUsed_NullIsReturned(){
        String email = "email";
        Customer cust= customerRepository.findByEmail(email);
        assert(cust == null);
    }

    @Test
    public void whenGetAllIsUsed_ReturnListOfCustomers(){
        List<Customer> custList = customerRepository.findAll();
        assert(custList.size() == 3);
    }

}
