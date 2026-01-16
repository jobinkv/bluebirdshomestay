# Bluebirds Homestay Website

## How to Run This Application

This is a static HTML website that can be run using any local web server.

### Method 1: Using Python (Recommended)

If you have Python installed on your system, you can run the application using Python's built-in HTTP server:

1. Open a terminal/command prompt
2. Navigate to the project directory:
   cd /path/to/bluebirdshomestay

3. Run the following command:
   python3 -m http.server 8000

4. Open your web browser and navigate to:
   http://localhost:8000

The website will now be accessible at the above URL.

### Method 2: Using Node.js (Alternative)

If you have Node.js installed, you can use the `http-server` package:

1. Install http-server globally (one-time setup):
   npm install -g http-server

2. Navigate to the project directory and run:
   http-server -p 8000

3. Open your web browser and navigate to:
   http://localhost:8000

### Method 3: Using Live Server (VS Code)

If you're using Visual Studio Code:

1. Install the "Live Server" extension from the VS Code marketplace
2. Right-click on index.html
3. Select "Open with Live Server"

### Stopping the Server

To stop the server when you're done:
- Press Ctrl+C in the terminal where the server is running

### Notes

- The default port is 8000, but you can use any available port
- Make sure no other application is using the port before starting the server
- You can access the website from other devices on the same network by using your computer's IP address instead of localhost
