package septmajorproject.bookingsys.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class BookingDto {

    //The lombok @Data tag auto-implements the setters and getters for each of the attributes

    //Each of these attributes match those present in the Booking model.
    private long id;

    //All of the DTOs replace the relevant model information that would be present in a booking object
    private EmployeeDto employee;

    private CustomerDto customer;

    private String serviceNo;

    private String serviceName;

    private boolean completed;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date rosterDate;

    @JsonFormat(pattern = "HH:mm:ss")
    private Time rosterTime;


}
