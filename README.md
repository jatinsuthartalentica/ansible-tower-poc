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

- `git-pull.yml` - Clones the latest Node.js application source code from the repository.
- `docker-build.yml` - Builds a Docker image for the Node.js application.
- `create-namespace.yml` - Creates the required Kubernetes namespace in Minikube.
- `deploy_mysql.yml` - Deploys a MySQL database in Kubernetes.
- `deploy_node.yml` - Deploys the Node.js application in Minikube.

### 2. Single Deploy Playbooks (Standalone Playbooks)
These playbooks can be executed independently to deploy specific services.

- `nodejs-deployment.yml` - Deploys the Node.js application.
- `nodejs-service.yml` - Exposes the Node.js application as a service in Kubernetes.

### 3. Ad-hoc Playbooks (For Testing and System Setup)
These playbooks handle individual setup or testing tasks:

- `apache2_setup.yml` - Installs and configures Apache2.
- `hello-world-pod.yml` - Deploys a basic Hello World application for testing Kubernetes plugins.
- `Patching.yml` - Handles patching tasks for servers.
- `test-k8.yml` - Tests Kubernetes collections and plugins using `requirement.yml`.

### 4. Ansible Roles
Roles are used to modularize the deployment tasks:

- `roles/build-docker-image` - Builds and pushes the application Docker image.
- `roles/create-namespaces` - Creates Kubernetes namespaces.
- `roles/deploy-mysql` - Deploys the MySQL database.
- `roles/deploy-app` - Deploys the Node.js application.
- `roles/git_pull` - Clones the source repository.

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

