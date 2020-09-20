package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.*;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.util.Date;

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
    @JoinColumn(name="employee_id", nullable=false)
    private Employee employee;

    //many to one connection initialization for Customer table
    @ManyToOne
    @NotNull(message = "Customer required")
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @NotNull(message = "Please attach a date")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date rosterDate;

    @NotNull(message = "Please attach a time")
    @JsonFormat(pattern = "HH:mm:ss")
    private Time rosterTime;

    public Booking() {
    }

    /**
     * Constructor
     * @param date : Date table entry
     * @param time : Time table entry
     * @param employee : Employee table entry
     * @param customer : customer table entry
     */
    public Booking(Date date, Time time, Employee employee, Customer customer) {
        this.employee = employee;
        this.customer = customer;
        this.rosterDate = date;
        this.rosterTime = time;
    }

    /**
     * get id
     * @return id
     */
    public long getId() {
        return id;
    }

    /**
     * get employee
     * @return employee
     */
    public Employee getEmployee() {
        return employee;
    }

    /**
     * get customer
     * @return customer
     */
    public Customer getCustomer() {
        return customer;
    }

    /**
     * get rosterDate
     * @return rosterDate
     */
    public Date getRosterDate() {
        return rosterDate;
    }

    /**
     * get rosterTIme
     * @return rosterTIme
     */
    public Time getRosterTime() {
        return rosterTime;
    }


    /**
     * set employee to the given object of employee
     * @param employee: employee object
     */
    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    /**
     * set customer to the given object of customer
     * @param customer: customer object
     */
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    /**
     * set roster date to the given date object
     * @param rosterDate: customer object
     */
    public void setRosterDate(Date rosterDate) {
        this.rosterDate = rosterDate;
    }

    /**
     * set roster time to the given time object
     * @param rosterTime: customer object
     */
    public void setRosterTime(Time rosterTime) {
        this.rosterTime = rosterTime;
    }

//    /**
//     * Booking table composite key set function
//     * @param bookingPK: booking table composite key
//     */
//    public void setBookingPK(BookingPK bookingPK) {
//        this.bookingPK = bookingPK;
//    }
//
//    /**
//     * get the booking table compostie key
//     * @return composite key
//     */
//    public BookingPK getBookingPK() {
//        return bookingPK;
//    }
}
