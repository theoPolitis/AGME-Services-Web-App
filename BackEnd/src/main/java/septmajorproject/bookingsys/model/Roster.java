package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name="ROSTER")
public class Roster {
    @ManyToOne
    @JoinColumn(name="employee_id", nullable=false)
    private Employee employee;

    @EmbeddedId
    private RosterPK rosterPK;

    public Roster(){

    }

    public Roster(Employee employee, RosterPK rosterPK) {
        this.employee = employee;
        this.rosterPK = rosterPK;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setRosterPK(RosterPK rosterPK) {
        this.rosterPK = rosterPK;
    }

    public RosterPK getRosterPK() {
        return rosterPK;
    }
}
