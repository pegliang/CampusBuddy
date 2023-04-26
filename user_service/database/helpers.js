const fs = require("fs").promises

const readLocalJSONFile = async (filePath) => {
    try {
      const fileContent = await fs.readFile(filePath, 'utf8'); // Read the file content as a string
      const jsonData = JSON.parse(fileContent); // Parse the string content to a JavaScript object
      return jsonData;
    } catch (err) {
      throw err
    }
  };

module.exports = {
    readLocalJSONFile
}