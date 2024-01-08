import { shortner } from "../models/shortner.js";
// using nanoid dependency(library/module) for generating an unique string
import { nanoid } from "nanoid";

class ShortnerController {
    // Home handler function
    home(req, res) {
        return res.json({ message: "Welcome to url shortner" });
    }

    // ShortURL details fetch function
    async getURLAnalytics(req, res) {
        const url = req.params.url;
        // fetching all details of the provided short url
        const result = await shortner.findOne({ shortURL: url });
        // returning the response
        if (result) {
            return res.json({ response: result });
        } else {
            return res.json({ message: `No Data Found for URL:- ${url}` })
        }
    }

    // Short URL generator function
    async generateShortURL(req, res) {
        const realURL = req.body.url;
        // if no url is provided for getting shorted
        if (!realURL) {
            return res.status(400).render("dashboard", {
                error: 'URL is required'
            });
            //return res.status(400).json({ error: "URL is required" });
        }
        // generating a random 8 characters long string
        // shortURL string is treated as abbreviation/redirection
        // link to original URL
        const shortURL = nanoid(8);
        const userId = req.user._id;
        // preparing the data of new short url to insert in server
        const data = {
            shortURL: shortURL,
            realURL: realURL,
            visitHistory: [],
            createdBy: userId,
        };

        // adding the document to the server
        const result = await shortner.create(data);
        const urls = await shortner.find({ createdBy:  userId});
        // returning the result
        if (result) {
            // return res.json({
            //     message: "Short URL Generated",
            //     shortURL: shortURL
            // });
            return res.render("dashboard", {
                success: shortURL,
                urls: urls
            })
        } else {
            // return res.status(500).json({
            //     message: "Failed to generate URL, try again"
            // });
            return res.render("dashboard", {
                error: "Failed to generate URL, try again",
                urls: urls
            });
        }
    }

    // redirect from short to real URL function
    async redirectToRealURL(req, res) {
        const shortURL = req.params.shortURL;
        // finding, updating and redirecting to real URL
        // of the provided Short URL.
        await shortner.findOneAndUpdate({
            // finding document for the given short url
            shortURL: shortURL
        }, {
            /*
              adding the current time to the "visitHistory"
              attribute of current document, using $push 
              because the visitHistory is an array, and 
              we need to add new current date as an element to
              this attribute
            */
            $push: { visitHistory: { timestamp: Date.now() } }
        }).then((data) => {
            // if short URL doesn't exists in the Server
            if (!data) {
                return res.status(404).json({ message: "Link doesn't exist" })
            }
            // fetching and redirecting to the original URL
            const realURL = data.realURL;
            if (realURL) {
                return res.redirect(`http://${realURL}`);
            } else {
                return res.status(400).json({ message: "No Redirection URL Found" });
            }
        });



    }
}

export const shortnerController = new ShortnerController();