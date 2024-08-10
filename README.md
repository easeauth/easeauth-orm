# @easeauth/orm

This repository contains an npm package for performing CRUD operations on multiple databases. The package provides a powerful ORM (Object-Relational Mapping) for defining models, schemas, and managing various database operations with a unified API.

## Features

- **MongoDB**: Manage MongoDB databases seamlessly using Mongoose with a consistent and intuitive API.


## Installation

To install `@easeauth/orm`, run the following command:

```bash
npm install @easeauth/orm
```

## Usage

### MongoDB Setup:

To manage your MongoDB data using the ORM, follow these steps:


1. **Import and Create a Model***:
    ```ts
    import mongoose from "mongoose";
    import { MongoModel } from "@easeauth/orm";

    // Define a schema for your data
    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
    });

    // Create a Mongoose model using the schema
    export const UserModel = mongoose.model("users", userSchema);

    // Create an instance of MongoModel
    export const userMongoModel = new MongoModel<User>(UserModel);
    ```

2. **Perform CRUD Operations**:
    ```ts
    // Create a new user
    const newUser = await userMongoModel.create({ 
        name: "John Doe", 
        email: "john.doe@example.com"
    });

    // Find users with a specific query
    const users = await userMongoModel.find({   
        email: "john.doe@example.com" 
    });

    // Find a user by ID
    const user = await userMongoModel.findById("507f191e810c19729de860ea");

    // Update a user by ID
    const updatedUser = await userMongoModel.findByIdAndUpdate("507f191e810c19729de860ea", { name: "Jane Doe" });

    // Delete a user by ID
    const deletedUser = await userMongoModel.findByIdAndDelete("507f191e810c19729de860ea");
    ```

3. **Additional Methods**:

    ```ts
    // Check if a user with a specific email exists
    const userExists = await userMongoModel.exists({ email: "john.doe@example.com" });

    if (userExists) {
        console.log(`User exists with ID: ${userExists.id}`);
    } else {
        console.log("User does not exist.");
    }

    // Validate a MongoDB ObjectId
    const id = "507f191e810c19729de860ea";
    const isValidId = userMongoModel.isValidDocumentId(id);

    if (isValidId) {
        console.log("The ID is valid.");
    } else {
        console.log("The ID is not valid.");
    }
    ```


## Contributing

If you want to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Please make sure to review the [Contribution Guidelines](CONTRIBUTING.md) before contributing.
