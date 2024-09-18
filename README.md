# My Solution?

## Setup
- clone the repository
- run ```npm install```
- if you don't have vite installed run ```npm install -D vite```
- create .env by copying .env.example and fill in access-token
- run ```npm run dev```

## My Thoughts
- @coreui/coreui was used to keep styling to a minimum
- after receiving the first array of children, I used https://quicktype.io/typescript and created a Child interface to enable autocomplete for the object's properties
- React-Query was used to synchronize with the backend. I could have also used a more simpler approach by just using fetch() or axios, but I'm currently trying to get familiar with React-Query. I've been using RxJS while working with Angular, but want to broaden my React knowledge. 

# Interested in working for Famly?

Give us a chance to see your beautiful code! 🤩

## How to get started
- Fork this repository
- Create a small application in React (or another agreed upon framework)
- Describe your design decisions and setup instructions in the README.md of the forked repository

## The assignment
You are tasked to build a simple application for a nursery to manage the attendance of children each day.

It has to be done using Typescript.

The application should be able to do 3 things:
1. List children with some form of pagination/lazy-loading/infinite-scroll
2. Checkin a child
3. Checkout a child

Don't worry about design or anything like that.

If you have any questions feel free to reach out to the person who sent you the assignment ☺️

## API Specification

You have received an access token in the email that contained the link to this page.

### Fetch some children from

The API does not support any limit or offset, so the pagination/lazy-loading/infinite-scroll will have to be done client-side only.

```
GET https://app.famly.co/api/daycare/tablet/group
Arguments: {
	accessToken: <accessToken>,
	groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
	institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
}
```

Example in cURL:

```bash
curl "https://app.famly.co/api/daycare/tablet/group?accessToken=<accessToken>&groupId=86413ecf-01a1-44da-ba73-1aeda212a196&institutionId=dc4bd858-9e9c-4df7-9386-0d91e42280eb"
```

### Checkin child
```
POST https://app.famly.co/api/v2/children/<childId>/checkins

Arguments: {
	accessToken: <accessToken>
	pickupTime: 16:00
}
```

Example in cURL:

```bash
curl \
  -d 'accessToken=<accessToken>&pickupTime=16:00' \
  https://app.famly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkins
```

### Checkout child
```
POST https://app.famly.co/api/v2/children/<childId>/checkout
Arguments: {
	accessToken: <accessToken>
}
```

Example in cURL:

```bash
curl \
  -d 'accessToken=<accessToken>' \
  https://app.famly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkout
```
