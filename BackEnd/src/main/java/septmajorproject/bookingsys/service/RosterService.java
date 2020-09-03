package septmajorproject.bookingsys.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.repository.RosterRepository;

import java.sql.Time;

@Service
public class RosterService {

    @Autowired
    private RosterRepository rosterRepository;

    public Roster saveOrUpdateRoster(Roster roster){
        try
        {
            return rosterRepository.save(roster);
        }
        catch
        {
            throw 
        }
    }

}
