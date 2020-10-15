package septmajorproject.bookingsys.model.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import septmajorproject.bookingsys.model.Booking;

@Mapper
public interface BookingMapper {
    //The booking mapper maps a bookingDto object to a booking object.
    BookingMapper INSTANCE = Mappers.getMapper(BookingMapper.class);

    @Mapping(source = "serviceType.serviceNo", target = "serviceNo")
    @Mapping(source = "serviceType.serviceName", target = "serviceName")
    @Mapping(source = "completed", target = "completed")
    BookingDto bookingToBookingDto(Booking booking);
}
