var fs = require("fs");

module.exports = {
  seed: function(db, collectionName, dbModel) {
    db.db
      .listCollections({ name: collectionName })
      .next(function(err, collectionInfo) {
        if (!collectionInfo) {
          var jsonContent = JSON.parse(
            fs.readFileSync(`./seed/${collectionName}.json`, "utf8")
          );
          console.log(`seeding ${collectionName}...`);

          dbModel.insertMany(jsonContent);
        }
      });
  }
};
