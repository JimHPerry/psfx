//this section is what you paste into AA and edit the settings to make variations CUSTOMIZE IN AA 
let AAArgs =
{
    weapon: '',

    enableImpact: false,
    impact: '',
    impactScale: 1.2,

    enableSound: true,
    soundFile: '',

    enableBlood: true,
    enableShake: true,
    
    debug: true
}
//const stuff is basically making a shortcut or quick reference for a longer reference - prep work for the actual instructions DECLARING VARIABLES TO HELP WITH THE SEQUENCE LATER
//this section is getting some quick references for things to do with the grid size
const gridSize = canvas.grid.size;
const scaleFactor = gridSize / 100;

//preparing the reference about where we want to effect to happen
const source = args[1]?.sourceToken ?? token;
const target = args[1]?.allTargets[0] ?? game.user.targets.first();

// just in case the user hasn't targetted a token, let's add a quick warning
if (!target) {
    return ui.notifications.warn("Please target a token")
}
const weapon = args[2]?.weapon ?? "";
const enableImpact = args[2]?.enableImpact ?? false;
const impact = args[2]?.impact ?? "";
const impactScale = args[2].impactScale ?? 1.5;
const enableSound = args[2]?.enableSound ?? false;
const soundFile = args[2]?.soundFile ?? "";
const enableBlood = args[2]?.enableBlood ?? false;
const enableShake = args[2]?.enableShake ?? false;
const debug = args[2]?.debug ?? false;

// Let's reconstruct the database path and fetch the array of all the variations for the chosen weapon
const dbPathAnimations = `jb2a.${weaponGroup}.${weapon}`;
const entries = Sequencer.Database.getEntry(dbPathAnimations) ?? null;

// The length of the array will represent how many entries there are, 
// which we'll use later on to randomly pick the appropriate one.
const entriesLength = entries.length;

//
const rand = Math.floor(Math.random() * (entriesLength))
enableSound? soundFile = soundFile + "." + rand : soundFile = "";



//makes the console present information specified via log when the marco is run MAKE CONSOLE MORE HELPFUL 
function log(string, variable){
    return console.log(`%c ${string}`, 'color: #bada55', variable)
}

if(debug){
    log("source: ", source);
    log("target: ", target);
    log("weapon: ", weapon);
    log("enableImpact: ", enableImpact);
    log("impact: ", impact);
    log("impactScale: ", impactScale);
    log("enableSound: ", enableSound);
    log("soundFile: ", soundFile);
    log("enableBlood: ", enableBlood);
    log("enableShake: ", enableShake);
    log("dbPathAnimations: ", dbPathAnimations);
    log("entries: ", entries);
    log("entries length: ", entriesLength);
}



new Sequence()
    .effect()
        .file()
        .atLocation(token)
        .stretchTo(target)
    .sound()
        .file()
    .play()

