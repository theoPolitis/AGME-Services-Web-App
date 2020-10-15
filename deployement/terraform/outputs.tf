//outputs our end point in the shell console
output "endpoint" {
  value = aws_lb.booking_sys.dns_name
}