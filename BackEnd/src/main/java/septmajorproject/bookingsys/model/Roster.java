package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name="ROSTER")
/**
 * Roster entity in the table
 */
public class Roster {
    @ManyToOne
    @JoinColumn(name="employee_id", nullable=false)
    // many to one connection with the employee table
    private Employee employee;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="roster_id")
    //provides a unique id for each roster that is generated
    private long rosterId;

    //i personally don't think that this thing is needed but we'll see if we need it
    @NotBlank(message = "Roster Identifier required")
    @Size(min=4, max=5, message="please enter 4 to 5 characters")
    @Column(updatable = false, unique = true)
    private String rosterIdentifier;

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



    public String getRosterIdentifier() {
        return rosterIdentifier;
    }

    public void setRosterIdentifier(String rosterIdentifier) {
        this.rosterIdentifier = rosterIdentifier;
    }

    public long getRosterId() {
        return rosterId;
    }

    public void setRosterId(long rosterId) {
        this.rosterId = rosterId;
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
