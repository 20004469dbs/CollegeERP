# This application is build on node express javascript 


Url : https://collegeerpcustom.azurewebsites.net/


#step 1:
Docker build -t collegeerpcustom:v1 .


Create ACR in azure and group 


#step 2:
Az login acr --name

#step 3:
Docker docker tag collegeerpcustom:v1 collegeerpacr.azurecr.io/collegeerpcustom:v1

#step 4:
docker push collegeerpacr.azurecr.io/collegeerp:v1


#Step 5 
Run MSSQL server container in the azure

use the Image mcr.microsoft.com/mssql/server:2022-latest

ACCEPT_EULA=Y 
SA_PASSWORD=Admin@12345
port : 1433



Step 6:
Either create the container from image in azure or use the Webapp container


Step 7:

While selecting the image select the azure container registry image

Step 8:

and give the  variables in the properties --> advanced



{
"name": "DB_HOST",
"value": "4.157.170.207",
"slotSetting": false
},
{
"name": "DB_NAME",
"value": "mydb",
"slotSetting": false
},
{
"name": "DB_PASSWORD",
"value": "Admin@1234",
"slotSetting": false
},
{
"name": "DB_USER",
"value": "sa",
"slotSetting": false
}

Select the required plan if that doesn't suit




