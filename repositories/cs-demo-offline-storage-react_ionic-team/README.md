# Ionic Customer Success Demo - Offline Storage (React)

This application demonstrates the generic base configuration of the Ionic Enterprise Offline Storage solution. This demo application deals with configuration and creation of the database and demonstrates sample CRUD operations.

## Building

**Note:** In order to build and run the demo you will need an Ionic Enterprise API key. You will also need to be using the Ionic Enterprise Edition of the Cordova CLI. Read [these instructions](https://ionicframework.com/docs/enterprise/setup#install-tooling) to make sure that is set up first. This project is intentionally distrubuted without a `.npmrc` file in order to make it easy for you to use your own demo key. If you do not have a demo key, please contact our sales department.

Once Ionic Enterprise Edition has been configured in this project, follow these steps:

- `npm i`
- `npm run build`
- `npx cap update` (only required after initial cloning of repo or when updating plugins)
- `npx cap open ios` - to open Xcode in order to build and run on an iOS device
- `npx cap open android` -to open Android Studio in order to build and run on an Android device

## Significant Architecture

### Services

#### Database Service

The `DatabaseService` is concerned with initalizing the database and create or modifying the schema as needed. A more complex app containing multiple databases should have multiple "database" services, one for each database. In that case, some routines from this service will likely need to be abstracted into a "database utility" service to avoid replication of logic.

#### Other Services

Each of the other services in this application handle CRUD operations for ONE type of data entity within the application domain. Note that does not have to be a table-by-table grouping. It can be, but it does not have to be. A Logical entity within the application domain could easily span multiple tables.

### Context API

This application uses the React Context API to manage the state of the application. Contexts provide data to be accessible by many components in the tree, and at different nesting levels.

### Hooks

Each of the hooks in this application are used to encapsulate contexts and provide communication with the databases via the services mentioned above.

### Feature Folders

The components in this application are split into feature-based folders for organizational purposes. The components know nothing about how the data is stored. They get the current state from the context and call operations provided by hooks when required. This allows them to focus on the concerns of displaying the information to the user and reacting to interaction from the user.
