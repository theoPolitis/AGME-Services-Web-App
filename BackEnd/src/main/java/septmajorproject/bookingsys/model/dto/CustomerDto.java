package septmajorproject.bookingsys.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class CustomerDto {
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
