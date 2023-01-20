const path = require('path');

// const mainPath = path.dirname(process.mainModule.filename);
const mainPath = path.dirname(require.main.filename);

exports.mainPath = mainPath;
