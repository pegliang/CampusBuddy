const {Course} = require("./schema/Course")
const {College} = require("./schema/College")
const mongoose = require("mongoose")
const path = require("path")
const {readLocalJSONFile} = require("./helpers")

async function importCoursesFromJSONIfNeeded() {
    try {
        // Get the collection name from the Mongoose model
        const collectionName = Course.collection.collectionName;
            
        // List all collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Check if the collection exists
        const collectionExists = collections.some((collection) => collection.name === collectionName);

        if (collectionExists) {
            const documentCount = await Course.countDocuments();
            if (documentCount > 0) return
        }

        let ccnyDoc = await College.find({name: new RegExp("CUNY city college", 'i')})
        let ccnyID;
        if (ccnyDoc.length > 0) {
            ccnyID = ccnyDoc[0].id
        }

        const absoluteFilePath = path.resolve(__dirname, '../data/ccnyCourses.json');
        const courses = await readLocalJSONFile(absoluteFilePath)
        for (let i = 0; i< courses.length; i++) {
            const {career, code, longName, name, subjectCode} = courses[i];
            if (!career || !code || !(longName || name) || !subjectCode) continue;
            Course.create({
                name: (longName && longName.length > 0) ? longName : name,
                career,
                college: ccnyID,
                course_code: code,
                subject_code: subjectCode
            });
        }
    } catch (err) {
        throw err
    }

}

async function searchCourses(term) {
    try {
        const results = await Course.find({name: new RegExp(term, 'i')})
        return results.map((doc) => ({
            id: doc._id,
            name: doc.name,
            college: doc.college,
            course_code: doc.course_code,
            subject_code: doc.subject_code,
        }))
    } catch (err) {
        throw err
    }
}


module.exports = {
    importCoursesFromJSONIfNeeded,
    searchCourses
}