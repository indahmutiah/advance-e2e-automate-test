# Advance E2E Automate Test

E2E Testing with cypress to testing 3 websites below:

- Agoda
- Amazon
- Youtube

## Installation

1. Install cypress

```bash
npm install cypress --save-dev
```

2. Install cypress-mochawesome-reporter

```bash
npm install cypress-mochawesome-reporter --save-dev
```

## Run

### Run all test with headless mode

```bash
npm run test
```

### Run all test with GUI mode

```bash
npm run test:open
```

### Run test with report

```bash
npm run test:report:json
```

## Test Case

### ✈️ Test Case 1: Book a Flight on Agoda.com

#### Objective:

Book a flight from Jakarta to Singapore using Agoda with specific conditions.

Target: [Agoda](https://www.agoda.com/)

#### Preconditions:

Current date is assumed to be tomorrow.

#### Expectations:

✅ Passenger information is correctly displayed on the Payment page.

✅ Total price matches the price shown on the Passenger Details page.

✅ Departure and arrival times are the same as selected during the flight selection.

✅ All expectations are validated on the Payment page.

### 🛒 Test Case 2: Search for a Product on Amazon.com

#### Objective:

Search and validate product details on Amazon with specific viewport and sorting.

Target: [Amazon](https://www.amazon.com/)

#### Expectations:

✅ Product title on the detail page matches the one on the search result.

✅ Product price (up to whole dollar, e.g. $123) matches the price on the search result page.

### 🎥 Test Case 3: Get Trending Video on Youtube.com

#### Objective:

Validate that video details from YouTube Trending page match the actual video page.

Target: [YouTube](https://www.youtube.com/)

#### Expectations:

✅ The video title matches the one displayed on the Trending page.

✅ The YouTube channel name is the same as shown on the Trending list.

## Result

![Screenshot](/assets/result-test-case.png)
