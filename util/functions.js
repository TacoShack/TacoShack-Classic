module.exports = {

    check_NaN: function(userID) {
        const shacks = require("../data/shacks.json");
        const fs = require("fs");

        if(isNaN(shacks[userID].balance) || isNaN(shacks[userID].income)) {
            shacks[userID].balance = 100
            shacks[userID].income = 100

            fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
                if(err) console.log(err);
        })
            return false;
        };
        return;
    },

    bet_check: function(bet) {
        if(bet.startsWith("-")) return false;
        if(isNaN(bet)) return false;
        if(bet.includes(".")) return false;
    },

}