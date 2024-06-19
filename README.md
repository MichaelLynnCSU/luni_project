
### Explanation:

- **Building the Docker Image**: This section explains how to build your Docker image named `luni_v1` from the Dockerfile located in the current directory (`.`).
- docker build . -t luni_9901

- **Running the Docker Container**: This section explains how to run the Docker container based on the `luni_v1` image. It specifies the `-p 3000:3000` flag to map port 3000 from the container to port 3000 on the host machine.
- docker run -p 3000:3000

- **building new depends**: This section explains how to rebuild the json
- npm install
  
By using this format in your `README.md`, you provide clear instructions for anyone visiting your GitHub repository on how to build and run your Dockerized application. Adjust the instructions and details as necessary based on your specific Docker setup and application requirements.
