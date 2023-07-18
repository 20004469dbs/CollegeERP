### College ERP 
```markdown
# Express Node.js App Deployment on Azure with MSSQL

This README outlines the steps for building and deploying an Express Node.js application with an MSSQL database on Azure using Docker containers.

## Pre-requisites

- Docker installed on your machine
- Azure CLI installed on your machine
- Access to an Azure account with valid subscription

```
## Step 1: Building the Docker Image

Navigate to the directory containing your Dockerfile and build the Docker image:

```bash
docker build -t collegeerpcustom:v1 .


## Step 2: Logging in to Azure and Azure Container Registry (ACR)

Log in to Azure:

```bash
az login
```

Log in to Azure Container Registry (ACR):

```bash
az acr login --name collegeerpacr
```

## Step 3: Tagging the Docker Image

Tag your Docker image with the login server of your ACR:

```bash
docker tag collegeerpcustom:v1 collegeerpacr.azurecr.io/collegeerpcustom:v1
```

## Step 4: Pushing the Docker Image to ACR

Push the Docker image to your ACR:

```bash
docker push collegeerpacr.azurecr.io/collegeerpcustom:v1
```

## Step 5: Creating the Resource Group and MSSQL Server Container in Azure

Create a resource group:

```bash
az group create --name collegeResourceGroup --location eastus
```

Create an Azure Container Instances (ACI) for the MSSQL Server:

```bash
az container create --name sqlservercontainer --resource-group collegeResourceGroup --image mcr.microsoft.com/mssql/server:2022-latest --ip-address Public --ports 1433 --cpu 2 --memory 4 --environment-variables ACCEPT_EULA=Y SA_PASSWORD=Admin@12345
```

## Step 6: Running the Application Container in Azure

Create a Web App for Containers service in Azure:

```bash
az appservice plan create --name collegeAppServicePlan --resource-group collegeResourceGroup --sku B1 --is-linux

az webapp create --resource-group collegeResourceGroup --plan collegeAppServicePlan --name collegeerpapp --deployment-container-image-name collegeerpacr.azurecr.io/collegeerpcustom:v1
```

## step 9 : Go to the web app properties and advance and add json below lines

```json
{
    "name": "DB_HOST",
    "value": "ipaddress",
    "slotSetting": false
},
{
    "name": "DB_NAME",
    "value": "mydb",
    "slotSetting": false
},
{
    "name": "DB_PASSWORD",
    "value": "Admin@12345",
    "slotSetting": false
},
{
    "name": "DB_USER",
    "value": "sa",
    "slotSetting": false
}
```

## Step 8: Setting Environment Variables

Set the required environment variables for your application:

```bash
az webapp config appsettings set --resource-group collegeResourceGroup --name collegeerpapp --settings DB_HOST=4.157.170.207 DB_NAME=mydb DB_PASSWORD=Admin@12345 DB_USER=sa
```

## Step 9: Final Deployment

Finally, go to the Azure portal, find the web application at https://collegeerpcustom.azurewebsites.net/ 


