## ❯  🚀 Easy to Deploy Ragfish on your server

This is the official repository of Ragfish.You can easily deploy ragfish in your local server.

### Step 1: Download the source files:

Clone the Git repository that contains Ragfish project files and the .env file from the path https://github.com/RAGFishAI/Ragfish/ using the “git clone” command.

```
git clone https://github.com/RAGFishAI/Ragfish/
```
After a successful git clone, you should see a folder “Ragfish” with folders locales, view, storage, public, and an .env file.

### Step 2: Database Setup

Ragfish supports PostgreSQL. You need to configure the following environment variables in your .env file:


### Database Configuration

```
DATABASE_TYPE=postgres          # Use 'postgres' for PostgreSQL or 
DB_HOST=localhost               # Database host
DB_PORT=5432                    # Port for PostgreSQL 
DB_DATABASE=your_database_name  # Name of your database
DB_USERNAME=your_username       # Database username
DB_PASSWORD=your_password       # Database password
DB_SSL_MODE=disable

```
Successful completion of this step completes the database configuration for the Ragfish application.

### Step 3:  Install Node Dependencies

Make sure Node.js is installed on your system.

Then navigate to the Node service folder and install the required dependencies:

```
cd node-rag
npm install

```
This will download and install all necessary project dependencies.

### Step 4: Install and Run Qdrant Database

Install and run Qdrant, which is used as a vector database for storing embeddings.

You can run Qdrant

```
./qdrant

```

Make sure Qdrant is running successfully before starting the project.

### Step 5: Run the Project

Open the terminal in the project (cloned folder) and run:

```
./rag-fish

```
Once the project starts successfully, the Ragfish application will run.

You can access the application in your browser using:

http://localhost:<port>

Use the default login credentials to sign in:

```
Email: ragfishai@gmail.com
Password: Admin@123

```
