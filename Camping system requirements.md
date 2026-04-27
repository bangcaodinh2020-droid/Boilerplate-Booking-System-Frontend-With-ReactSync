# Camping system requirements 
  
## Technical Requirements  
  
* You shall (or your group) send me a email as soon as possible if you work alone or together.  
* The project result shall be shown and questions will be asked (proof that you have done something and not just piggybacked....). If you have split up the coding parts, write in the information email who to ask about specific things, ie how is responsible for what part.  
* There shall be writen (short!) documentation about the work etc, preferable using devops, but may be done using word.  
  
* The system will be a solution that contains three applications and one database:  
* One Azure SQLServer  
* One Api application following the architecture that we have used.  
* One front-end application which 'gives' react to the browser, you may choose to do with Express.js or running in dev mode. ( IE like you did with Magnus or with me)  
* One Mobile application running either on a real android OR on a simulator in class room R309 ( or your own laptop).  
  
* All requirements shall be done in the corresponding Azure Devops project (SCRUM project)  
* The solution shall be a CRUDL handling system for some thing (and its childthing) which are connected/owned to/by users.  
* The two first applications shall be deployed on Azure and version handled with Devops and also deployed from Devops to the Azure sites. The mobile application shall be version handled on Devops and deployable from a local computer. (Ie no azure portal site for that needed.)  
* Api made with same architecture, version handled, main and dev branch, only push to dev, pr to main. Pipeline to deploy to site, may use simple page just so you know that it is up and running. Needs to be authenticated. Shall store all data in the database  
* Frontend made with React, version handled, main and dev branch, only push to dev, pr to main. Depending on how you do the web app site, with express.js or vite dev server you need to adjust the pipeline accordingly. Need authentication, shall talk to the api for all data management.   
* The mobile application shall be made with Capacitor. You may choose if you use Bootstrap or something else, shall basically do the same as the web app frontend, version handled but not deployable using Azure only need to deploy localy (ie just run on local computer)  
* The CRUDL shall be done so that a user only can handle its own data, you do not need to make roles, ie no need for a special admin if you do not like to etc  
* The system shall have users that can CRUDL manage things with childthings. The thing and childthing shall have at least 3 properties each (+ the id).  
* It shall be possible to register and login from both the Mobile and React Web application.  
* The rest api application shall store the users in a database.  
* The api shall be protected, ie no Postman without token etc  
* Both the Mobile and React Web application shall talk to the Api application, which talks to the database, for storage of the things and childthings.  
* It shall be possible to CRUD handle Things (the parent), per user, each Things may contain 0..many ChildThing (the child).  
* You select:  
    * The Mobile application handle all CRUD features, then the React Web application only need to support edit and list.   
    * The React Web application handle all the CRUD features, then the Mobile application only need to support edit and list.  
* Observe that edit means it shall be possible to add a new ChildThing when editing a Thing and so on. So it shall be possible to CRUDL handle the ChildThings 'under' the Thing.  
  
  
## Background  
  
The system is designed for a camping site that offers accommodation, restaurant services, and additional facilities such as sauna access.  
  
This system is intended to support the owners in managing business-related activities such as accommodation bookings, restaurant orders, and service requests.  
  
It will also provide public information for non-registered visitors, helping potential guests learn about the camping site, its services, and available facilities.  
  
By providing these features through a web-based system, the amount of manual work currently handled through phone calls and emails can be reduced.  
  
## Project Scope  
###   
### The scope of this project is to develop a web-based system that provides the ability to:  
  
    - Handle accommodation bookings  
    - Provide information about the camping site services for non-registered users  
###   
### The outcomes will include:  
  
    - Reduced manual work related to bookings and customer requests  
    - A simpler and more streamlined booking process for guests  
    - A single system that collects the camping site services in one place  
###   
### The scope does not include:  
  
    - Multi-language support  
    - Online payment functionality  
    - Restaurant orders and requests  
    - Sauna bookings  
  
## System purpose  
  
The purpose of the system is to provide a web-based platform that allows guests to interact with the camping site and its services in a structured and convenient way.  
  
The system will allow visitors to access information about the camping site and its services, while registered users will be able to manage their own bookings.  
  
By providing these features through a centralized system, the camping site can reduce manual work currently handled through phone calls and emails while offering guests a more convenient way to plan and manage their stay.  
  
## The system will support 3 types of users.  
  
### Unregistered users.  
  
Unregistered users are visitors who access the website without creating an account. Unregistered users will be able to:  
  
- View information about the camping site  
- View contact information  
  
The purpose for these users is to allow them to explore the camping site and its services before creating an account.  
  
### Registered users.  
  
Registered users are customers who have created an account in the system. These users will be able to:  
  
- Create and manage accommodation bookings  
- View and manage their own bookings  
  
Registered users will only be able to access and manage their own data.  
  
### Admin user.  
  
Admin users represent the camping site owners or staff. These users will be able to:  
  
- Manage accommodation information and availability  
- Modify or cancel bookings when necessary  
- Manage information shown on the website  
  
Admin users are responsible for maintaining the accuracy of the system data and ensuring that services are up to date.  
  
## Location  
  
The system will be accessible through the internet and can be used from both desktop and mobile devices.  
  
## Responsibilities  
  
The primary responsibilities of the system are:  
  
- Provide users with up to date information about the camping site and its services  
- Allow registered users to manage their bookings and service requests  
- Store and manage user-related data in a structured way  
  
## Need  
  
This system is needed to simplify the interaction between guests and the camping site.  
  
Currently bookings and requests are handled manually through phone calls or emails.  
By introducing a centralized web-based system, the camping site can reduce manual work while improving accessibility and convenience for guests.  
  
## Things  
  
1. **Users**  
  
* user_id  
* name  
* email  
* password_hash  
* phone_number  
* role  
* created_at  
  
2. **Accommodation_Bookings**  
  
* booking_id  
* user_id  
* status (pending/confirmed/cancelled)  
* total_guests  
* created_at  
* start_date (start date for booking)  
* end_date (end date for booking)  
* total_price  
  
ChildThing: **Booking_Details**  
* booking_detail_id  
* booking_id  
* accommodation_id  
* number_of_guests (number of guests/accommodation)  
* start_date (start_date for specific accommodation)  
* end_date (end_date for specific accommodation)  
* price_per_night  
  
3. **Accommodations**  
  
* accommodation_id  
* name  
* type  
* capacity  
* price_per_night  
* description  
  
ChildThing: **Accommodation_Amenities**  
  
* amenity_id  
* accommodation_id  
* amenity_type  
* amenity_value  
  
## Relationships  
  
One user can have many accommodation bookings  
One accommodation booking can have many booking details  
One accommodation can have many amenities  
  
## System Requirements  
  
### User Management  
  
1. Users shall be able to register an account in the system  
2. Users shall be able to log in using email and password  
3. Users shall be able to log in from both the React web application and the mobile application  
4. The system shall store registered users in the database  
5. Users shall only be able to access and manage their own data  
  
### Accommodation Booking Management  
  
6. Users shall be able to create accommodation bookings  
7. Users shall be able to view a list of their accommodation bookings  
8. Users shall be able to view the details of their booking.  
9. Users shall be able to update or cancel their accommodation bookings.  
  
### Booking Details Management  
  
10. Users shall be able to add one or more booking details to an accommodation booking.  
11. Each booking detail shall represent a reserved accommodation unit  
12. Users shall be able to modify or remove booking details when editing a booking  
13. A booking detail shall contain information about the accommodation, booking dates, number of guests and price per night  
  
### Accommodation Information  
  
14. The system shall store information about available accommodations  
15. Each accommodation shall contain information such as name, type, capacity, price per night and description  
16. Each accommodation shall have associated amenity information  
  
### Access Rules  
  
17. Users shall only be able to manage their own bookings  
18. Admin users shall be able to manage accommodation information  
19. Admin users shall be able to view, modify or cancel accommodation bookings  
  
### Notification Requirements  
  
20. The system shall notify administrative users when a new booking is created  
21. The system shall notify administrative users when an existing booking is modified  
