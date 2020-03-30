const fs = require('fs');
const readline = require('readline');
const {
    google
} = require('googleapis');
const allEvents = [];

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
    // authorize(JSON.parse(content), listEventsClass);
    // authorize(JSON.parse(content), listEventsWork);
    // authorize(JSON.parse(content), listEventsPrime);
    // authorize(JSON.parse(content), listEventsFun);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**å
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const classEvents = [];
//timezone incorrect
let today = new Date();
//correct timezone
let todayIso = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString();

let regExp = /\d{4}-\d{2}-\d{2}/g;
let d1 = "2020-03-29T01:36:52.285Z"
let d2 = "2020-03-28T18:00:00-04:00 - Dinner with friends"
let d3 = "2020-03-29T19:00:00-04:00 - Dinner"
//log the first few characters representing date for today
// let todayString = `"${today}"`;
// let todayString = ;
// d1.match(regExp);
let result1 = d2.match(regExp);
let result2 = todayIso.match(regExp);
// console.log("d2 typeof ->>>>");
// console.log(typeof d2);
// console.log(today);
// console.log(todayIso);
// console.log(todayString);
// assertEquals(today, timestamp.toString())
// console.log("todayIso typeof ->>>>");
// console.log(typeof todayIso);
//test if it is same with today's date
if (d2.match(regExp) == todayIso.match(regExp)) {
    console.log('yayyyyyy!!!');
}


function listEvents(auth) {
    const calendar = google.calendar({
        version: 'v3',
        auth
    });
    calendar.events.list({
        //get calendar ID from settings and sharings
        // calendarId: 'primary',
        calendarId: 't611euv4j1ql0vheqejtumrl4k@group.calendar.google.com', //trial
        // calendarId: 'tcf1gmsppbe877cfgvdplmtncs@group.calendar.google.com', //classes
        // calendarId: 'dqdua0iel2fhqcq67stkc1b72c@group.calendar.google.com', //fun
        // calendarId: 'sjl779@nyu.edu', //sjl - work
        timeMin: (new Date()).toISOString(),
        maxResults: 2,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming events for trial calendar');
            // console.log(today);
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
                // classEvents.push(`${start} - ${event.summary}`);
                if (start == today) {
                    // console.log('today event analyze: ')
                    // console.log(event.summary)
                }
                // return `${start} - ${event.summary}`
            });
            // console.log(classEvents)
        } else {
            console.log('No upcoming events found for class calendar.');
        }
    });
}
// const primaryEvents = [];

// function listEventsPrime(auth) {
//     const calendar = google.calendar({
//         version: 'v3',
//         auth
//     });
//     calendar.events.list({
//         //get calendar ID from settings and sharings
//         calendarId: 'primary',
//         // calendarId: 'tcf1gmsppbe877cfgvdplmtncs@group.calendar.google.com', //classes
//         // calendarId: 'dqdua0iel2fhqcq67stkc1b72c@group.calendar.google.com', //fun
//         // calendarId: 'sjl779@nyu.edu', //sjl - work
//         // calendarId: 'en-gb.taiwan#holiday@group.v.calendar.google.com', //holidays in taiwan
//         timeMin: (new Date()).toISOString(),
//         maxResults: 2,
//         singleEvents: true,
//         orderBy: 'startTime',
//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const events = res.data.items;
//         if (events.length) {
//             // console.log('Upcoming events for primary calendar');

//             events.map((event, i) => {
//                 const start = event.start.dateTime || event.start.date;
//                 // console.log(`${start} - ${event.summary}`);
//                 primaryEvents.push(`${start} - ${event.summary}`);
//                 // return `${start} - ${event.summary}`
//             });
//             // console.log(primaryEvents)
//         } else {
//             console.log('No upcoming events found for primary calendar.');
//         }
//     });
// }
// const workEvents = [];

// function listEventsWork(auth) {
//     const calendar = google.calendar({
//         version: 'v3',
//         auth
//     });
//     calendar.events.list({
//         //get calendar ID from settings and sharings
//         // calendarId: 'primary',
//         // calendarId: 'tcf1gmsppbe877cfgvdplmtncs@group.calendar.google.com', //classes
//         // calendarId: 'dqdua0iel2fhqcq67stkc1b72c@group.calendar.google.com', //fun
//         calendarId: 'sjl779@nyu.edu', //sjl - work
//         // calendarId: 'en-gb.taiwan#holiday@group.v.calendar.google.com', //holidays in taiwan
//         timeMin: (new Date()).toISOString(),
//         maxResults: 2,
//         singleEvents: true,
//         orderBy: 'startTime',
//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const events = res.data.items;
//         if (events.length) {
//             // console.log('Upcoming events for work calendar');

//             events.map((event, i) => {
//                 const start = event.start.dateTime || event.start.date;
//                 // console.log(`${start} - ${event.summary}`);
//                 workEvents.push(`${start} - ${event.summary}`);
//             });
//             // console.log(workEvents)
//         } else {
//             console.log('No upcoming events found for work  calendar.');
//         }
//     });
// }
// const funEvents = [];

// function listEventsFun(auth) {
//     const calendar = google.calendar({
//         version: 'v3',
//         auth
//     });
//     calendar.events.list({
//         //get calendar ID from settings and sharings
//         // calendarId: 'primary',
//         // calendarId: 'tcf1gmsppbe877cfgvdplmtncs@group.calendar.google.com', //classes
//         calendarId: 'dqdua0iel2fhqcq67stkc1b72c@group.calendar.google.com', //fun
//         // calendarId: 'sjl779@nyu.edu', //sjl - work
//         // calendarId: 'en-gb.taiwan#holiday@group.v.calendar.google.com', //holidays in taiwan
//         timeMin: (new Date()).toISOString(),
//         maxResults: 2,
//         singleEvents: true,
//         orderBy: 'startTime',
//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const events = res.data.items;
//         if (events.length) {
//             console.log('Upcoming events for fun calendar');

//             events.map((event, i) => {
//                 const start = event.start.dateTime || event.start.date;
//                 // console.log(`${start} - ${event.summary}`);
//                 funEvents.push(`${start} - ${event.summary}`);
//                 // const fun = `${start} - ${event.summary}`;
//             });
//             // console.log(funEvents)
//         } else {
//             console.log('No upcoming events found for fun calendar.');
//         }
//     });
// }

// let comboEvents = {
//     funEvents: funEvents,
//     workEvents: workEvents,
//     primaryEvents: primaryEvents,
//     classEvents: classEvents
// }
// setTimeout(analyzeFortune, 1500);

// function analyzeFortune() {
//     let today = (new Date()).toISOString();
//     comboEvents.funEvents.forEach(element => {
//         console.log(element)
//     });
//     comboEvents.workEvents.forEach(element => {
//         console.log(element)
//     });
//     comboEvents.primaryEvents.forEach(element => {
//         console.log(element)
//     });
//     comboEvents.classEvents.forEach(element => {
//         console.log(element)
//     });
// }