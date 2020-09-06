package septmajorproject.bookingsys.customerTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.service.CustomerService;
import septmajorproject.bookingsys.service.MapValidationErrorService;
import septmajorproject.bookingsys.web.CustomerController;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(CustomerController.class)
public class CustomerControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private CustomerService customerService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;

    @Test
    public void givenCustomers_whenGetCustomers_thenReturnJsonArray() throws Exception{
        Customer cust1 = new Customer("John","Test","s3788167@student.rmit.edu.au",
                "123 this street","johntest","0400000000","password","1");
        System.out.println(cust1.getIdentificationNumber());
        List<Customer> allCustomers = Arrays.asList(cust1);

        given(customerService.findAllCustomers()).willReturn(allCustomers);

        mvc.perform(get("/api/customer/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].firstName", is(cust1.getFirstName())));
    }

    @Test
    public void givenNoCustomers_whenGetCustomers_thenReturnNullArray() throws Exception{
        given(customerService.findAllCustomers()).willReturn(null);
        mvc.perform(get("/api/customer/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").doesNotExist());
    }

    @Test
    public void givenNewCustomer_whenPostNewCustomer_thenNewCustomerIsAdded() throws Exception {
        Customer cust1 = new Customer("John","Test","s3788167@student.rmit.edu.au",
                "123 this street","johntest","0400000000","password","1");
        mvc.perform(post("/api/customer/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cust1)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName", is(cust1.getFirstName())));
    }

    @Test
    public void givenCustomerExists_whenDeleteCustomer_thenCustomerIsDeleted() throws Exception
    {
        Customer cust1 = new Customer("John","Test","s3788167@student.rmit.edu.au",
                "123 this street","johntest","0400000000","password","1");
        String deleteString = "Customer with ID: " + "1" + " was deleted";

        mvc.perform(delete("/api/customer/{employeeId}","1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(deleteString)));
    }

}
