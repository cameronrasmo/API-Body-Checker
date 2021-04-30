const body = {
    name: "William Loopesko",
    age: 33,
    founder: "this is a true statement",
    company: "Aclymate",
    address: {
        description: "2432 S. Downing St, Denver, CO 80210",
        county: "Denver",
        country: "USA",
    }
}

const schema = {
    name: {type: "string", required: true},
    age: {type: "number", required: true},
                    // array of types
    founder: {type: ["boolean", "string"], required: false},
    company: {type: "string", required: true},
    address: {
        type: "object", 
        required: true,
        description: {type: "string", required: true},
        county: {type: "string", required: false},
        country: {type: "string", required: false}
    },
}

const schemaChecker = (schema, body) => {
    for(let prop in schema){
        if(prop === "type" || prop === "required") continue;

        const { type, required } = schema[prop];
        const undefinedButRequired = typeof body[prop] === "undefined" && required;
        const definedButNoMatchingTypes = typeof body[prop] !== "undefined" && !type.includes(typeof body[prop]);

        if(undefinedButRequired || definedButNoMatchingTypes) return false;

        if(type === "object") return schemaChecker(schema[prop], body[prop]);
    }
    return true;
}

const result = schemaChecker(schema, body);

console.log(result);