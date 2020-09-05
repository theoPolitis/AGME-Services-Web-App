package septmajorproject.bookingsys.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import septmajorproject.bookingsys.model.Roster;
import septmajorproject.bookingsys.repository.RosterRepository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.util.Date;
import java.util.Optional;

@Service
public class RosterService {

    @Autowired
    private final RosterRepository rosterRepository;

    public RosterService(RosterRepository rosterRepository){
        this.rosterRepository = rosterRepository;
    }


    public void createOrUpdateRosterEntry(Roster roster){
        rosterRepository.save(roster);
    }

    public void deleteRosterEntryByRoster(Roster roster){

//        final Roster rosterToDelete = rosterRepository.findByDateAndTime(date,time);
//        rosterRepository.delete(rosterToDelete);

        EntityManagerFactory entityManagerFactory= Persistence.createEntityManagerFactory("rosterDetails");
        EntityManager entityManager=entityManagerFactory.createEntityManager();


        Roster rosterEntry = entityManager.find(Roster.class,roster.getRosterId());

        entityManager.remove(rosterEntry);
        entityManager.getTransaction().commit();
        entityManagerFactory.close();
        entityManager.close();
    }

}
