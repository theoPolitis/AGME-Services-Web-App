package septmajorproject.bookingsys.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import septmajorproject.bookingsys.exception.RosterException;
import septmajorproject.bookingsys.model.Employee;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.repository.RosterRepository;
import septmajorproject.bookingsys.web.request.NewRosterCommand;

import java.util.List;

@Service
public class RosterService {

    @Autowired
    private RosterRepository rosterRepository;


    public Roster createOrUpdateRosterEntry(Roster roster) {
        return rosterRepository.save(roster);
    }


    public void deleteRosterByIdentifier(long id) {

        Roster found = rosterRepository.findRosterById(id);

        if (found == null) {
            throw new RosterException("Booking with ID: " + id + " does not exist");
        } else {
            rosterRepository.delete(found);
        }


    }

    public Roster findRosterByIdentificationNumber(long rosterId) {

        Roster rosterFound = rosterRepository.findRosterById(rosterId);

        if (rosterFound == null) {
            throw new RosterException("Roster with the id " + rosterId + " does not exist");
        } else {
            return rosterFound;
        }
    }

    public List<Roster> getAll() {
        return rosterRepository.findAll();
    }

    public List<Roster> findRostersByEmployee(Employee employee)
    {
        List<Roster> roster = rosterRepository.findAllByEmployee(employee);
        return roster;
    }

    public Roster updateExistingRoster(NewRosterCommand newRoster)
    {
        Roster rost = rosterRepository.findRosterById(newRoster.getId());
        if(rost == null)
        {
            return null;
        }
        rost.setSunday(newRoster.getSunday());
        rost.setMonday(newRoster.getMonday());
        rost.setTuesday(newRoster.getTuesday());
        rost.setWednesday(newRoster.getWednesday());
        rost.setThursday(newRoster.getThursday());
        rost.setFriday(newRoster.getFriday());
        rost.setSaturday(newRoster.getSaturday());
        rost.setRequestedSunday(newRoster.getRequestedSunday());
        rost.setRequestedMonday(newRoster.getRequestedMonday());
        rost.setRequestedTuesday(newRoster.getRequestedTuesday());
        rost.setRequestedWednesday(newRoster.getRequestedWednesday());
        rost.setRequestedThursday(newRoster.getRequestedThursday());
        rost.setRequestedFriday(newRoster.getRequestedFriday());
        rost.setRequestedSaturday(newRoster.getRequestedSaturday());
        rost.setIsApproved(newRoster.getIsApproved());
        rosterRepository.save(rost);
        return rost;
    }

    public List<Roster> findRostersByApproval(boolean b) {
        List<Roster> rosters = rosterRepository.findAllByIsApproved(b);
        return rosters;
    }
}
