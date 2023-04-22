const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyClub = require("./dummyClub.json");
const dummyUser = require("./dummyUser.json");
const dummyEvent = require("./dummyEvent.json");

async function eventsTest() {
    let clubId = null;
    let eventId = null;

    describe("Testing out events", async () => {
        it("Grab the dummy club's id", async () => {
            try {
                const res = await axios.get(process.env.CLUB_SERVICE_HOST + `/getClubByName?name=${dummyClub.name.replace(" ", "%20")}`);
                const data = res.data;

                if (!data) return assert.fail("No data was returned");

                clubId = data._id;

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Add a new club event using the /createEvent route", async () => {
            try {
                await axios.post(process.env.CLUB_SERVICE_HOST + "/createEvent", {
                    name: dummyEvent.name,
                    desc: dummyEvent.desc,
                    startDate: dummyEvent.startDate,
                    endDate: dummyEvent.endDate,
                    clubId
                });

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Check if the newly added event is in the database", async () => {
            try {
                const res = await axios.get(process.env.CLUB_SERVICE_HOST + `/getClubById?id=${clubId}`);
                const data = res.data;

                if (!data) return assert.fail("No club found");

                assert.equal(data.events[0].name, dummyEvent.name);
                assert.equal(data.events[0].desc, dummyEvent.desc);
                assert.equal(data.events[0].startDate, new Date(dummyEvent.startDate).toISOString());
                assert.equal(data.events[0].endDate, new Date(dummyEvent.endDate).toISOString());

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Get the event's id", async () => {
            try {
                const res = await axios.get(process.env.CLUB_SERVICE_HOST + `/getEventByName?event_name=${dummyEvent.name}&club_id=${clubId}`);

                if (!res.data) return assert.fail("No data returned");

                assert.ok(res.data._id);
                eventId = res.data._id;

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Check if the RSVP route works", async () => {
            try {
                await axios.post(process.env.CLUB_SERVICE_HOST + `/rsvpEvent`, {
                    clubId, userId: dummyUser.userId, eventId
                });
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Check to make sure that the user has been successfully RSVP for the event", async () => {
            try {
                const res = await axios.get(process.env.CLUB_SERVICE_HOST + `/getEventByName?event_name=${dummyEvent.name}&club_id=${clubId}`);

                if (!res.data) return assert.fail("No data returned");

                const data = res.data;

                assert.ok(data._id);

                // rsvp should only have 1 person
                assert.equal(data.members.length, 1);

                assert.equal(data.members[0], dummyUser.userId);

            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = eventsTest;