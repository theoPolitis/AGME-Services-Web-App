package septmajorproject.bookingsys.web.request;

import javax.validation.constraints.NotNull;

/**
 * Represents the request body that is sent for PUT requests
 */
public class NewRosterCommand {
    //Each of these attributes represent attributes in the roster model
    @NotNull(message = "Need an ID")
    private long id;
    @NotNull(message = "Need the Employee ID")
    private long employee;

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

    @NotNull(message = "Must have an Approval Status")
    private boolean isApproved;

    public long getId() {
        return id;
    }

    public boolean getIsApproved() {return isApproved;}

    public boolean getSunday() {
        return sunday;
    }

    public boolean getMonday() {
        return monday;
    }

    public boolean getTuesday() {
        return tuesday;
    }

    public boolean getWednesday() {
        return wednesday;
    }

    public boolean getThursday() {
        return thursday;
    }

    public boolean getFriday() {
        return friday;
    }

    public boolean getSaturday() {
        return saturday;
    }

    public boolean getRequestedSunday(){return requestedSunday;}

    public boolean getRequestedMonday(){return requestedMonday;}

    public boolean getRequestedTuesday(){return requestedTuesday;}

    public boolean getRequestedWednesday(){return requestedWednesday;}

    public boolean getRequestedThursday() {return requestedThursday;}

    public boolean getRequestedFriday() {return requestedFriday;}

    public boolean getRequestedSaturday() {return requestedSaturday;}
}
