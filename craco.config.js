/* craco.config.js */
const path = require(`path`);
const CracoLessPlugin = require("craco-less");

module.exports = {
   webpack: {
      alias: {
         '@': path.resolve(__dirname, 'src/'),
         '@Components': path.resolve(__dirname, 'src/components'),
         '@Assets': path.resolve(__dirname, 'src/assets'),
         '@Pages': path.resolve(__dirname, 'src/pages'),
         '@Layout': path.resolve(__dirname, 'src/layout'),
         '@Styles': path.resolve(__dirname, 'src/styles'),
         '@Router': path.resolve(__dirname, 'src/router'),
         '@Observer': path.resolve(__dirname, 'src/observer'),
         '@Constants': path.resolve(__dirname, 'src/constants'),
      },
   },
   plugins: [{ 
      plugin: CracoLessPlugin,
   }],
};