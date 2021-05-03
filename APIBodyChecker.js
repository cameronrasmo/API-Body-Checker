const body = {
    name: "William Loopesko",
    age: 33,
    founder: false,
    company: "Aclymate",
    address: {
        description: "2432 S. Downing St, Denver, CO 80210",
        county: "Denver",
        country: "USA",
    },
    obj2: {
        strOrBool: "45",
    },
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
    obj2: {
        type: "object", 
        required: true,
        strOrBool: {type: ["string", "boolean"], required: true},
        county: {type: "string", required: false},
        country: {type: "string", required: false}
    },
}

const schemaChecker = (schema, body) => {
    let matches = true;
    for(let prop in schema){
        if(!matches) break;
        if(prop === "type" || prop === "required") continue;
        
        const { type, required } = schema[prop];
        if(!body?.hasOwnProperty(prop)){
            if(required){
                matches = false;
            }
            else {
                continue;
            }
        }
        else if(body?.hasOwnProperty(prop) && !type.includes(typeof body[prop])) matches = false;
        else if(type === "object") matches = schemaChecker(schema[prop], body[prop]);
    }
    return matches;
}

const result = schemaChecker(schema, body);

console.log(result);