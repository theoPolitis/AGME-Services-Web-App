package septmajorproject.bookingsys.bookingTest;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import septmajorproject.bookingsys.model.Booking;
import septmajorproject.bookingsys.model.Customer;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.ServiceType;
import septmajorproject.bookingsys.service.BookingService;
import septmajorproject.bookingsys.service.CustomerService;
import septmajorproject.bookingsys.service.EmployeeService;
import septmajorproject.bookingsys.service.ServiceTypeService;
import septmajorproject.bookingsys.web.BookingController;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@WebMvcTest(BookingController.class)
public class BookingControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private BookingService bookingService;

    @MockBean
    private EmployeeService employeeService;

    @MockBean
    private CustomerService customerService;

    @MockBean
    private ServiceTypeService serviceTypeService;

    @Autowired
    private ObjectMapper objectMapper;

    Time time = new Time(12,30,0);
    Date date = new Date(2020,8,27);

    Employee emp = new Employee("1234","Bob", "Smith", "bob@smith.com", "39593925", "123 street", "anotherOne", "test");
    Customer cust = new Customer("test", "test@email.com", "Julz", "riz", "123 street", "04373847545", "testSomething");

    ServiceType serviceType = new ServiceType("1", "haircut","08:00","20:00");
    Booking booking = new Booking(date, time, emp, cust, serviceType);
    Booking booking2 = new Booking(date, time, emp, cust, serviceType);

    @Before
    public void setUp() {

    }

    // Testing getting a booking via the ID from the API
    @Test
    public void givenBooking_whenGetBookingById_thenReturnBooking() throws Exception {

        given(bookingService.findBookingByIdentificationNumber(1234L)).willReturn(booking);

        mvc.perform(get("/api/booking/{bookingId}", "1234").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employee.firstName", is(emp.getFirstName()))
                );
    }

    // Test getting all active bookings in the database via the API
    @Test
    public void givenBooking_whenGetAllBookings_thenReturnBookingList() throws Exception {

        List<Booking> allBookings = new ArrayList<>();
        allBookings.add(booking);
        allBookings.add(booking2);

        given(bookingService.getBookings(null, null)).willReturn(allBookings);

        mvc.perform(get("/api/booking/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].employee.firstName", is(emp.getFirstName()))
                );

    }

    // Test deleting a booking with a given id via the API
    @Test
    public void givenBooking_whenDeleteBookingById_thenSuccessfulDeleteRequest() throws Exception {

        String deleteString = "Booking with ID: " + booking.getId() + " was deleted";

        mvc.perform(delete("/api/booking/{bookingId}", booking.getId()).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(deleteString))
        );
    }


}
