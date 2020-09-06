package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name="ROSTER")
/**
 * Roster entity in the table
 */
public class Roster {
    //many to one connection initialization for Employee table
    @ManyToOne
    @NotNull(message = "Employee required")
    @JoinColumn(name="employee_id", nullable=false)
    private Employee employee;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    //provides a unique id for each roster that is generated
    private long id;

    @NotNull(message = "Date cannot be null")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date rosterDate;

    @NotNull(message = "Time cannot be null")
    @JsonFormat(pattern = "HH:mm:ss")
    private Time rosterTime;

    /**
     * Default constructor
     */
    public Roster(){

    }

    /**
     * constructor
     * @param employee : employee
     */
    public Roster(Employee employee, Date rosterDate, Time rosterTime) {
        this.employee = employee;
        this.rosterDate = rosterDate;
        this.rosterTime = rosterTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long rosterId) {
        this.id = rosterId;
    }

    public void setRosterDate(Date rosterDate) {
        this.rosterDate = rosterDate;
    }

    public void setRosterTime(Time rosterTime) {
        this.rosterTime = rosterTime;
    }

    public Date getRosterDate() {
        return rosterDate;
    }

    public Time getRosterTime() {
        return rosterTime;
    }

    /**
     * set employee
     * @param employee : employee
     */
    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    /**
     * get employee
     * @return employee
     */
    public Employee getEmployee() {
        return employee;
    }
}
