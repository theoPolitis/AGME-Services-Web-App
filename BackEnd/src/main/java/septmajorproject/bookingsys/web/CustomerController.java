package septmajorproject.bookingsys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.service.CustomerService;
import septmajorproject.bookingsys.service.MapValidationErrorService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private MapValidationErrorService mapValidation;
    //Post mapping that creates a new Customer
    @PostMapping("")
    public ResponseEntity<?> createNewCustomer(@Valid @RequestBody Customer customer, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);

        if (errorMap != null) {
            return errorMap;
        }

        Customer newEmployee = customerService.saveOrUpdateCustomer(customer);

        return new ResponseEntity<Customer>(customer, HttpStatus.CREATED);
    }
    //Put mapping that updates the employee from the provided request body
    @PutMapping("/{customerId}")
    public ResponseEntity<?> updateEmployee(@PathVariable String customerId, @RequestBody Map<String, String> userDataMap, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);

        if(errorMap != null){
            return errorMap;
        }

        customerService.updateExistingCustomer(customerId, userDataMap);

        return new ResponseEntity<>(userDataMap,HttpStatus.OK);
    }

    //Get mapping that returns the Customer by username and password, useful for login functionality
    @GetMapping("{username}/{password}")
    public ResponseEntity<?> getPersonByUserNameAndPassword(@PathVariable String username, @PathVariable String password) {
        Customer customer = customerService.findByUsernameAndPassword(username, password);

        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }

    //Get mapping that returns all customers
    @GetMapping("/all")
    public List<Customer> getAllCustomers() {
        return customerService.findAllCustomers();
    }
    //Get mapping that returns a customer associated with the provided customer id
    @GetMapping("/{customerId}")
    public ResponseEntity<?> findEmployeeById(@PathVariable String customerId) {
        Customer customer = customerService.findCustomerByIdentificatioNumber(customerId);

        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }
    //Delete mapping that deletes the customer associated with the provided customer id
    @DeleteMapping("/{customerId}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable String customerId) {
        customerService.deleteCustomerByIdentifier(customerId);
        return new ResponseEntity<String>("Customer with ID: " + customerId + " was deleted", HttpStatus.OK);
    }

}

