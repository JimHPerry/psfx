import psfx_settings, {MODULE_NAME} from "./settings.js";
import { contentCard } from "./window_popup.js";
import { registerPSFXDatabase } from "./psfx_sequencer.js";
import { psfxDatabase } from "./psfx_sequencer.js";


let prefix = 'modules';

Hooks.once('init', async function () { 
    await psfx_settings() 

      if(game.settings.get(MODULE_NAME, "psfxLocation") !== 'modules' && game.settings.get(MODULE_NAME, "psfxLocation") !== ''){
        prefix = game.settings.get(MODULE_NAME, "psfxLocation");
      }
      prefix += `/${MODULE_NAME}`
      console.log("PREFIX: ", prefix)
      
      await registerPSFXDatabase(prefix);
  
})

Hooks.once('ready', async function () {
  const popupSetting = 'popup0126'
  if (game.user.isGM) {
    if (game.settings.get(MODULE_NAME, popupSetting) === false) {   
        // Create Chat Message and check if version of FoundryVTT is 9 or above (game.user.id becomes game.user._id)
      await ChatMessage.create({
          user: game.user._id,
          speaker: ChatMessage.getSpeaker(),
          content: contentCard,
      }, {})


      await game.settings.set(MODULE_NAME, popupSetting, true);      
      }
  }

  game.modules.get(MODULE_NAME).api = {
          psfxDatabase
      }

})


Hooks.on("sequencer.ready", () => {
    Sequencer.Database.registerEntries(MODULE_NAME, psfxDatabase);
});

  
