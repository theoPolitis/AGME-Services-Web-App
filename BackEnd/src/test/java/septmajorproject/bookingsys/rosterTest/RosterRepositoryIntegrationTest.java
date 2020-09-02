package septmajorproject.bookingsys.rosterTest;


import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import septmajorproject.bookingsys.repository.RosterRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RosterRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RosterRepository rosterRepository;

    //generate the test data in this part
    @Before
    public  void setUp(){

    }

    //pretty much test getting data

}
