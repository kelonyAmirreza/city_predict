import { log } from "console"
import fs from "fs"

/**
 * Saves stringified data to a JSON file in the 'assets' folder.
 * @param fileName - The name of the file to save to (without the '.json' extension).
 * @param data - The data to stringify and save to the file.
 */
export function saveToJson(fileName: string, data: string) {
    const BASE_FOLDER = "./assets"
    fs.writeFile(`${BASE_FOLDER}/${fileName}.json`, data, (err: any) => {
        if (err) throw err
        console.log(`\n===>\tData is saved to ${fileName}.json file.\n`)
    })
}

/**
 * Finds the key-value pairs in an object where the provided word exists as a substring
 * in the keys, case-insensitive.
 * @param word - The word to search for in the keys of the object.
 * @param obj - The object to search within.
 * @returns An object containing key-value pairs where the word is a substring of the keys.
 */
export function findKeyValuePairsWithWord(
    word: string,
    obj: any
): { [key: string]: any } {
    // Object to store the key-value pairs
    const keyValuePairs: { [key: string]: any } = {}

    // Extract relevant properties and store them in the namesObject
    const namesObject: any = {}
    for (const key in obj.references) {
        const name = obj.references[key].name
        namesObject[name] = obj.references[key]
    }

    // Get the keys from the namesObject
    const keys = Object.keys(namesObject)

    // Convert the word to lowercase for case-insensitive comparison
    const lowercasedWord = word.toLowerCase()

    // Iterate over the keys
    keys.forEach((key) => {
        // Convert the key to lowercase for case-insensitive comparison
        const lowercasedKey = key.toLowerCase()

        // Check if the lowercased key includes the lowercased word
        if (lowercasedKey.includes(lowercasedWord)) {
            // If a match is found, add the key-value pair to the object
            keyValuePairs[key] = namesObject[key]
        }
    })

    // Return the resulting object of key-value pairs
    return keyValuePairs
}
