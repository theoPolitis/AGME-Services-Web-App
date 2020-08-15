package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

@Embeddable
public class BookingPK implements Serializable {

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date rosterDate;

    @JsonFormat(pattern = "HH:mm")
    private Time rosterTime;

    public BookingPK() {
    }

    public BookingPK(Date rosterDate, Time rosterTime) {
        this.rosterDate = rosterDate;
        this.rosterTime = rosterTime;
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
}
