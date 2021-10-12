# Moveo Assignment Using React App 

The task was to create 2 screens:
On the first one I was asked to create a table using an API service, combining pagination to navigate between pages which every page is limited to 10 rows. 
Clicking on user row transfer you to the second screen, which will be shown this specific user and a map with his address on a map.
In addition, every time you clicked on one of the users, their name will appeared on the URL.
Building the pagination and the sorting part was the hardest part. To create the sort first I found the index of the items by using name attribute. Second I have used a sort function to split the array and relate only to the users I show at the moment.
By clicking on the titles you can sort the table by name, email, gender and age.
