package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Data
@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id"
)
@Table(name = "CUSTOMER")
public class Customer {
    //Customer ID is the primary key, it is just simply a unique integer used to identify each customer
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "customer_id")
    private Long id;
    @NotBlank(message = "Identification number cannot be blank")
    @Column(updatable = false, unique = true)
    private String identificationNumber;

    //Password will be stored as an encrypted string
    @NotBlank(message = "Please enter a password")
    private String password;
    //Email will be checked using a regular expression prior to being stored in the table
    @NotBlank(message = "Please enter an email address")
    private String email;
    //Firstname will be checked against a regular expression prior to being stored in the database,
    //the @Size tag is used to ensure the firstname field is atleast 1 character long
    @Size(min = 1, max = Integer.MAX_VALUE, message = "Please enter a first name of at least 1 character length")
    @NotBlank(message = "First Name can not be Blank")
    private String firstName;
    //Similarly to the firstname, lastname will also being enforced as being atleast one character long
    @Size(min = 1, max = Integer.MAX_VALUE, message = "Please enter a last name of at least 1 character length")
    @NotBlank(message = " Last name can not blank")
    private String lastName;
    //Address will be checked against a regular expression
    @NotBlank(message = "Please enter an address")
    private String address;
    //Phone number is of type Integer as the primative int type cannot be used.
    @NotBlank(message = "Phone Number can not be blank")

    private String phoneNumber;
    //Username will be forced into being between 3 and 20 characters, but will also be
    @Size(min = 3, max = 20, message = "Please enter a username between 3-20 characters")
    @Column(unique = true, updatable = false)
    @NotBlank(message = "userName cannot be blank")
    private String username;
    //Created date will be forced into the corresponding Json format
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdDate;
    //updatedDate will be also forced into the corresponding Json format, this attribute will be updated
    //whenever the relevant item in the database is updated.
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updatedDate;
    //The customer id will be used as a foreign key in the booking table, and has a one to many relationship
    //As many bookings can be made by the one Customer.
    @OneToMany(mappedBy = "customer")
    private List<Booking> customerList;

    //When the Customer is created the createdDate object is created and corresponds to the current date.
    @PrePersist
    protected void onCreated() {
        this.createdDate = new Date();
    }

    //Whenever the customer object is updated the updatedDate is then also updated.
    @PreUpdate
    protected void onUpdate() {
        this.updatedDate = new Date();
    }

    //default constructor
    public Customer() {
    }

    public Customer(String password, String email, String firstName, String lastName, String address, String phoneNumber, String username) {
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.username = username;
    }


    public Customer(String firstName, String lastName, String email, String address, String username,
                    String phoneNumber, String password, String id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.identificationNumber = id;
    }


}
