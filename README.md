# Ansible Tower POC - Deploying Node.js App on Minikube

## Overview
This project automates the deployment of a Node.js application on Minikube using Ansible workflows. The playbooks facilitate the setup of required infrastructure, including MySQL and Kubernetes namespaces, while leveraging Ansible AWX for orchestration.

## Prerequisites
Ensure the following dependencies are installed before running the playbooks:

- **Ansible AWX** (or Ansible Tower) [Installation Guide](https://www.linuxtechi.com/install-ansible-awx-on-ubuntu/)
- **Minikube** (for Kubernetes deployment)
- **Docker** (for building and pushing the Node.js application image)

## Project Structure
The project consists of Ansible playbooks organized by their purpose:

### 1. Workflow Playbooks (Executed in AWX Workflow)
These playbooks are executed sequentially as part of the deployment workflow in Ansible Tower.

- [`git-pull.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/git-pull.yml) - Clones the latest Node.js application source code from the repository.
- [`docker-build.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/docker-build.yml) - Builds a Docker image for the Node.js application.
- [`create-namespace.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/create-namespace.yml) - Creates the required Kubernetes namespace in Minikube.
- [`deploy_mysql.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/deploy_mysql.yml) - Deploys a MySQL database in Kubernetes.
- [`deploy_node.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/deploy_node.yml) - Deploys the Node.js application in Minikube.

### 2. Single Deploy Playbooks (Standalone Playbooks)
These playbooks can be executed independently to deploy specific services.

- [`app-deploy-playbook.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/app-deploy-playbook.yml) - Deploys the Node.js application via single playbook using roles.

### 3. Linux Server patching Playbooks
- [`Patching.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/Patching.yml) - Performs system package updates, upgrades, and cleanup by removing unnecessary packages. It also triggers a system reboot if required, ensuring the server remains secure, optimized, and up to date.
  
### 4. Ad-hoc Playbooks (For Testing and System Setup)
These playbooks handle individual setup or testing tasks:

- [`apache2_setup.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/apache2_setup.yml) - Installs and configures Apache2.
- [`hello-world-pod.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/hello-world-pod.yml) - Deploys a basic Hello World application for testing Kubernetes plugins.
- [`Patching.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/Patching.yml) - Handles patching tasks for servers.
- [`test-k8.yml`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/test-k8.yml) - Tests Kubernetes collections and plugins using `requirement.yml`.

### 5. Ansible Roles
Roles are used to modularize the deployment tasks:

- [`roles/build-docker-image`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/roles/build-docker-image/tasks/main.yml) - Builds and pushes the application Docker image.
- [`roles/create-namespaces`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/roles/create-namespaces/tasks/main.yml) - Creates Kubernetes namespaces.
- [`roles/deploy-mysql`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/roles/deploy-mysql/tasks/main.yml) - Deploys the MySQL database.
- [`roles/deploy-app`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/roles/deploy-app/tasks/main.yml) - Deploys the Node.js application.
- [`roles/git_pull`](https://github.com/jatinsuthartalentica/ansible-tower-poc/blob/main/ansible/roles/git_pull/tasks/main.yml) - Clones the source repository.


## Deployment Workflow (AWX Tower)
The deployment process follows this sequence in Ansible Tower:

1. **Git Pull** (`git-pull.yml`) - Fetches the latest application code.
2. **Docker Build** (`docker-build.yml`) - Builds and pushes the application image.
3. **Create Namespace** (`create-namespace.yml`) - Sets up the required Kubernetes namespace.
4. **Deploy MySQL** (`deploy_mysql.yml`) - Deploys MySQL in Kubernetes.
5. **Deploy Node.js App** (`deploy_node.yml`) - Deploys the application.

## API Testing (Postman)
Once the Node.js application is deployed, you can test it using the following endpoints:

### 1. Add User
- **URL:** `http://<ipaddress>:30001/api/add-user`
- **Method:** POST
- **Body (JSON, raw format):**
  ```json
  {
    "name": "jatin",
    "city": "jalandhar",
    "state": "punjab",
    "mobileNumber": "1111111111"
  }
  ```

### 2. Get All Users
- **URL:** `http://<ipaddress>:30001/api/get-all-users`
- **Method:** GET

### 3. Get Specific User
- **URL:** `http://<ipaddress>:30001/api/get-user/<user_id>`
- **Method:** GET

## Conclusion
This project streamlines the deployment of a Node.js application using Ansible, Minikube, and Kubernetes. By leveraging AWX Tower, we ensure an automated and efficient deployment process. Happy deploying! 🚀

