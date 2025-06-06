const rentModel = require("../models/Rent");

const rentBook = async (req, res) => {
    let reqBody = "";

    req.on("data", (data) => {
        reqBody += data.toString();
    });

    req.on("end", async () => {
        try {
            const parsedReqBody = JSON.parse(reqBody);

            if (!parsedReqBody.userID || !parsedReqBody.bookID) {
                res.writeHead(400, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: "Missing userID or bookID"}));
                return res.end();
            }

            const result = await rentModel.rent(parsedReqBody);

            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(result));
            res.end();
        } catch (err) {
            res.writeHead(400, {"Content-Type": "application/json"});
            res.write(JSON.stringify({message: err.message || "Something went wrong", ...err}));
            res.end();
        }
    });
}


module.exports = {
    rentBook,
}