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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.util.Date;

@Data
@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id"
)
@Table(name = "BOOKING")
/**
 * Booking entity, has a connection between customer entity and employee entity, both
 * many to one connections.
 */
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

//    @EmbeddedId
//    private BookingPK bookingPK;

    //many to one connection initialization for Employee table
    @ManyToOne
    @NotNull(message = "Employee required")
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    //many to one connection initialization for Customer table
    @ManyToOne
    @NotNull(message = "Customer required")
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    //Many to one connection that maps the booking to a service, as a service can have many bookings
    @ManyToOne
    @JoinColumn(name = "service_type_id", nullable = false)
    private ServiceType serviceType;
    //Enforces that the date cannot be left as null
    @NotNull(message = "Please attach a date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date rosterDate;

    @NotNull(message = "Please attach a time")
    @JsonFormat(pattern = "HH:mm:ss")
    private Time rosterTime;
    //Boolean represents if the booking has been fulfilled by the employee.
    @Column(name = "completed", nullable = false)
    private boolean completed = Boolean.FALSE;

    public Booking() {
    }

    /**
     * Constructor
     *
     * @param date     : Date table entry
     * @param time     : Time table entry
     * @param employee : Employee table entry
     * @param customer : customer table entry
     */
    public Booking(Date date, Time time, Employee employee, Customer customer, ServiceType serviceType) {
        this.employee = employee;
        this.customer = customer;
        this.rosterDate = date;
        this.rosterTime = time;
        this.serviceType = serviceType;
    }

}
