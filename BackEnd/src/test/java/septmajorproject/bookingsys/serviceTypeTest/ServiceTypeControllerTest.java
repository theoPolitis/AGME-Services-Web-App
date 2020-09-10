package septmajorproject.bookingsys.serviceTypeTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.service.EmployeeService;
import septmajorproject.bookingsys.service.MapValidationErrorService;
import septmajorproject.bookingsys.service.ServiceTypeService;
import septmajorproject.bookingsys.web.EmployeeController;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.MediaType;
import java.util.Arrays;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@WebMvcTest(EmployeeController.class)



public class ServiceTypeControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ServiceTypeService serviceTypeService;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;


    @Test
    public void givenServiceType_whenGetServiceType_thenReturnJsonArray() throws Exception{
        ServiceType ServiceType1 = new ServiceType("RC01","Room Cleaning");
        List<ServiceType> allServiceTypes = Arrays.asList(ServiceType1);

        given(serviceTypeService.findAllServiceType()).willReturn(allServiceTypes);

        mvc.perform(get("/api/serviceType/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].ServiceName", is(ServiceType1.getServiceName())));

    }

    @Test
    public void givenNoServiceType_whenGetServiceType_thenReturnNullArray() throws Exception{
        given(serviceTypeService.findAllServiceType()).willReturn(null);
        mvc.perform(get("/api/serviceType/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").doesNotExist());
    }


    @Test
    public void givenNewServiceType_whenPostNewServiceType_thenNewServiceTypeIsAdded() throws Exception {
        ServiceType ServiceType1 = new ServiceType("RC01","Room Cleaning");
        mvc.perform(post("/api/serviceType/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ServiceType1)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName", is(ServiceType1.getServiceName())));

    }



}
