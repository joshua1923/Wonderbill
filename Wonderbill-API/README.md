# Wonderbill-API

I have left Controllers - old folder to show thought process behind dealing with faults.

I used the code provided as a standalone API where I configured it to run on docker.

# Docker commands:
docker build . -t datahog
docker run -p 3000:3000 -d datahog

