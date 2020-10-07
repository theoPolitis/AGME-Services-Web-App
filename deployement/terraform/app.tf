resource "aws_key_pair" "deployer" {
  key_name   = "deploy"
  public_key = var.public_key
}

resource "aws_launch_configuration" "booking_sys" {
  name            = "web_config"
  image_id        = var.ami_id
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.allow_http_ssh.id]

  key_name = aws_key_pair.deployer.key_name
}

resource "aws_lb_target_group" "booking_sys" {
  name     = "booking-system-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

resource "aws_autoscaling_group" "booking_sys" {
  name                 = "terraform-asg-example"
  launch_configuration = aws_launch_configuration.booking_sys.name
  min_size             = 1
  max_size             = 1
  vpc_zone_identifier  = [aws_subnet.private_az1.id, aws_subnet.private_az2.id, aws_subnet.private_az3.id]
  target_group_arns    = [aws_lb_target_group.booking_sys.arn]
}

resource "aws_lb" "booking_sys" {
  name               = "todo-app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_http_ssh.id]
  subnets            = [aws_subnet.public_az1.id, aws_subnet.public_az2.id, aws_subnet.public_az3.id]

  tags = {
    Enviroment = "production"
  }
}

resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.booking_sys.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.booking_sys.arn
  }
}

