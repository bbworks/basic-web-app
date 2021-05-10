//Create public API singleton
const api = {};

//Declare public functions
api.truncatePost = function(body, length) {
  const continueReadingCharacterLimit = length || 200;
  const dots = "...";
  const dotsSpan = `<span class="post-body-dots">${dots}</span>`;

  return (!(body.length > continueReadingCharacterLimit)) ? body : `${body.substring(0, continueReadingCharacterLimit-1)}${dotsSpan}`;
};

api.formatDateString = function(dateString) {
  const date = new Date(dateString);
  const month = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
};

api.renderView = function(request, response, viewRelativePath, locals) {
  //Import modules
  const path = require("path");
  const fs = require("fs");

  //Declare functions
  const getScripts = function(viewRelativePath) {
    const viewParentRelativePath = path.dirname(viewRelativePath);
    const viewAbsoluteDirectory = path.dirname(path.join(global.viewDirectory, viewRelativePath));

    return fs
      .readdirSync(viewAbsoluteDirectory)
      .filter(file=>file.match(/\.js$/))
      .map(file=>path.join(viewParentRelativePath, file));
  };

  const getScriptsRecursively = function(viewRelativePath) {
    //Get a path-ized relative path
    viewRelativePath = path.normalize(viewRelativePath);

    //Get the absolute path
    const viewAbsolutePath = path.join(global.viewDirectory, viewRelativePath);

    //Get this page view's scripts
    let scripts = getScripts(viewRelativePath);

    //Get the unique list (Set) of included component relative paths inside the file
    const includedComponents = [...new Set(
      fs
        .readFileSync(viewAbsolutePath, "utf8")
        .match(/(?<=include\s*\(").+(?=")/g)
      )
    ];

    //Recurse through the component tree, getting scripts for all components
    if (includedComponents.length) {
      const includedComponentsRelativePath = includedComponents.map(componentRelativePath=>path.join(path.dirname(viewRelativePath), componentRelativePath));
      scripts = [...scripts, ...includedComponentsRelativePath.reduce((accumulator, includedComponentRelativePath)=>accumulator = [...accumulator, ...getScripts(includedComponentRelativePath)], scripts)];
    }

    //Return the unique set of components
    return [...new Set(scripts)];
  };

  //Call the Response.render
  return response.render(viewRelativePath, {
    scripts: getScriptsRecursively(viewRelativePath),
    ...locals,
  });
};

module.exports = api;
