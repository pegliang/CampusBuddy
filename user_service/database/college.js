const {College} = require("./schema/College")
const mongoose = require("mongoose")
const path = require("path")
const {readLocalJSONFile} = require("./helpers")


async function importFromJSONIfNeeded() {

    try {
        // Get the collection name from the Mongoose model
        const collectionName = College.collection.collectionName;
            
        // List all collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Check if the collection exists
        const collectionExists = collections.some((collection) => collection.name === collectionName);

        if (collectionExists) {
            const documentCount = await College.countDocuments();
            if (documentCount > 0) return
        }   
        const absoluteFilePath = path.resolve(__dirname, '../data/universitiesAndColleges.json');
        const colleges = await readLocalJSONFile(absoluteFilePath)
        for (let i = 0; i< colleges.length; i++) {
            const {NAME, ADDRESS, CITY, STATE, ZIP, TELEPHONE, COUNTY, COUNTRY, LATITUDE, LONGITUDE, WEBSITE} = colleges[i]
            College.create({
                name: NAME,
                address: ADDRESS,
                city: CITY,
                state: STATE,
                zip: ZIP,
                telephone: TELEPHONE,
                county: COUNTY,
                country: COUNTRY,
                latitude: LATITUDE,
                longitude: LONGITUDE,
                website: WEBSITE
            })
        }
    } catch (err) {
        throw err
    }
}

async function searchByCollegeName(term) {
    try {
        const results = await College.find({name: new RegExp(term, 'i')})
        return results.map((doc) => ({
            id: doc._id,
            name: doc.name,
            address: doc.address,
            city: doc.city,
            state: doc.state,
            zip: doc.zip,
            telephone: doc.telephone,
            county: doc.county,
            country: doc.country,
            latitude: doc.latitude,
            longitude: doc.longitude,
            website: doc.website
        }))
    } catch (err) {
        throw err
    }
}

async function getCollegeByID(id) {
    try {
        const result = await College.findById(id)
        return result
    } catch (err) {
        throw err
    }
}

module.exports = {
    importFromJSONIfNeeded,
    searchByCollegeName,
    getCollegeByID
}