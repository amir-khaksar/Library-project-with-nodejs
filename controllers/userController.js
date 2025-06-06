const userModel = require("../models/User")
const url = require("url")

const getAll = async (req, res) => {

    const users = await userModel.find(req);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(users));
    res.end();
}

const register = async (req, res) => {
    let userData = ""

    req.on('data', (chunk) => {
        userData += chunk.toString();
    })

    req.on('end', async () => {
        const parsedUserData = JSON.parse(userData);
        const result = await userModel.add(parsedUserData)

        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(result));
        res.end();
    })
}

const updateCrime = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const userId = parsedUrl.query.id;

    let reqBody = "";

    req.on("data", (data) => {
        reqBody += data.toString();
    });

    req.on("end", async () => {
        try {
            const parsedReqBody = JSON.parse(reqBody);
            console.log("in controller", parsedReqBody);
            const result = await userModel.updateCrime(parsedReqBody.crime, userId);

            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(result));
            res.end();
        } catch (err) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.write(JSON.stringify({message: "Server error", error: err}));
            res.end();
        }
    });
};


const login = async (req, res) => {
    let user = "";

    req.on("data", (data) => {
        user += data.toString();
    });

    req.on("end", async () => {
        try {
            const parsedUser = JSON.parse(user);
            const result = await userModel.login(parsedUser);

            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(result));
            res.end();
        } catch (err) {
            res.writeHead(401, {"Content-Type": "application/json"});
            res.write(JSON.stringify(err));
            res.end();
        }
    });
};

module.exports = {
    getAll,
    register,
    updateCrime,
    login,
}