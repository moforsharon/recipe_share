# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Make the db directory to store the SQLite database
RUN mkdir -p /app/db

# Make the db directory writable
RUN chmod -R 755 /app/db

# Expose the port the application will run on
EXPOSE 8000

# Run the command to start the development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]