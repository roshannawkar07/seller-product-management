# Seller Product Management API

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt
- pdfkit
- express-validator

## Features

- Admin Login
- Seller Creation
- Seller Login
- Product Add
- Product List with Pagination
- Delete Product
- PDF Generation
- Validation Layer
- Role-based Authentication

## API Endpoints

### Admin

POST /api/admin/login

### Seller

POST /api/seller/create  
POST /api/seller/login

### Product

POST /api/product/add  
GET /api/product/my-products  
DELETE /api/product/delete/:id  
GET /api/product/pdf/:id

## Run Project

npm install

npm run dev
