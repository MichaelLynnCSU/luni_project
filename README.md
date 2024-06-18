# build in the directory with the docker file
docker build -t luni_v1 .
#run the docker image after you start the container from power shell using the command below
docker run -p 3000:3000 luni_v1

