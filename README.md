# College ERP 
```markdown
# Express Node.js App Deployment on Azure with MSSQL

This README outlines the steps for building and deploying an Express Node.js application with an MSSQL database on Azure using Docker containers.
web application at https://collegeerpcustom.azurewebsites.net/
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



## Step 3: Running the Application Container in Azure

Create a Web App for Containers service in Azure:

```bash
az appservice plan create --name collegeAppServicePlan --resource-group collegeResourceGroup --sku B1 --is-linux

az webapp create --resource-group collegeResourceGroup --plan collegeAppServicePlan --name collegeerpapp --deployment-container-image-name collegeerpacr.azurecr.io/collegeerpcustom:v1
```

## step 4 : Go to the web app properties and advance and add json below lines

```json
{
    "name": "DB_HOST",
    "value": "ipaddress",
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



## Step 9: Final Deployment

Finally, go to the Azure portal, find the web application at https://collegeerpcustom.azurewebsites.net/ 


