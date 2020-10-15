package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.util.Date;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@Table(name = "ROSTER")
/**
 * Roster entity in the table
 */
public class Roster {
    //many to one connection initialization for Employee table
    @OneToOne
    @NotNull(message = "Employee required")
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    //provides a unique id for each roster that is generated
    private long id;
    /*
     * Booleans represent availability on each week day
     *
     * Requested booleans represent the employees requested availability changes
     */
    @NotNull(message = "Every day must be accounted for : Sunday not filled")
    private boolean sunday;

    @NotNull(message = "Every day must be accounted for : Monday not filled")
    private boolean monday;

    @NotNull(message = "Every day must be accounted for : Tuesday not filled")
    private boolean tuesday;

    @NotNull(message = "Every day must be accounted for : Wednesday not filled")
    private boolean wednesday;

    @NotNull(message = "Every day must be accounted for : Thursday not filled")
    private boolean thursday;

    @NotNull(message = "Every day must be accounted for : Friday not filled")
    private boolean friday;

    @NotNull(message = "Every day must be accounted for : Saturday not filled")
    private boolean saturday;

    @NotNull(message = "Every day must be accounted for : Sunday not filled")
    private boolean requestedSunday;

    @NotNull(message = "Every day must be accounted for : Monday not filled")
    private boolean requestedMonday;

    @NotNull(message = "Every day must be accounted for : Tuesday not filled")
    private boolean requestedTuesday;

    @NotNull(message = "Every day must be accounted for : Wednesday not filled")
    private boolean requestedWednesday;

    @NotNull(message = "Every day must be accounted for : Thursday not filled")
    private boolean requestedThursday;

    @NotNull(message = "Every day must be accounted for : Friday not filled")
    private boolean requestedFriday;

    @NotNull(message = "Every day must be accounted for : Saturday not filled")
    private boolean requestedSaturday;
    //Boolean used to represent if the roster currently has changes requested.
    @NotNull(message = "Must give an approval status")
    private boolean isApproved;

    /**
     * Default constructor
     */
    public Roster() {
        this.sunday = true;
        this.monday = true;
        this.tuesday = true;
        this.wednesday = true;
        this.thursday = true;
        this.friday = true;
        this.saturday = true;
        this.requestedSunday = true;
        this.requestedMonday = true;
        this.requestedTuesday = true;
        this.requestedWednesday = true;
        this.requestedThursday = true;
        this.requestedFriday = true;
        this.requestedSaturday = true;
        this.isApproved = true;
    }

    /**
     * constructor : By default sets all booleans to true
     *
     * @param employee : employee
     *
     */
    public Roster(Employee employee) {
        this.employee = employee;
        this.sunday = true;
        this.monday = true;
        this.tuesday = true;
        this.wednesday = true;
        this.thursday = true;
        this.friday = true;
        this.saturday = true;
        this.requestedSunday = true;
        this.requestedMonday = true;
        this.requestedTuesday = true;
        this.requestedWednesday = true;
        this.requestedThursday = true;
        this.requestedFriday = true;
        this.requestedSaturday = true;
        this.isApproved = true;
    }

    /**
     * constructor : By default sets all booleans to true
     *
     * @param employee : employee
     * @param sunday : sunday
     * @param monday : monday
     * @param tuesday : tuesday
     * @param wednesday : wednesday
     * @param thursday : thursday
     * @param friday : friday
     * @param saturday : saturday
     */
    public Roster(Employee employee,  boolean sunday, boolean monday, boolean tuesday,
                  boolean wednesday, boolean thursday, boolean friday, boolean saturday) {
        this.employee = employee;
        this.sunday = sunday;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
        this.requestedSunday = sunday;
        this.requestedMonday = monday;
        this.requestedTuesday = tuesday;
        this.requestedWednesday = wednesday;
        this.requestedThursday = thursday;
        this.requestedFriday = friday;
        this.requestedSaturday = saturday;
        this.isApproved = true;
    }


    public long getId() {
        return id;
    }

    public boolean getSunday() { return sunday;}

    public void setSunday(boolean sunday){this.sunday = sunday;}

    public boolean getRequestedSunday() { return requestedSunday;}

    public void setRequestedSunday(boolean requestedSunday){this.requestedSunday = requestedSunday;}

    public boolean getMonday() { return monday;}

    public void setMonday(boolean monday){this.monday = monday;}

    public boolean getRequestedMonday() { return requestedMonday;}

    public void setRequestedMonday(boolean requestedMonday){this.requestedMonday = requestedMonday;}

    public boolean getTuesday() { return tuesday;}

    public void setTuesday(boolean tuesday){this.tuesday = tuesday;}

    public boolean getRequestedTuesday() { return requestedTuesday;}

    public void setRequestedTuesday(boolean requestedTuesday){this.requestedTuesday = requestedTuesday;}

    public boolean getWednesday() { return wednesday;}

    public void setWednesday(boolean wednesday){this.wednesday = wednesday;}

    public boolean getRequestedWednesday() { return requestedWednesday;}

    public void setRequestedWednesday(boolean requestedWednesday){this.requestedWednesday = requestedWednesday;}

    public boolean getThursday() { return thursday;}

    public void setThursday(boolean thursday){this.thursday = thursday;}

    public boolean getRequestedThursday() { return requestedThursday;}

    public void setRequestedThursday(boolean requestedThursday){this.requestedThursday = requestedThursday;}

    public boolean getFriday() { return friday;}

    public void setFriday(boolean friday){this.friday = friday;}

    public boolean getRequestedFriday() { return requestedFriday;}

    public void setRequestedFriday(boolean requestedFriday){this.requestedFriday = requestedFriday;}

    public boolean getSaturday() { return saturday;}

    public void setSaturday(boolean saturday){this.saturday = saturday;}

    public boolean getRequestedSaturday() { return requestedSaturday;}

    public void setRequestedSaturday(boolean requestedSaturday){this.requestedSaturday = requestedSaturday;}

    public boolean getIsApproved() {return isApproved;}

    public void setIsApproved(boolean isApproved) {this.isApproved = isApproved;}

    public void setId(long rosterId) {
        this.id = rosterId;
    }


    /**
     * set employee
     *
     * @param employee : employee
     */
    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    /**
     * get employee
     *
     * @return employee
     */
    public Employee getEmployee() {
        return employee;
    }
}
