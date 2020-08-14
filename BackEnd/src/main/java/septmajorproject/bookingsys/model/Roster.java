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

    @Id
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date rosterDate;
    @Id
    @JsonFormat(pattern = "HH:mm")
    private Time rosterTime;

    public Roster(){

    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setRosterDate(Date rosterDate) {
        this.rosterDate = rosterDate;
    }

    public void setRosterTime(Time rosterTime) {
        this.rosterTime = rosterTime;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Date getRosterDate() {
        return rosterDate;
    }

    public Time getRosterTime() {
        return rosterTime;
    }
}
