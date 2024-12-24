import {describe} from "node:test";
const assert = require('chai').assert
describe("Testing the Routes of User", () => {
    describe("Testing User can be created", () => {
        it('should create the user successfully', async () => {
            // TODO: Add get the user we created add added to a useState to access it
            const response = await fetch("http://localhost:3001/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    firstName: "userFirst",
                    lastName: "userLast",
                    username: "userFirstLast",
                    email: "userFirstLast@testemail.com",
                    password: "userFirstLast123!"
                })
            })

            assert.strictEqual(response.status, 201, "Expected 201 success response")

        });

    })

    describe("We can retrieve one user based on ID", () => {
        it('should retrieve the user successfully based on specified id', async () => {

            // TODO: Fix this issue where we automate getting the first userID (or from response)
            // const response = await fetch("http://localhost:3001/api/user/676adea49459227971b39b6d", {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     }
            // })
            //
            // assert.strictEqual(response.status, 201, "Expected 201 success response")

        });
    })

    describe("We can retrieve all created users", () => {
        it("should retrieve all users successfully", async () => {
            const response = await fetch("http://localhost:3001/api/user/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            assert.strictEqual(response.status, 201, "Expected 201 success response")
        })
    })

    describe("We can update user based on ID", () => {
        it("should update user information successfully based on specified id", async () => {
            const response = await fetch("http://localhost:3001/api/user/676adea49459227971b39b6d", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: "updatedFirstName",
                    lastName: "updatedLastName",
                    username: "updatedUsername",
                    email: "updatedEmail",
                    password: "updatedPassword"
                })
            })

            assert.strictEqual(response.status, 201, "Expected 201 success response")
        })
    })

    describe("We can delete user based on ID", () => {
        it('should delete user successfully based on specified id', async () => {
            const response = await fetch("http://localhost:3001/api/user/676adea49459227971b39b6d", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            assert.strictEqual(response.status, 201, "Expected 201 success response")

        });
    })
})