import axios, { AxiosInstance } from "axios"
import https from "https"

export class ISTAT {
    private base_url: string
    private agencyID: string

    constructor() {
        this.base_url = "https://sdmx.istat.it/SDMXWS/rest"
        this.agencyID = "IT1"
    }

    /**
     * Sends a request to the specified path with optional headers.
     * @param path - The path to send the request to.
     * @param headers - Optional headers to include in the request.
     * @returns A promise that resolves to the response data.
     */
    _request(path: string, headers?: any): Promise<any> {
        const url = `${this.base_url}/${path}`

        // User agent string to mimic a web browser
        const userAgent =
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"

        // Create a custom https.Agent to handle self-signed certificates
        const customAgent = new https.Agent({ rejectUnauthorized: false })

        // Create an instance of Axios with custom headers and httpsAgent
        const axiosInstance: AxiosInstance = axios.create({
            headers: { ...headers, "User-Agent": userAgent },
            httpsAgent: customAgent,
        })

        return axiosInstance.get(url)
    }

    /**
     * Retrieves data for the specified request object within the provided period.
     * @param requestObject - The object containing agencyID, id, and version properties.
     * @param startPeriod - The start period for the data (default: "2020-01-01").
     * @param endPeriod - The end period for the data.
     * @returns A promise that resolves to the response data.
     */
    get_data(
        requestObject: any,
        startPeriod: string = "2020-01-01",
        endPeriod?: string
    ) {
        let url = `data/${requestObject.agencyID},${requestObject.id},${requestObject.version}`

        if (startPeriod && endPeriod) {
            // If both startPeriod and endPeriod are provided, add them to the URL string as query parameters
            url += `?startPeriod=${startPeriod}&endPeriod=${endPeriod}`
        } else if (startPeriod) {
            // If only startPeriod is provided, add it to the URL string as a query parameter
            url += `?startPeriod=${startPeriod}`
        } else if (endPeriod) {
            // If only endPeriod is provided, add it to the URL string as a query parameter
            url += `?endPeriod=${endPeriod}`
        }

        // Add the "format=jsondata" query parameter to receive the response in JSON format
        url += "&format=jsondata"

        return this._request(url)
    }
}
