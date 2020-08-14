package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="EMPLOYEE")
public class Employee {
    //values that make up a person object and the sql table
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="employee_id")
    private long id;
    private boolean isAdmin;
    @Size(min=1, max= Integer.MAX_VALUE , message="Enter a Valid first name that is greater than one character.")
    @NotBlank(message="Please Enter a First Name.")
    private String firstName;
    @Size(min=3, max=Integer.MAX_VALUE, message="Enter a Valid last name that is greater than 1 character")
    @NotBlank(message="Please Enter a Last Name.")
    private String lastName;
    @NotBlank(message="Please Enter an Address.")
    private String address;
    @NotBlank(message="Please Enter an Address.")
    private String email;
    private int phoneNumber;
    @Size(min=8, max=Integer.MAX_VALUE, message="Enter a Valid password that is greater than 8 charcters")
    @NotBlank(message="Password cannot be blank")
    private String password;

    //created and modified date for records following format yyyy-mm-dd
    @JsonFormat(pattern="yyyy-mm-dd")
    private Date createdDate;
    @JsonFormat(pattern="yyyy-mm-dd")
    private Date updatedDate;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JoinColumn(name="employee_id", referencedColumnName = "employee_id")
    private List<Roster> rosterArray;

    //default constructor
    public Employee(){
    }

    //updates the date variables automatically with annotations
    @PrePersist
    protected void onCreate(){
        this.createdDate = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedDate = new Date();
    }

    //getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
