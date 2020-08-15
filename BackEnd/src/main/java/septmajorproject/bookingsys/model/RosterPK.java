package septmajorproject.bookingsys.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

@Embeddable
public class RosterPK implements Serializable {

    @NotNull
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date rosterDate;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private Time rosterTime;

    public RosterPK() {

    }

    public RosterPK(@NotNull Date rosterDate, @NotNull Time rosterTime) {
        this.rosterDate = rosterDate;
        this.rosterTime = rosterTime;
    }

    public Date getRosterDate() {
        return rosterDate;
    }

    public Time getRosterTime() {
        return rosterTime;
    }

    public void setRosterDate(Date rosterDate) {
        this.rosterDate = rosterDate;
    }

    public void setRosterTime(Time rosterTime) {
        this.rosterTime = rosterTime;
    }
}
