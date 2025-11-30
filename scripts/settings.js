export const MODULE_NAME = "psfx";
export default async function psfx_settings() {

 

  game.settings.register(MODULE_NAME, "popup1225", {  // game.setting.register("NameOfTheModule", "VariableName",
    name: "Info Chat Card - Disabled",                  // Register a module setting with checkbox
    hint: "If On, you won't see the info chat card at the start",               // Description of the settings
    scope: "world",                                     // This specifies a world-level setting
    config: true,                                       // This specifies that the setting appears in the configuration view
    type: Boolean,
    default: false,                                     // The default value for the setting
  });

  game.settings.register(MODULE_NAME, "psfxLocation", {
    name: "Peri SFX - location (default : 'modules')",
    hint: "REQUIRES A REFRESH : ONLY change if your psfx module is hosted externally on an S3 bucket or similar. Otherwise, leave blank. Example: S3BucketLocation (No Slash at end).",
    scope: 'world',
    config: true,
    type: String,
    default: "modules",
    requiresReload: true
  });
  };


