export const MODULE_NAME = "psfx";
export default async function psfx_settings() {

 

  const debounceReload = debounce(() => window.location.reload(), 100)

  game.settings.register(MODULE_NAME, "psfxLocation", {
    name: "Peri SFX - location (default : 'modules')",
    hint: "REQUIRES A REFRESH : ONLY change if your psfx module is hosted externally on an S3 bucket or similar. Otherwise, leave blank. Example: S3BucketLocation (No Slash at end).",
    scope: 'world',
    config: true,
    type: String,
    default: "modules",
    onChange: debounceReload
  });
  };


