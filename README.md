# **Weather Travel Planner**

Weather Travel Planner is a web application designed to help users plan their trips efficiently by providing weather forecasts, destination information, and allowing users to save trips. The app uses various APIs to fetch location data, weather information, and images of the destination.

## **Description**

The Weather Travel Planner allows users to:

- Enter a location and a departing date to see the weather forecast for the selected destination.
- Fetch images of the destination.
- Save trips to `localStorage` and view them later.
- The app supports persistent trip data using `localStorage`, so trips will be saved even after the browser is closed and reopened.

## **Technologies Used**

- **HTML**: For the structure and layout of the web pages.
- **SCSS**: For styling and layout management.
- **JavaScript (ES6)**: Core functionality of the app.
- **Node.js**: Backend server.
- **Express**: Backend framework for routing and handling API requests.
- **Axios**: For making API requests (for weather, location, and image data).
- **Webpack**: Module bundler used for packaging JavaScript files, SCSS, and other assets.
- **Babel**: For transpiling modern JavaScript code into a compatible version for older browsers.
- **Pixabay API**: Used to fetch images for the destination.
- **Weatherbit API**: Used to get weather forecasts for the location.
- **Jest**: For unit testing the codebase.

## **Project Setup**

Follow these steps to get the project up and running on your local machine:

### **Prerequisites**

Ensure you have **Node.js** and **npm** installed by running:

```bash
node -v
npm -v
```

If Node.js or npm is not installed, download and install them from [Node.js official website](https://nodejs.org/).

### **Installation**

1. **Download the project** and unzip it to your preferred directory, or clone the repository:

   ```bash
   git clone https://repository-url.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd <project-directory>
   ```

3. **Install Dependencies**:

   Install all necessary packages by running:

   ```bash
   npm install
   ```

### **API Key Configuration**

The app requires API keys to access the **Weatherbit** and **Pixabay** APIs. Follow these steps:

1. GeoNames API: Sign up at GeoNames to obtain a username. This username is needed to fetch location information based on city names.
2. **Weatherbit API**: Sign up at [Weatherbit](https://www.weatherbit.io/account/create) and get an API key.
3. **Pixabay API**: Sign up at [Pixabay](https://pixabay.com/api/docs/) and get an API key.
4. **Create a `.env` file** in the root directory of the project and add your API keys:

   ```plaintext
    USERNAME=your_username_at_geonames
    WEATHER_API_KEY=your_weatherbit_api_key
    PIXABAY_API_KEY=your_pixabay_api_key
   ```

5. **Install `dotenv`** to manage environment variables:
   ```bash
   npm install dotenv
   ```

### **Development Setup**

1. **Install Additional Plugins and Loaders**:

   To ensure your development environment is set up correctly, install the necessary Webpack and Babel tools:

   ```bash
   npm install --save-dev nodemon
   npm install --save-dev @babel/core @babel/preset-env babel-loader
   npm install --save-dev webpack webpack-cli webpack-dev-server
   npm install --save-dev style-loader node-sass css-loader sass-loader
   npm install --save-dev clean-webpack-plugin html-webpack-plugin
   npm install --save-dev mini-css-extract-plugin css-minimizer-webpack-plugin terser-webpack-plugin
   ```

2. **Running the Development Server**:

   You can now start the development server, which includes live reloading for changes to the code:

   ```bash
   npm run dev
   ```

   If you run into issues finding `webpack-dev-server`, run:

   ```bash
   npm update webpack webpack-cli webpack-dev-server
   ```

   Then rerun the development server:

   ```bash
   npm run dev
   ```

### **Production Build**

To create a production build that’s optimized for deployment:

```bash
npm run build
```

### **Start the Server**

To start the backend server for the project:

```bash
npm start
```

This will start the server, and it will listen on the specified port (default: 8001).

### **Running Tests with Jest**

1. **Install Jest for Testing**:

   If Jest is not already installed, install it for unit testing:

   ```bash
   npm install --save-dev jest
   ```

2. **Run Tests**:

   Once Jest is installed, you can run your tests using the following command:

   ```bash
   npm test
   ```

## **Project Structure**

Here’s a brief overview of the folder structure:

```
├── dist/                 # Production build output
├── src/                  # Source code
│   ├── client/           # Client-side code
│   │   ├── js/           # JavaScript files
│   │   ├── styles/       # SCSS files
│   │   ├── views/        # HTML files
│   ├── server/           # Server-side code
│   ├── test/             # Jest tests
├── .env                  # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # npm dependencies and scripts
├── webpack.dev.cjs        # Webpack development configuration
├── webpack.prod.cjs       # Webpack production configuration
```

### **Client Folder**

- **`client/js/`**: Contains all JavaScript code related to handling the UI, API calls, and business logic.
- **`client/styles/`**: Contains SCSS files for styling.
- **`client/views/`**: Contains the HTML structure of the application.

### **Server Folder**

- **`server.js`**: Express server that handles the backend logic, including API routes for fetching weather data and images.

### **Test Folder**

- **`test/`**: Contains Jest unit tests for ensuring the app functions correctly.
