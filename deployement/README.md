How to set up auto deployment for a new AWS account:

1. Set up AWS credentials on local machine
2. Go into terraform file and run terraform with the make up command
3. log into AWS and get the ip address of the EC2 instance
4. Go to the ansible file and go to inventory.yml and change the ip address to the ip of the newly created EC2 instance
5. Go to CircleCi and set up enviroment variables from below
    - AWS_ACCESS_KEY_ID
    - AWS_ACCOUNT_ID
    - AWS_DEFAULT_REGION
    - AWS_RESOURCE_NAME_PREFIX
    - AWS_SECRET_ACCESS_KEY
    - AWS_SESSION_TOKEN
    
6. Add a new SSH key to CircleCI leave hostname as blank and copy the contents of the private key id_rsa(that is provided in the deployement file and paste it into the text field
7. Go to app.js and add the new EC2 ip to state variable hostName.
8. make a change on master to trigger CircleCI

How to run autodeployemnt with CIRCLECI
1. Run steps 1 - 4 in the previous tuturial
2. Add id_rsa to .ssh file on your computer
3. Change the following variables in Playbook.yml with the information in the AWS classroom
  - aws_access_key_id: ""
  - aws_secret_access_key: ""
  - aws_session_token: ""

4. Run the playbook with the following command from the ansible directory
  - ansible-playbook -i inventory.yml -u ec2-user playbook.yml
5. the playbook should run and use the latest image in AWS ECR
