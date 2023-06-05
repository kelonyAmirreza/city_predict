import { all_available } from "./discovery"
import { saveToJson, findKeyValuePairsWithWord } from "./utils"
import { ISTAT } from "./base"
import all_available_requests from "../assets/all_available_requests.json"
import { log } from "console"

/**
 * Main function to fetch data and process it.
 */
async function main() {
    if (Object.keys(all_available_requests).length === 0) {
        // If the object is empty, fetch all available requests
        const all_available_requests = (await all_available()).data
        // Save the fetched data to a JSON file
        saveToJson(
            "all_available_requests",
            JSON.stringify(all_available_requests)
        )
    }

    // Find key-value pairs with the word "Import price" in the all_available_requests object
    const args = process.argv.slice(2)
    if (args[0] === "all") {
        const request_object = await getAllData()

        // Save the request_object to a JSON file
        saveToJson("request_object", JSON.stringify(request_object))

        const client = new ISTAT()
        let result: any = {}
        for (const key in request_object) {
            result = {}
            // Get data using the request object and a start date of "2000-01-01"
            result[key] = (
                await client.get_data(request_object[key], "2000-01-01")
            ).data

            // Save the result to a JSON file
            saveToJson(request_object[key].id, JSON.stringify(result))
        }
    } else {
        const keyword = args.length === 0 ? "Import price" : args[0]
        const request_object = findKeyValuePairsWithWord(
            keyword,
            all_available_requests
        )

        // Save the request_object to a JSON file
        saveToJson("request_object", JSON.stringify(request_object))

        const client = new ISTAT()
        let result: any = {}
        for (const key in request_object) {
            // Get data using the request object and a start date of "2000-01-01"
            result[key] = (
                await client.get_data(request_object[key], "2020-01-01")
            ).data
        }

        // Save the result to a JSON file
        saveToJson("result", JSON.stringify(result))
    }
}

async function getAllData(
    startPeriod?: string,
    obj: any = all_available_requests
) {
    startPeriod = startPeriod ? startPeriod : "2020-01-01"

    // Object to store the key-value pairs
    const keyValuePairs: { [key: string]: any } = {}

    for (const key in obj.references) {
        keyValuePairs[obj.references[key].name] = obj.references[key]
    }

    return keyValuePairs
}

// Call the main function
main()
