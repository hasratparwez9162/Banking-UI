# Banking Application

This is a Vue.js-based banking application that allows users to manage their accounts, loans, cards, and transactions. The application includes features such as account creation, login, and a dashboard for managing various banking services.

## Project Structure

. ├── .gitignore ├── babel.config.js ├── jsconfig.json ├── package.json ├── public/ │ └── index.html ├── README.md ├── src/ │ ├── App.vue │ ├── assets/ │ ├── components/ │ │ ├── AboutUs.vue │ │ ├── ForgetPassword.vue │ │ ├── LoanDetailsDialog.vue │ │ ├── MainDashboard.vue │ │ ├── OpenAccount.vue │ │ ├── TheAccount.vue │ │ ├── TheCards.vue │ │ ├── TheLanding.vue │ │ ├── TheLoan.vue │ │ ├── TheLogin.vue │ │ ├── TheNavbar.vue │ │ ├── TheSignUp.vue │ │ └── TheTest.vue │ ├── main.js │ ├── router/ │ │ └── index.js │ └── store/ │ └── index.js └── vue.config.js

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd banking_application
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Running the Application

To run the application locally, use the following command:

```sh
npm run serve
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
