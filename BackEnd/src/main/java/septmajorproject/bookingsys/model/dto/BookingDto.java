package septmajorproject.bookingsys.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class BookingDto {

    private long id;

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
