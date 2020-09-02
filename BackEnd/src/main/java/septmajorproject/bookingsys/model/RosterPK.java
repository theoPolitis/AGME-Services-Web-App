package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

@Embeddable
/**
 * Roster table composite key class
 */
public class RosterPK implements Serializable {

    @NotNull(message = "Date cannot be null")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date rosterDate;

    @NotNull(message = "Time cannot be null")
    @JsonFormat(pattern = "HH:mm:ss")
    private Time rosterTime;

    /**
     * defalut constructor
     */
    public RosterPK() {

    }

    /**
     * constructor
     * @param rosterDate : date
     * @param rosterTime : time
     */
    public RosterPK(Date rosterDate, Time rosterTime) {
        this.rosterDate = rosterDate;
        this.rosterTime = rosterTime;
    }

    /**
     * get date
     * @return date
     */
    public Date getRosterDate() {
        return rosterDate;
    }

    /**
     * get time
     * @return time
     */
    public Time getRosterTime() {
        return rosterTime;
    }

    /**
     * set date
     * @param rosterDate : date
     */
    public void setRosterDate(Date rosterDate) {
        this.rosterDate = rosterDate;
    }

    /**
     * set time
     * @param rosterTime : time
     */
    public void setRosterTime(Time rosterTime) {
        this.rosterTime = rosterTime;
    }
}
