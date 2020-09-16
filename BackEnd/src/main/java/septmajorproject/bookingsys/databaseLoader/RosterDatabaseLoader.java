package septmajorproject.bookingsys.databaseLoader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import septmajorproject.bookingsys.repository.RosterRepository;

@Component
public class RosterDatabaseLoader implements CommandLineRunner {
    private final RosterRepository rosterRepository;

    @Autowired
    public RosterDatabaseLoader(RosterRepository rosterRepository) {
        this.rosterRepository = rosterRepository;
    }


    //loads rosters into the database
    @Override
    public void run(String... args) throws Exception {

//        this.rosterRepository.save(new Roster(
//
//                "1234",
//                "2020-8-27",
//                "12:30:00"));


//        Roster r1 = new Roster(
//                "E1234",
//                "2020-8-27",
//                "12:30:00")),
//
//        rosterRepository.save(r1);
//


    }
}

