# Application Business

This section discuss what I understand about the business rules.

## Guest Panel

I created an interface that allow any visitor to make a reservation in the restaurant. The visitor must choose a date (in future) and select a time. Everytime the visitor choose a new date, the application load all times for that day. If the visitor pick a time that has no table available, the application show an warning but allow the user to proceed. In this case the booking will be saved in status "SCHEDULED" and put at the end of a queue. If a booking for the same date/time were canceled, the application will change the status to "CONFIRMED".

## Backoffice

There are 2 panels in backoffice: for manage bookings and manage restaurant.

### Managing bookings

The panel will list all reserved or scheduled bookings of a selected date. The administrator can navigate for any date in the past and future.

The panel allow the user to book a table directly in backoffice, but unlike the Guest panel, it doesn't allow choose a time with no tables available.

For each booking, the user can:

- reschedule a booking (change the date/time)
- update booking info (guest info)
- cancel a booking

#### Rescheduling a booking

I decided to keep this action separated of the update screen because it evolve a more complex action. For example, the application validate whether the date is out of range, also check if there are tables available for the new date, and also allow the application confirm any other booking that eventually is in the queue of the previous time.

**HERE IS A TECH DEBIT:** The application must check if there are scheduled booking in the previous time and confirm the first booking of the queue.

#### Update the booking info

This is a simple endpoint, with no risk related. I just update the guest info, such as name, email or even the total guests of booking.

#### Canceling a booking

I implemented a 'soft delete' in this case. As I wrote before, the application manage a booking by status. There are 3 statuses:

- confirmed: when the booking is confirmed for that guest;
- scheduled: the guest is in a queue waiting for a table be released;
- canceled: when the booking is canceled;

The application only allow to act over 'confirmed' or 'scheduled' bookings. 'Canceled' bookings are ignored by application.

When a booking is canceled, the application notify a 'consumer' (a background service) that will get the next person of that time queue and confirm it.

### Managing restaurant

The application allow to manage 2 infos of the restaurant:

- time range - (open and close times)
- tables

#### Managing time range

For make the test simple, I decided to manage the restaurant time range assuming it is opened 7 days a week, everyday in the same time.

**HERE IS A TECH DEBIT:** The application must check if there is any booking scheduled in a date that will be rewrite and reject the change.

#### Managing tables

For make the test simple, I decided to handle tables as a number (a field in the restaurant collection). I assume the risk, but this implementation works for the most variety of scenarios of this test. The best practice is handle the tables as an entity and save each table as a record in database.

#### About the queues

In the first moment I understand that I had to implement the queues in a sync process. But I consider this approach not so good and decided to implement a consumer/producer queue, and all data in fact keep in the mongo table.

So, everytime a data related to time change (ie: a booking was canceled, a booking was rescheduled, a new table was added, etc.) the procuder (in our case the api) send a message to the queue and the producer will receive and process it. For example, get the first scheduled booking and confirm it.

# Project Architecture

I implemented the application using:

- React for the front-end
- Typescript and Koa.js for api
- Mongodb as database
- Rabbitmq for manage the application queues

PS: Both api and client were coded with typescript.

## React

I implemented the react using [@material-ui](https://material-ui.com/) for build the interface. I didn't work with Redux for knownledge reasons.

## Api with Koa.js

As @ricardo recommended, I implemented the api using the koa.js. I actually had a boilerplate using this library and implemented it. 

## Containers and docker

- The api was coded using docker. The 'client application' also works with docker, but I avoided to use for performance issues.

# Application Design

I wrote this application using a model that has been improved for the last 3 years. The application design was based in some concepts:

- Domain Design - DDD
- Clean Architecture
- SOLID Concepts

The application has 3 parts based in ddd:

- Domain
- Infrastructure
- Application

## Domain

Objects and services related to business. Generally we have models, services to act in those models, factories to build them and repositories to load and save them. In this app the domains are 'restaurant' and 'booking', and were designed using entities and types as objects.

## Infrastructure

The infrastructure layer actually implement the external libraries and connect the application with external services. It gererally keep a simple interface to connect easelly with the other parts of application. In this application the Infrastructure components are delivered in "Core" directory.

## Application

The application connect the infrastructure services with the domain services. It generally called boundaries. In our application this layer are Controllers, Consumers, repositories implementations.

## Services and Operations

Using this architecture I generally separate the application in services and operations. Services interact direct with domains, it means we must have a service to load a data and other to save it.

The operations act as services, but implement use cases. In general the operations depends of services, receiving and sending data from and to them.

In this application I decided to only implement the 'Operation' layer, because for simple proposes, only operation is enough. In our case, the operation interact directly to repositories and other services related to domain.

## Unit tests

I wrote unit tests only for operations, because I understant it validate all business rules of application.
