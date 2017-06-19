# Count me up
_REST-ful API for conducting a simple poll_

## Overview

This service exposes two endpoints:

1. `/poll` which returns the current vote counts for contestants in descending order

2. `/poll/contestants/:contestant` which creates a vote for looking at the request `x-user-id` header to see who has voted

A user can only vote a total of 3 times.

## Install, run, and test
- Clone the repository and run `$ npm install` in the project directory
- To start the server run `$ npm start`
- Run the tests with `$ npm test`

## Assumptions

- I've assumed that users are authenticated and requests are formatted with those autheticated user ids in the `x-user-id` header before this  service receives the request.
- I've also assumed contestant names are validated before the request is made.

## Before working further, I'd want to consider...

- How should the results be displayed?  Is a list of contestants in descending number of votes sufficient for a consumer of the API to determine the winner?
- Do the poll results need to be persisted past the life of the server?  Should they be written to a file?  Stored in a database?
- Would a vote ever need to be deleted?  If a contestant is disqualified should the people who voted for them be able to distribute their votes to other contestants?
- I didn't consider timeouts since there are currently no network operations in the server, but I'd want to add them if, for instance, I moved to persisting information in a database.

## Process

I favored an approach that meet the brief faithfully, but did't make additional assumptions about the user of the service.  I first built out a core implementation in a single file that combined routes, handlers, and anciliary functionality before refactoring the code out into modular files that would be easier to extend and test.