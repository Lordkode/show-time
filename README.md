# Show time

The project to be done is a ticket reservation website.
The users must be able to select the concerts he wants to attend. They can search, have a wishlist and book
their tickets.
The second part will be the administration panel, he must be able to schedule concerts and have feedback
on the reservations already made.
Several constraints, notably the use of <a href="https://nestjs.com/">Nest.js</a> and <a href="https://www.mongodb.com/">mongoDB</a>, were imposed.

## Fonctionnality

### When user is not connected
- See the different concerts that are offered.
- Register and log in.

### When user is connected
- Change his email and password.
- Book concert tickets.
- Have a list of favorite bands
- Receive notification when one of the groups in our favorites list is scheduled.
- Be able to filter concerts by genre / date / group.
- Once the concert is booked, generate a QR code redirecting to the booking link.

## Requirements

Make sure you have nodeJs and npm installed on your system. The project has been tested with node 20.11.1 and npm 10.8.1.
If you don't have all this requirement, you can install our project with docker. Follow this step : 

```bash
docker pull devrichard2001/showtime:latest
docker run -d -p 3000:3000 --name eventx devrichard2001/showtime:latest
```
## Contribution

### Step 1
Clone this repository on your local machine:

```bash
git clone https://github.com/Lordkode/show-time.git
cd show-time
```

### Step 2

Swtich to stag branch et create new branch with base, stag
```bash
git fetch --all
git checkout stag
git checkout -b your-branch-name
```

### Step 3

When you finish to finish to add your features, push your work
Go to github repo and open pull_request from your branch to stag 
After that, write us : `contact@eventx.com`

Our teams will deploy your work !!