const mongoose = require('mongoose');
const User = require('./user');
const Rental = require('./rental');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

class FakeDb {
    constructor() {
        this.rentals = [{
            title: "Central Apartment",
            city: "New York",
            street: "Times Sqaure",
            category: "apartment",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 3,
            description: "Very nice apartment",
            dailyRate: 34,
            shared: false,
            owner: user1Id,
            createdAt: ""
        },
        {
            title: "Central Apartment 2",
            city: "San Francisco",
            street: "Main street",
            category: "condo",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 2,
            description: "Very nice apartment",
            dailyRate: 12,
            shared: true,
            owner: user1Id,
            createdAt: ""
        },
        {
            title: "Central Apartment 3",
            city: "Bratislava",
            street: "Hlavna",
            category: "condo",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 2,
            description: "Very nice apartment",
            dailyRate: 334,
            shared: true,
            owner: user2Id,
            createdAt: ""
        },
        {
            title: "Central Apartment 4",
            city: "Berlin",
            street: "Haupt strasse",
            category: "house",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 9,
            description: "Very nice apartment",
            dailyRate: 33,
            shared: true,
            owner: user2Id,
            createdAt: ""
        }]
        
        this.users = [{
            _id: user1Id,
            username: "Test User",
            email: "test@gmail.com",
            password: "testtest"
          }, {
            _id: user2Id,
            username: "Test User2",
            email: "test2@gmail.com",
            password: "testtest2"
        }]
    }


    pushUsersToDb() {
        this.users.forEach(user => {
            const newUser = new User(user);

            newUser.save();
        })
    }

    pushRentalsToDb() {
        this.rentals.forEach(rental => {
            const newRental = new Rental(rental);

            newRental.save();
        })
    }

    seedDb() {
        this.cleanDb();
        this.pushUsersToDb();
        this.pushRentalsToDb();
    }

    async cleanDb() {
        await Rental.deleteMany({});
    }
}

module.exports = FakeDb;