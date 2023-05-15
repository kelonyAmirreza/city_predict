import { ISTAT } from "./base"

/**
 * Fetches all available dataflows from ISTAT.
 * @returns A promise that resolves to the response data.
 */
export async function all_available() {
    const path = "dataflow/IT1"
    const client = new ISTAT()

    // Send a request to the specified path using the ISTAT client
    const response = await client._request(path)

    return response
}
