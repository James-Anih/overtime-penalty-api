# Overstay Penalty API

Overstay Penalty API streamlines guest management with automated overstay fee calculations. This API seamlessly integrates with booking systems, ensuring fair and transparent penalties for guests exceeding checkout times. Enhance your hospitality operations with efficient and modern late checkout solutions.


## Setup

This section will guide you through the setup process required to get up and running with the application.


### Requirements

-   Node (Version >= 18.17.1)

-   NPM (Version >= 9.6.7)

-   Express (Version >= 4.17)

-   PostgreSQL (Version >= 15.0)

-   TypeScript (`npm install -g typescript`)


### Get Started

1. Clone the project repository with `git clone https://github.com/Osaroigb/overstay-penalty-api.git` or GitHub Desktop

2. Run `npm install` from the root directory of the project to install dependencies

3. Create a `.env` file and copy the content of `.env.example` to it


### Database Setup

1. Create a new database in postgresql

2. Fill the `.env` file you created with the database credentials

3. Run `npm run migrate` to create the tables, You can run `npm run migrate:undo` to undo the last migration or `npm run migrate:undo:all` to undo all migrations

4. Run `npm run seed:all` to populate tables with needed data

5. Run `npm run generate-swagger` to generate Swagger documentation for the API endpoints

6. Optionally run `npm run make:migration` to generate migration files, e.g `npm run make:migration -- --name create_reservation_table`. This is OPTIONAL since the migration files have already been generated

7. Optionally run `npm run make:seed` to generate seeder files, e.g `npm run make:seed -- --name seed_customer_reservations`. This is OPTIONAL since the seeder files have already been generated


### Development

To start the service, use the command: `npm run start`

Use `development` as your node environment `NODE_ENV` to run the application

To run unit tests with Jest, use the command: `npm run test`

If you set `8800` as your `APP_PORT` env, then you can access the [swagger UI website](http://localhost:8800/api-docs)

It is important to set up environment variables for the system to function properly


### API Documentation

Explore the API endpoints and learn how to use them by referring to the [Postman Documentation](https://documenter.getpostman.com/view/23691550/2s9YkkeNcw) 

This documentation provides a detailed guide on interacting with the service, including request payloads, response formats, and usage examples.

Feel free to use the Postman documentation as a reference to understand the available endpoints and make requests to the service.


### Logging

Sometimes, it's necessary to send logs to the stdout or store them, to do this, make use of the exported [logger](src/utils/logger)

You can log errors based on their levels:

-   error

-   warn

-   info

-   verbose

-   debug

-   silly

Example: `logger.error('You just committed a crime!')`

Ensure you avoid using `console.log` statements anywhere in the code.

### Assumptions

1. Weekend Days Definition:
   - For simplicity, weekends are considered as Saturday and Sunday.

2. Overstay Calculation Interval:
   - Overstay fees are calculated per hour.

3. Overstay Fee Calculation:
   - Overstay fees are calculated as a percentage of room rates.
   - Different room types have different rates, and the rates vary for weekdays and weekends.

4. Time Format Assumption:
   - A 24-hour date-time format is assumed for clarity in differentiating between AM and PM.

5. Reservation Status Assumption:
   - The status of a reservation is assumed to be either 'paid' or 'unpaid.'

6. Default Reservation Status Assumption:
   - When a customer makes a new reservation, the default status is set to 'unpaid' until payments are made and confirmed.

7. Environment Assumption:
   - `development` and `test` Node environments use the same database for simplicity in this test case.

8. Actual Checkout Time Assumption:
   - The guest will provide the actual checkout time in the format `YYYY-MM-DD HH:mm`, for example: "2021-01-01 16:28"

### Approach

1. Endpoints:

   - POST /v1/overstay/:reservation_id
     - Calculate and return the overstay fee for a specific reservation.
     - Include the `actual_checkout_time` in the request body (JSON) provided by the guest upon leaving.

2. Middlewares:

   - Error Handling Middleware:
     - Handle errors gracefully, providing meaningful responses.

   - Validation Middleware:
     - Validate the incoming request parameters `reservation_id` & `actual_checkout_time`, ensuring they meet the expected format and constraints.

3. Files and Structure:

   - penaltyCalculator.route.ts:
     - Define route handling logic.
     - Import the controller methods for handling the overstay calculation.

   - penaltyCalculator.controller.ts:
     - Implement controller methods that interact with the service to calculate overstay fees.
     - Extract `reservation_id` and `actual_checkout_time` from the request body and parameter.
     - Call the `penaltyCalculator.service.ts` to perform the calculation.

   - penaltyCalculator.service.ts:
     - Implement service methods responsible for business logic.
     - Extract and fetch reservation details from the database based on `reservation_id`.
     - Utilize `penaltyCalculator.helper.ts` to calculate overstay fees.
     - Return the result which is the calculated overstay fee to the controller and guest

   - penaltyCalculator.helper.ts:
     - Implement helper methods for specific calculations.
     - Calculate overstay fees based on room type, hourly rates, and weekend/weekday rates.

   - penaltyCalculator.interface.ts:
     - Define interfaces for request/response objects to ensure consistency and maintainability.

   - penaltyCalculator.constant.ts:
     - Store constant values, such as days considered as weekends and room rates.


### Environment

Ensure you have eslint and prettier set up on your development environment. Ensure you follow proper linting rules as well. [Here's](https://enlear.academy/integrating-prettier-and-eslint-with-vs-code-1d2f6fb53bc9) a guide on how to setup eslint on vs code


### Contributing

1. To contribute, checkout to the `main` branch (this is the stable branch) first and run `git pull` to sync changes on the repo with what you have locally. 

2. Checkout to your work branch. Your work branch should prefix either `feat_`, `fix_`, `refactor_`, `chore_` along with not more than 6 words description of the task. eg. `feat_update-user-login-response`. Your task should be implemented on this branch

3. Your commits should concisely and accurately state what you worked on. examples are:
- feat: Represents a new feature or enhancement added to the project
- fix: Indicates a bug fix or resolution of an issue
- chore: Refers to routine tasks, maintenance, or general housekeeping
- docs: Represents documentation changes or additions
- style: Indicates changes related to code formatting, styling, or design
- refactor: Indicates code changes that improve the structure or readability of the code
- test: Represents changes or additions related to tests or testing

**NOTE**: Push to the remote repository as frequent as possible at least before calling it a day to avoid possible issues of losing what has been worked on

4. Once done with task, raise a pull request(PR) against the main branch and add me as a reviewer. DO NOT MERGE till it's reviewed

5. After review is done and PR is approved, create another PR against the `staging` branch and merge that. The PR against the main branch should still be open at this point. The essence of merging to the staging branch is for QA before the task goes to production

6. After QA is done and task is approved as ready for production on the staging environment, go ahead and `squash merge` your branch into the `main` branch.

7. Open a PR from the `main` branch against the `production` branch. With the PR title in this format `Deployment to Production - [YYYY-MM-DD]`. eg. `Deployment to production - 2022-01-30`.

8. Inform the dev-ops team to deploy! Hurray you've deployed your task


### Code Standard and Resources

- [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices)

- [Setting up Eslint & Prettier](https://enlear.academy/integrating-prettier-and-eslint-with-vs-code-1d2f6fb53bc9)