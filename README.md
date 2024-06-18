# Project Deployment Instructions

This document outlines the steps to deploy the project.

## SSH Access

1. Open your terminal.
2. Connect to the server using SSH:
   ```sh
   ssh root@1.22.34.44
   ```
   When prompted, enter the password for the root user.

## Navigating the Directory

1. To list the contents of the current directory:
   ```sh
   ls
   ```

2. Navigate to the directory you want to update:
   ```sh
   cd /path/to/your/directory
   ```

## Updating the Code

1. Pull the latest changes from the current branch or main branch:
   ```sh
   git pull origin <branch-name>
   ```
   Replace `<branch-name>` with the name of the branch you want to pull from (e.g., main).

## Starting the Server

1. Ensure you have a `.env` file in your project directory with the required environment variables.
2. Use pm2 commands to start and reload the server:
   ```sh
   pm2 restart npm --name "jayaba_server" -- start
   ```
3. Test the nginx configuration:
   ```sh
   sudo nginx -t
   ```
4. Restart nginx to apply the changes:
   ```sh
   systemctl restart nginx
   ```

## Summary

1. SSH into the server
2. Navigate to the desired directory
3. Pull the latest code from the repository
4. Ensure the `.env` file is in place
5. Use pm2 and nginx commands to start and manage the server

By following these steps, you can ensure that your project is updated and built correctly before deployment.

You can save this content in a file named `README.md`. This file will serve as a comprehensive guide for deploying the project.

## Starting the Project

To start the project, run the following command:
   ```sh  
npm install
npm run dev, 
npm run build,
   ```