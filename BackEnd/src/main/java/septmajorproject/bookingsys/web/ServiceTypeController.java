package septmajorproject.bookingsys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.service.MapValidationErrorService;
import septmajorproject.bookingsys.service.ServiceTypeService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/serviceType")
public class ServiceTypeController {
    @Autowired
    private ServiceTypeService serviceTypeService;

    @Autowired
    private MapValidationErrorService mapValidation;


    @PostMapping("")
    public ResponseEntity<?> createNewServiceType(@Valid @RequestBody ServiceType serviceType, BindingResult result) {
        //cleans up the error message that is displayed
        //benefits when developing the front end
        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);

        if (errorMap != null) {
            return errorMap;
        }


        ServiceType serviceType1 = serviceTypeService.saveOrUpdateService(serviceType);
        return new ResponseEntity<ServiceType>(serviceType, HttpStatus.CREATED);

    }

        @GetMapping("/all")
        public List<ServiceType> getAllServiceType()
        {
            return serviceTypeService.findAllServiceType();
        }



    @GetMapping("/{serviceTypeNo}")
    public ResponseEntity<?> getServiceTypeByNo(@PathVariable String serviceTypeNo){
        ServiceType serviceType = serviceTypeService.findByServiceNo(serviceTypeNo);

        return new ResponseEntity<ServiceType>(serviceType, HttpStatus.OK);
    }



    @DeleteMapping("/{serviceTypeNo}")
    public ResponseEntity<?> deleteServiceTypeByNo(@PathVariable String serviceTypeNo){
        serviceTypeService.deleteServiceTypeByNo(serviceTypeNo);

        return new ResponseEntity<String>("service type with number: " + serviceTypeNo + " was deleted", HttpStatus.OK);
    }

}
