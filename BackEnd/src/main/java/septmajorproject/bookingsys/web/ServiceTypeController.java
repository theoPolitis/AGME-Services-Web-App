package septmajorproject.bookingsys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.service.MapValidationErrorService;
import septmajorproject.bookingsys.service.ServiceTypeService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/serviceType")
@CrossOrigin
public class ServiceTypeController {
    @Autowired
    private ServiceTypeService serviceTypeService;

    @Autowired
    private MapValidationErrorService mapValidation;

    //Post mapping that generates a new service
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
    //Get mapping that returns all services in the backend
    @GetMapping("/all")
    public List<ServiceType> getAllServiceType() {
        return serviceTypeService.findAllServiceType();
    }

    //Get mapping that returns the service associated with the given id
    @GetMapping("/{serviceTypeNo}")
    public ResponseEntity<?> getServiceTypeByNo(@PathVariable String serviceTypeNo) {
        ServiceType serviceType = serviceTypeService.findByServiceNo(serviceTypeNo);

        return new ResponseEntity<ServiceType>(serviceType, HttpStatus.OK);
    }
    //Delete mapping that deletes the service associated with the given id
    @DeleteMapping("/{serviceTypeNo}")
    public ResponseEntity<?> deleteServiceTypeByNo(@PathVariable String serviceTypeNo) {
        serviceTypeService.deleteServiceTypeByNo(serviceTypeNo);

        return new ResponseEntity<String>("service type with number: " + serviceTypeNo + " was deleted", HttpStatus.OK);
    }
    //Put mapping that updates the service associated with the given id using the values given in the requestBody
    @PutMapping("/{serviceNo}")
    public ResponseEntity<?> updateServicetype(@PathVariable String serviceNo, @RequestBody Map<String, String> serviceTypeDataMap, BindingResult result){
        ResponseEntity<?> errorMap = mapValidation.MapValidationService(result);

        if(errorMap != null){
            return errorMap;
        }

        serviceTypeService.updateExistingServiceType(serviceNo,serviceTypeDataMap);

        return new ResponseEntity<>(serviceTypeDataMap,HttpStatus.OK);
    }

}
