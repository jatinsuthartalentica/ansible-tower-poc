# Ansible Tower POC - Deploying a Node.js App on Minikube

## Overview

This project demonstrates the use of Ansible Tower (AWX) to automate the deployment of a Node.js application in a Minikube cluster. The deployment follows an Ansible workflow that includes pulling the latest code, building a Docker image, creating Kubernetes namespaces, deploying MySQL, and deploying the Node.js application.

## Prerequisites

Before running this project, ensure you have the following installed and configured:

- **Ansible AWX**: To execute and manage Ansible workflows.
- **Minikube**: A lightweight Kubernetes implementation for local development.
- **Docker**: For building and managing containerized applications.
- **Kubernetes kubectl**: To interact with the Minikube cluster.
- **Git**: To clone the repository and manage code changes.

## Project Structure

The repository contains several Ansible playbooks and roles to facilitate the deployment. Below is an organized explanation of the structure:

### Playbooks

#### **Workflow Playbooks** (Executed sequentially in Ansible Tower)

- **git-pull.yml** - Pulls the latest code from the repository.
- **docker-build.yml** - Builds the Docker image for the application.
- **create-namespace.yml** - Creates Kubernetes namespaces to logically separate deployments.
- **deploy\_mysql.yml** - Deploys MySQL within the Minikube cluster.
- **deploy\_node.yml** - Deploys the Node.js application on Kubernetes.

#### **Single-Deploy Playbooks** (Used for individual deployment tasks)

- **nodejs-deployment.yml** - Defines the Kubernetes deployment for the Node.js application.
- **nodejs-service.yml** - Configures the Kubernetes service for exposing the Node.js application.

#### **Ad-hoc Playbooks** (For specific one-time tasks or testing)

- **apache2\_setup.yml** - Configures Apache2 on the target system.
- **hello-world-pod.yml** - Deploys a simple Hello World pod for testing purposes.
- **Patching.yml** - Contains patches or updates for the deployment.
- **test-k8.yml** - Used for testing Kubernetes plugins via `requirements.yml`.

### Roles

Roles are structured under `roles/` and contain task definitions for different deployment steps:

#### **build-docker-image**

- `tasks/main.yml` - Builds the Docker image for the application.

#### **create-namespaces**

- `tasks/main.yml` - Creates Kubernetes namespaces.

#### **deploy-app**

- `tasks/main.yml` - Deploys the Node.js application in Kubernetes.

#### **deploy-mysql**

- `tasks/main.yml` - Deploys the MySQL database.

#### **git\_pull**

- `defaults/main.yml` - Stores default variables for the Git pull operation.
- `handlers/main.yml` - Defines handlers for Git operations.
- `meta/main.yml` - Metadata for the role.
- `tasks/main.yml` - The main task file responsible for pulling the latest Git code.
- `tests/` - Contains test configurations for validating the Git pull process.
- `vars/main.yml` - Stores variable definitions for the role.

## Deployment Workflow

In Ansible Tower, the workflow executes the following playbooks in sequence:

1. **git-pull.yml** - Clones the latest repository code.
2. **docker-build.yml** - Builds the Docker image.
3. **create-namespace.yml** - Creates the required Kubernetes namespaces.
4. **deploy\_mysql.yml** - Deploys MySQL in Minikube.
5. **deploy\_node.yml** - Deploys the Node.js application in Kubernetes.

## Execution Steps

1. Ensure all prerequisites are installed.
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ansible-tower-poc/ansible
   ```
3. Run the playbook manually (if not using AWX):
   ```bash
   ansible-playbook playbook.yml
   ```
4. Check the deployed application on Minikube:
   ```bash
   minikube service list
   ```

## Conclusion

This project automates the deployment of a Node.js application using Ansible AWX, Minikube, and Docker. By leveraging Ansible roles and playbooks, it simplifies the management of Kubernetes deployments.

