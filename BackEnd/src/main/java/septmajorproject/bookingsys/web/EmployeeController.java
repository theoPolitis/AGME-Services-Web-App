package septmajorproject.bookingsys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.service.EmployeeService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("")
    public ResponseEntity<?> createNewEmployee(@Valid @RequestBody Employee employee, BindingResult result){
        //cleans up the error message that is displayed
        //benefits when developing the front end
        if(result.hasErrors()){
            Map<String, String> errorMap = new HashMap<>();
            for(FieldError error : result.getFieldErrors()){
                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
            }
        }

        Employee employee1 = employeeService.saveOrUpdateEmployee(employee);

        return new ResponseEntity<Employee>(employee, HttpStatus.CREATED);
    }
}
