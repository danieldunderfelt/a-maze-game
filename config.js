System.config({
  "transpiler": "babel",
  "paths": {
    "*": "*.js",
    "something/*": "src/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "meta": {
    "jspm_packages/babel-polyfill": {
      "format": "global"
    }
  }
});

System.config({
  "map": {
    "jquery": "github:components/jquery@2.1.3",
    "nlp_compromise": "npm:nlp_compromise@0.3.1",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:nlp_compromise@0.3.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

