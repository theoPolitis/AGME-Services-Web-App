package septmajorproject.bookingsys.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class CustomerDto {
    //The @Data tag is a lombok annotation that auto-implements all setters and getters for the attributes

    //Each of these attributes match the attributes in the Customer model
    private Long id;
    private String identificationNumber;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private String username;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updatedDate;
}
