
### Explanation:

- **Building the Docker Image**: This section explains how to build your Docker image named `luni_v1` from the Dockerfile located in the current directory (`.`).
<<<<<<< Updated upstream
- docker build . -t luni_9901

- **Running the Docker Container**: This section explains how to run the Docker container based on the `luni_v1` image. It specifies the `-p 3000:3000` flag to map port 3000 from the container to port 3000 on the host machine.
- docker run -p 3000:3000

- **building new depends**: This section explains how to rebuild the json
- npm install
  
# Project Name

Brief description or introduction to your project.

## Files and Directories to Remove

Before proceeding, ensure that you have backed up any important files you do not want to lose.

### Directories

- `node_modules/`
- `dist/`
- `.idea/`
- `.docker/`
- `functions/`
- `public/`
- `uploads/`
- `.firebase/`

### Files

- `.env*` (e.g., `.env-smaple`)
- `filelist.txt`
- `file_and_dir_list.txt`
- `test-results.txt`
- `firebase.json`
- `firestore.indexes.json`
- `firestore.rules`
- `package-lock.json`

## Instructions for Removal

1. **Verify**: Double-check your repository to ensure these files and directories are present.
   
2. **Git Commands**: Use the following commands to remove them from Git's tracking without deleting them from your local filesystem:

   ```bash
   git rm -r --cached node_modules
   git rm -r --cached dist
   git rm -r --cached .env*
   git rm -r --cached .idea
   git rm -r --cached .docker
   git rm -r --cached functions
   git rm -r --cached public
   git rm -r --cached uploads
   git rm -r --cached filelist.txt
   git rm -r --cached file_and_dir_list.txt
   git rm -r --cached test-results.txt
   git rm -r --cached .firebase
   git rm -r --cached firebase.json
   git rm -r --cached firestore.indexes.json
   git rm -r --cached firestore.rules
   git rm -r --cached README.md
   git rm -r --cached package-lock.json



