package septmajorproject.bookingsys.model;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "BOOKING")
public class Booking {

    @EmbeddedId
    private BookingPK bookingPK;

    @ManyToOne
    @JoinColumn(name="employee_id", nullable=false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public Booking() {
    }

    public Booking(BookingPK bookingPK, Employee employee, Customer customer) {
        this.bookingPK = bookingPK;
        this.employee = employee;
        this.customer = customer;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setBookingPK(BookingPK bookingPK) {
        this.bookingPK = bookingPK;
    }

    public BookingPK getBookingPK() {
        return bookingPK;
    }
}
