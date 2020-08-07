package septmajorproject.bookingsys.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.*;
import java.util.Date;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String password;
    private String email;
    @Size(min=1, max = Integer.MAX_VALUE, message = "Please enter a first name of at least 1 character length")
    private String firstName;
    @Size(min=1,max = Integer.MAX_VALUE,message = "Please enter a last name of at least 1 character length")
    private String lastName;
    private String address;
    private Integer phoneNumber;
    @Size(min=3, max = 20, message = "Please enter a username between 3-20 characters")
    private String username;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdDate;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updatedDate;

    @PrePersist
    protected void onCreated(){
        this.createdDate = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedDate = new Date();
    }
    public Customer()
    {
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Integer getId()
    {
        return id;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getFirstName()
    {
        return this.firstName;
    }

    public void setFirstname(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return this.lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getUsername()
    {
        return this.username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public Integer getPhoneNumber()
    {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber)
    {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress()
    {
        return address;
    }

    public void setAddress(String address)
    {
        this.address = address;
    }
}
