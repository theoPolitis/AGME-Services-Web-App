package septmajorproject.bookingsys.model.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import septmajorproject.bookingsys.model.Booking;

@Mapper
public interface BookingMapper {

    BookingMapper INSTANCE = Mappers.getMapper(BookingMapper.class);

    @Mapping(source = "serviceType.serviceNo", target = "serviceNo")
    @Mapping(source = "serviceType.serviceName", target = "serviceName")
    @Mapping(source = "completed", target = "completed")
    BookingDto bookingToBookingDto(Booking booking);
}
