// Override console.log
const originalLog = console.log;
console.log = function (...args) {
    const modifiedArgs = args.map(arg => "[server] " + arg);
    originalLog.apply(console, modifiedArgs);
};


const test = {
    "firstName": "John",
    "lastName": "Doe",
    "age": 30,
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipcode": "10001"
    },
    "phoneNumbers": [
        {
            "type": "home",
            "number": "555-1234"
        },
        {
            "type": "work",
            "number": "555-5678"
        }
    ],
    "email": "john.doe@example.com",
    "interests": [
        "programming",
        "reading",
        "traveling"
    ],
    "education": {
        "university": "XYZ University",
        "degree": "Bachelor of Science",
        "major": "Computer Science"
    },
    "employment": [
        {
            "company": "ABC Inc.",
            "position": "Software Engineer",
            "years": 3
        },
        {
            "company": "XYZ Corp.",
            "position": "Senior Software Engineer",
            "years": 5
        }
    ],
    "projects": [
        {
            "name": "Project A",
            "description": "Lorem ipsum dolor sit amet.",
            "completed": true
        },
        {
            "name": "Project B",
            "description": "Consectetur adipiscing elit.",
            "completed": false
        }
    ]
}

let jsonTest = JSON.stringify(test, null, 4);

// Usage
console.log("Hello");
const lines = jsonTest.split("\n");
lines.forEach(line => console.log(line));
