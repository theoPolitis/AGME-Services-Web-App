package septmajorproject.bookingsys.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class ServiceTypeException extends RuntimeException {

    public ServiceTypeException(String message) {
        super(message);
    }
}


