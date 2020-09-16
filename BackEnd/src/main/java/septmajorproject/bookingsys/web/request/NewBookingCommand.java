package septmajorproject.bookingsys.web.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class NewBookingCommand {

    private String employeeIdentifier;

    private String customerIdentifier;

    private String serviceNo;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date rosterDate;

    @JsonFormat(pattern = "HH:mm:ss")
    private Time rosterTime;


}
