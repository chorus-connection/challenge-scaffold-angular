# Chorus Connector

### Instructions

Chorus Connector is an exciting new product to help lovers of choral music find ensembles. Build an appealing application with the following features, and feel free to add your own creative twists!

Public Functionality:

- view all choruses
- search for choruses near me

Password-Protected Functionality:

- create, view, edit, and delete choruses

`data.json` contains an example data model and sample list of choruses. Feel free to modify any and all of it for your needs. You do not need to build long-term data persistence (it’s ok for everything to refresh on reload), and data can be stored in-memory however you prefer.
Authentication can be as simple or complex as you feel appropriate for the purposes of this exercise.
Please take no more than 2 hours to develop your solution.

What We’re Looking For:

- does your code run?
- does your product fulfill the core feature requirements?
- is your code well-organized and readable?
- is the UI and UX pleasing?

Optional Considerations (be selective, given the time constraint):

- accessibility
- testing
- input validation

Fork this repository and expand upon it using your preferred folder structure, tooling, packages, libraries, etc.

This template provides a minimal setup for an Angular app. Note that the Angular CLI requires Node.js v14.20+, v16.14+ or v18.10+. To run the app:

```
cd chorus-connector
npm install
ng serve
```

Update this README with anything we should know about your solution (including spin-up and testing instructions, if relevant).

### Solution demonstration

Run the app using the instruction above (make sure to run `npm ci`, as I have updated Angular to version 18). The app will be available at [`http://localhost:4200/`](http://localhost:4200/).

To log into the app, please use `a@a` email and `a` password. For demo purposes, I have hard-coded this as only valid credentials.

You can also check out the video demonstration [here](./chorus-connection-demo.mp4)

### Comments about the solution

#### Overview of things done

1. Updated to Angular 18 in order to use some of the latest features. Use of "modern" Angular APIs include:
   - [Signals](https://angular.dev/guide/signals) (including [input signals](https://angular.dev/guide/signals/inputs))
   - [Typed forms](https://angular.dev/guide/forms/typed-forms)
   - [Standalone components](https://angular.dev/guide/components/importing#standalone-components)
   - [`inject`](https://angular.dev/api/core/inject) function
   - [Functional guards](https://blog.angular.dev/advancements-in-the-angular-router-5d69ec4c032#:~:text=Now%20supporting%20functional%20router%20guards)
   - [Binding resolved data and route parameters to component inputs](https://angular.dev/guide/routing/common-router-tasks#add-an-input-to-the-component)
   - etc...
2. Added Angular Material to make UI development quicker.
3. Implemented authentication flows, including:
   - Login page that is accessible only for logged out users
   - Some pages (like the homepage with the list of choruses) are accessible to both logged in and logged out users. However, logged in users can see some additional actions like Create, Edit and Delete.
   - User actions in the sidenav are different based on login status.
   - Guards on routes to prevent unauthorized access (e.g. Create and Edit routes).
   - Due to time constraints, auth state is kept in a simple way in localStorage. This is not secure and should be replaced with a proper auth service in a real-world app.
4. Implemented two separate layouts - one with header and sidenav and another simpler one for authentication pages
5. Implemented a homepage with a list of choruses. Some details:
   - The grid is responsive
   - Actions in the cards are different based on auth state
   - I used some placeholder images for choruses, just to make it a bit nicer-looking
   - Search by location is done in a simplistic way - it just filters the list of choruses based on city and state by substring case-insensitive matching
6. Added [Infinum's `@infinum/ngx-nuts-and-bolts` library](https://infinum.github.io/ngx-nuts-and-bolts/docs) in order to use some helper utility types for working with forms. I authored many parts of this library and there are more useful ways in which it can be used.
7. Pages for editing and creation re-use the same form component. This is a good example of how to use Angular's reactive forms in a more structured way and how to use the `@infinum/ngx-nuts-and-bolts/form-utils` package. Submission gets disabled in the form has been submitted at least once and is invalid. Validation errors show up only after some interaction with the form, so that the user is not overwhelmed with errors right away.
8. Data services are done in a very simple way with `signals` as reactive primitives with which I work throughout the app. This is not how it would be done in a real-world app. I would use Angular's HttpClient to fetch data from a server. I would also probably use [NgRx Signal Store](https://ngrx.io/guide/signals/signal-store), depending on project needs. If developing features alongside or before backend, I would use [MSW](https://mswjs.io/) to mock the API. However, MSW setup takes some time so I didn't do it for this assignment.

#### Optional considerations

1. a11y should be acceptable. The app is not complex, so the use of correct semantic elements and Angular Material components ensures the app is navigatable by keyboard and other assistive technologies.
2. I haven't really done any testing, due to time constraints. I can demonstrate some examples of unit tests I've written [here](https://github.com/infinum/ngx-nuts-and-bolts/blob/633a78607e50d25055689dac2e682749e23b7cdb/libs/breadcrumbs-testbed/src/lib/tests/breadcrumbs.spec.ts).
3. Basic input validation is done on all forms.

#### Time constraint

I found 2 hours to be a bit tight on time to satisfy all the requirements as well as some optional considerations. To be completely transparent, I spent 3 hours on the assignment. I have perhaps wasted a good chunk of the first hour, as I spent too much time on authentication. I then wrapped up the authentication and put it in gear for the rest of the app.

#### Use of AI and other tools/documentation

I used Github Copilot while coding. It sped me up a bit, as it mostly auto-completed trivial lines of code (such as CRUD methods from `ChorusesService`). I didn't use chatGPT or other tools.

I used Angular's documentation and Angular Material documentation for some things I wasn't sure about and to do quick c/p from examples they have (e.g. for the responsive sidenav, as that is something I do relatively rarely so I don't know it fully by heart).
