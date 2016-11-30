# Tag Cleansing and Mapping. 

## SQL Queries

The aim of this query is to strip out any existing Homes Navigation Tag and then add a new one (based on a mapping criteria). In the end ALL articles and Galleries
Will have ONE NEW homes navigation TAG.

In the SQL-Queries you will find two queries. 
I also included the functions folder which contains the SQL FUNCTIONS used by the queries. Not much need to worry about them, they are like helpers throughout the queries (feel free though to try improve speed if you wish). 
There is also a tagNavMapping spreadsheet. This is used as a lookup to get the NEW navigation tag, will cover this later.



a) Homes_New_Tags-v3-newNavTags.sql

and 

b) Homes_New_Tags-v3-newNavTags-UPDATE.sql




a) (safe to also run on prod) is designed to run a SELECT and display a view of (articles and galleries) existing tags and how the tags will look with NEW navigation TAG. I used this for Ingrid exports.


b) is designed to actually run the UPDATE whereby existing tags are modified and NEW navigation TAG is inserted.


So both use similar logic, one just runs the SELECT to show how things will look, and the other actually makes it happen.



To back up SQL Databases just use the Azure 

https://jira.bauermedia.net.au/confluence/display/ADD/SQLAzure+migration+for+Telstra+-+AWS

Zip file is found here. Adi and Arvind knows how to run this.



## DEV TESTING

This is a SQL query intended to run direct on the database. Open SQL management studio and connect to DEV.

* db02.prod.digital.bauer-media.net.au
* Database: Umbraco_Homes
* username: baudev
* password: $pa55word

1) Any test work should be done on DEV. I have already taken a backup of the HOMES prod database we can use to run dev tests (NOTE this DB is being used by HOMES - DEV site). Any doubts just back it up before proceeding.


## RUN A SELECT

Drop in Homes_New_Tags-v3-newNavTags.sql

This will run the SELECT. You can change there WHERE clause to return specific NODE IDs or remove it to return ALL. For my latests test I used 1686. Take a note of how their existing tags look and how new NEW tags will look.

To start with use ONE node ID, make sure this works. Then use 5-10 .... check, maybe more ..... before running on ALL.



## RUN THE UPDATE

Drop in Drop in Homes_New_Tags-v3-newNavTags-UPDATE.sql

In the WHERE CLAUSE at the bottom, add these random IDs. Run the UPDATE. 


In my sample, node ID 1686 had existing tags....

		["food:Products, Furniture and Fittings:Large appliances:Ovens","food:Homes navigation:Renovate","food:Topic:Tips and advice"]


but they ended up looking like...

		["food:Products, Furniture and Fittings:Large appliances:Ovens","food:Topic:Tips and advice","food:Homes navigation:DIY"]

		
Note the NEW food:Homes navigation:DIY tag at the end. So this is similar to how ALL items should look after the update, new nav tag sitting at the end. This is essentially all this query is doing.




## What is the TAG NAV MAPPING??

I imported this spreadsheet into the database as a table to use against the queries / functions and perform the lookup. Existing tags are passed into one of the USER FUNCTIONS.

table: TagNavMapping


Existing tags are broken down, cross checked against tags in the lookup. If we have a match(s) - TOP 1 is used - the corresponding Navigation Tag is returned.




The databse will be updated, meaning the new NAV TAG will be seen on Umbraco UI (good for testing). However, they still need to be published / indexed. 




## PRODUCTION
* db02.prod.digital.bauer-media.net.au
* Database: Umbraco_Homes
* username: homes-cms
* password: Sorry-Admire-Belt-Grave-8

### BACKUP THIS DATABASE BEFORE ANY WORK ON THE QUERY. Again use the Azure tool, just back it up to the same server under a different name.


1) Run through similar steps to DEV. Remember to back it up first. Test on some individual node IDs before removing the running on ALL.



## PUBLISHING

After DEV / PROD queries have been run we also need to publish to ensure the changes are seen in the module service (POST GRES). Easy on individual items, just publish them via UMBRACO but when running a mass UPDATE you will
need to use the Publisher CLI.



