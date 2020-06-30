const mongoose = require('mongoose');
const User = require('./user');
const Rental = require('./rental');
const CloudinaryImage = require('./cloudinaryImage');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const image1Id = mongoose.Types.ObjectId();
const image2Id = mongoose.Types.ObjectId();
const image3Id = mongoose.Types.ObjectId();
const image4Id = mongoose.Types.ObjectId();

class FakeDb {
  constructor() {
    this.images = [
      {
        _id: image1Id,
        cloudinaryId: 'photo-1523908511403-7fc7b25592f4_gq0n8k',
        url:
          'https://res.cloudinary.com/dl1u5qv1k/image/upload/v1593414783/photo-1523908511403-7fc7b25592f4_gq0n8k.jpg',
      },
      {
        _id: image2Id,
        cloudinaryId: 'marcus-loke-WQJvWU_HZFo-unsplash_1_dsjkda',
        url:
          'https://res.cloudinary.com/dl1u5qv1k/image/upload/v1593414782/marcus-loke-WQJvWU_HZFo-unsplash_1_dsjkda.jpg',
      },
      {
        _id: image3Id,
        cloudinaryId: 'nicate-lee-kT-ZyaiwBe0-unsplash_1_fud0bl',
        url:
          'https://res.cloudinary.com/dl1u5qv1k/image/upload/v1593414709/nicate-lee-kT-ZyaiwBe0-unsplash_1_fud0bl.jpg',
      },
      {
        _id: image4Id,
        cloudinaryId: 'brick-wall-1850095_640_e1vger',
        url:
          'https://res.cloudinary.com/dl1u5qv1k/image/upload/v1593415385/brick-wall-1850095_640_e1vger.jpg',
      },
    ];

    this.rentals = [
      {
        title: 'Central Apartment',
        city: 'New York',
        street: 'Times Sqaure',
        category: 'apartment',
        image: image1Id,
        bedrooms: 3,
        description: 'Very nice apartment',
        dailyRate: 34,
        shared: false,
        owner: user1Id,
        createdAt: '',
      },
      {
        title: 'Central Apartment 2',
        city: 'San Francisco',
        street: 'Main street',
        category: 'condo',
        image: image2Id,
        bedrooms: 2,
        description: 'Very nice apartment',
        dailyRate: 12,
        shared: true,
        owner: user1Id,
        createdAt: '',
      },
      {
        title: 'Central Apartment 3',
        city: 'Bratislava',
        street: 'Hlavna',
        category: 'condo',
        image: image3Id,
        bedrooms: 2,
        description: 'Very nice apartment',
        dailyRate: 334,
        shared: true,
        owner: user1Id,
        createdAt: '',
      },
      {
        title: 'Central Apartment 4',
        city: 'Berlin',
        street: 'Haupt strasse',
        category: 'house',
        image: image4Id,
        bedrooms: 9,
        description: 'Very nice apartment',
        dailyRate: 33,
        shared: true,
        owner: user2Id,
        createdAt: '',
      },
    ];

    this.users = [
      {
        _id: user1Id,
        username: 'Mr. Magoo',
        email: 'test@gmail.com',
        password: '123456',
      },
      {
        _id: user2Id,
        username: 'Sarah Sliverman',
        email: 'test2@gmail.com',
        password: '123456',
      },
    ];
  }

  pushImagesToDb() {
    this.images.forEach((image) => {
      const newImage = new CloudinaryImage(image);

      newImage.save();
    });
  }

  pushUsersToDb() {
    this.users.forEach((user) => {
      const newUser = new User(user);

      newUser.save();
    });
  }

  pushRentalsToDb() {
    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);

      newRental.save();
    });
  }

  seedDb() {
    this.cleanDb();
    this.pushImagesToDb();
    this.pushUsersToDb();
    this.pushRentalsToDb();
  }

  async cleanDb() {
    await Rental.deleteMany({});
  }
}

module.exports = FakeDb;
