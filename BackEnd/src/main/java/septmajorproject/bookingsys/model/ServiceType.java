package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity

public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private long id;

    @Size(min = 1, max = Integer.MAX_VALUE, message = "Enter a Valid service number that is greater than one character.")
    @NotBlank(message = "Please Enter a service number.")
    private String serviceNo;

    @Size(min = 1, max = Integer.MAX_VALUE, message = "Enter a Valid service name that is greater than one character.")
    @NotBlank(message = "Please Enter a service name.")
    private String serviceName;

    @Size(min = 1, max = Integer.MAX_VALUE)
    @NotBlank(message = "Please Enter a start time for the week.")
    private String startTime;

    @Size(min = 1, max = Integer.MAX_VALUE)
    @NotBlank(message = "Please Enter a end time for the week.")
    private String endTime;


    //created and modified date for records following format yyyy-MM-dd
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updatedDate;


    //default constructor
    public ServiceType() {
    }

    //simple constructor for ServiceType
    public ServiceType(String serviceNo, String serviceName, String startTime, String endTime) {
        this.serviceNo = serviceNo;
        this.serviceName = serviceName;
        this.startTime = startTime;
        this.endTime = endTime;

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


    //getters and setters
    public String getServiceNo() {
        return serviceNo;
    }

    public void setServiceNo(String serviceNo) {
        this.serviceNo = serviceNo;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}

