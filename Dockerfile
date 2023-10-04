# Stage 1: Build React Frontend
FROM node:16-alpine as build-step
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Copy frontend source code
COPY ./client ./
RUN yarn install
RUN yarn build


# Stage 2: Build Flask Backend
FROM python:3.9
WORKDIR /app
COPY --from=build-step /app/build ./dist

RUN mkdir ./api
COPY ./flask-server ./api

# Install Python dependencies
RUN pip install -r ./api/requirements.txt
RUN pip install waitress
# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Expose the Flask app port
EXPOSE 5000
WORKDIR /app/api
# Start the Flask server using Waitress
CMD ["waitress-serve", "--port=5000", "app:app"]
