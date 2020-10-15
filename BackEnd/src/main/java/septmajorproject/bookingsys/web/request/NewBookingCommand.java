package septmajorproject.bookingsys.web.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Time;
import java.util.Date;

/**
 * Represents the request body that would be sent for post/put requests from the front end.
 */

@Data
public class NewBookingCommand {
    //Lombok auto-implements setters and getters for each of these attributes
    private String employeeIdentifier;

    private String customerIdentifier;

    private String serviceNo;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date rosterDate;

    @JsonFormat(pattern = "HH:mm:ss")
    private Time rosterTime;


}
