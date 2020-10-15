package septmajorproject.bookingsys.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class EmployeeDto {
    //The @Data tag is a lombok annotation that auto-implements all setters and getters for the attributes

    //Each of these attributes match attributes in the Employee model
    private long employeeId;
    private String employeeIdentifier;
    private boolean isAdmin;
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String phoneNumber;
    private String userName;
    private String serviceNo;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updatedDate;

}
