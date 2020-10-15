package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "employeeId"
)
@Table(name = "EMPLOYEE")
public class Employee {
    //values that make up a person object and the sql table
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "employee_id")
    //provides a unique id for each employee that is generated
    private long employeeId;
    //Another attribute that is used similarly to the employeeId, more of a user friendly tag used in the front end.
    @NotBlank(message = "Employee Identifier required")
    @Column(updatable = false, unique = true)
    private String employeeIdentifier;
    //a basic attribute to determine admin priveledges, much simpler than generating a new extended class.
    private boolean isAdmin;
    @Size(min = 3, max = Integer.MAX_VALUE, message = "Enter a Valid first name that is greater than two character.")
    @NotBlank(message = "Please Enter a First Name.")
    private String firstName;
    @Size(min = 3, max = Integer.MAX_VALUE, message = "Enter a Valid last name that is greater than 1 character")
    @NotBlank(message = "Please Enter a Last Name.")
    private String lastName;
    @NotBlank(message = "Please Enter an Address.")
    private String address;
    @NotBlank(message = "Please Enter an Address.")
    private String email;
    private String phoneNumber;
    @NotBlank(message = "Password cannot be blank")
    private String password;
    @NotBlank(message = "UserName cannot be blank")
    private String userName;
    @JsonProperty("serviceNo")
    @NotBlank(message = "serviceNo cannot be blank")
    private String serviceNo;
    //created and modified date for records following format yyyy-MM-dd
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updatedDate;

    //foreign keys to other databases
    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
    private Roster roster;

    //default constructor
    public Employee() {

    }

    //simple constructor for employees
    public Employee(String employeeIdentifier, String firstName, String lastName, String email, String phoneNumber, String address, String userName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.userName = userName;
        this.password = password;
        this.employeeIdentifier = employeeIdentifier;
    }

    //updates the date variables automatically with annotations
    @PrePersist
    protected void onCreate() {
        this.createdDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedDate = new Date();
    }

    /*
     *  Setters and Getters below:
     */
    public String getEmployeeIdentifier() {
        return employeeIdentifier;
    }

    public void setEmployeeIdentifier(String employeeIdentifier) {
        this.employeeIdentifier = employeeIdentifier;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoster(Roster roster) {
        this.roster = roster;
    }

    public Roster getRoster() {
        return roster;
    }

    public void setServiceNo(String serviceNo) {
        this.serviceNo = serviceNo;
    }

    public String getServiceNo() {
        return this.serviceNo;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }


}
