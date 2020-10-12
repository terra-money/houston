const OS = require("os");

export default {
  initialization: function() {
    this.logger = console;
  },
  handlers: {
    "migrate:nothingToMigrate": [
      function() {
        this.logger.log(
          `> No migration script found in the migrations directory. there is nothing to migrate`
        );
      },
    ],
    "migrate:start": [
      function() {
        this.logger.log(`${OS.EOL}Starting migrations...`);
        this.logger.log(`================`);
      },
    ],
    "migrate:sourceToMigrate": [
      function({ sourceToMigrate }) {
        this.logger.log(`${OS.EOL}${sourceToMigrate}`);
        this.logger.log(`================`);
      },
    ],
    "migrate:succeed": [
      function() {
        this.logger.log(
          `${OS.EOL}✨ All migrations are succesfully launched!${OS.EOL}`
        );
      },
    ],
    "migrate:fail": [
      function({ errors }) {
        this.logger.log(
          `${OS.EOL}> 💥 Something went wrong while running a migration script!`
        );
        errors.forEach((err) => {
          this.logger.log(err);
        });
      },
    ],
  },
};
