import {describe} from "node:test";
import {stringify} from "node:querystring";
const assert = require('chai').assert
describe("Testing the Routes of User", () => {
    describe("Testing User can be created", () => {
        it('should create the user successfully', async () => {
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

    })

    describe("We can retrieve all created users", () => {

    })

    describe("We can update user based on ID", () => {

    })

    describe("We can delete user based on ID", () => {

    })
})