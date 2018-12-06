import { v1 as neo4j } from "neo4j-driver";

const driver =  neo4j.driver(process.env.REACT_APP_NEO_ADDRESS,
    neo4j.auth.basic(process.env.REACT_APP_NEO_USERNAME, process.env.REACT_APP_NEO_PASSWORD));

export default driver;
