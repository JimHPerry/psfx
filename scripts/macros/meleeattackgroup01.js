//Example Args for reference
let AAArgs =
{
    weaponGroup: 'melee_attack.01',
    weapon: 'shortsword.01',

    enableTrail: false,
    trail: 'trail.04',
    color: 'blue',

    enableImpact: true,
    impact: 'jb2a.impact.001.blue',
    impactScale: 1.2,

    enableSound: true,
    soundFileSwoosh: 'psfx-demo.weapon-swooshes.light.v1.group01',
    soundFileHit: `PSFX.impact.metal`,
    soundFileSwoosh2: 'psfx-demo.weapon-swooshes.fire.v1.group01',
    soundFileHit2: 'psfx-demo.impacts.magicaleffects.fire',
    delayBetweenAttacks: 1000,

    enableBlood: true,
    enableShake: true,
    
    debug: true

}



/*********************
 * STORING VARIABLES 
 *********************/

const gridSize = canvas.grid.size;
const scaleFactor = gridSize / 100;

let source = args[1]?.sourceToken ?? token;
let targets = args[1]?.allTargets ?? game.user.targets;

// just in case the user hasn't targetted a token, let's add a quick warning
if (!targets || targets?.length === 0) {
    return ui.notifications.warn("Please target at least one token")
}
const weaponGroup = args[2]?.weaponGroup ?? "melee_attack.01";
const weapon = args[2]?.weapon ?? "butterflysword.01";
const enableTrail = args[2]?.enableTrail ?? false;
const trail = args[2]?.trail ?? "";
const color = args[2]?.color ?? "blue";
const enableImpact = args[2]?.enableImpact ?? false;
const impact = args[2]?.impact ?? "";
const impactScale = args[2].impactScale ?? 1.5;
const enableSound = args[2]?.enableSound ?? false;
const soundFileSwoosh = args[2]?.soundFileSwoosh ?? "";
const soundFileSwoosh2 = args[2]?.soundFileSwoosh2 ?? "";
const soundFileHit = args[2]?.soundFileHit ?? "";
const soundFileHit2 = args[2]?.soundFileHit2 ?? "";
const delayBetweenAttacks = args[2]?.delayBetweenAttacks ?? 1000;
const enableBlood = args[2]?.enableBlood ?? false;
const enableShake = args[2]?.enableShake ?? false;
const debug = args[2]?.debug ?? false;

// Little helper function to log various things in the console
function log(string, variable){
    return console.log(`%c ${string}`, 'color: #bada55', variable)
}



// Let's reconstruct the database path and fetch the array of all the variations for the chosen weapon
const dbPathAnimations = `jb2a.${weaponGroup}.${weapon}`;
const entries = Sequencer.Database.getEntry(dbPathAnimations) ?? null;

// The length of the array will represent how many entries there are, 
// which we'll use later on to randomly pick the appropriate one.
const entriesLength = entries.length;

if(debug){



    log("source: ", source);
    log("targets: ", targets);
    log("weapon group: ", weaponGroup);
    log("weapon: ", weapon);
    log("enableTrail: ", enableTrail);
    log("trail: ", trail);
    log("color: ", color);
    log("enableImpact: ", enableImpact);
    log("impact: ", impact);
    log("impactScale: ", impactScale);
    log("enableSound: ", enableSound);
    log("soundFileSwoosh: ", soundFileSwoosh);
    log("soundFileSwoosh2: ", soundFileSwoosh2);
    log("soundFileHit: ", soundFileHit);
    log("soundFileHit2: ", soundFileHit2);
    log("delayBetweenAttacks: ", delayBetweenAttacks);
    log("enableBlood: ", enableBlood);
    log("enableShake: ", enableShake);

    log("dbPathAnimations: ", dbPathAnimations);
    log("entries: ", entries);
    log("entries length: ", entriesLength);

}


/******************************************
 * MAIN ANIMATION FUNCTIONS INITIALIZATION*
 * ****************************************/

async function meleeAttack(target, randMeleeAnimation, randTrail, randSwooshSound, isMirrored, targetScale, randSwooshSound2) {
    const sourceScale = { x: source?.document?.texture?.scaleX ?? 1, y: source?.document?.texture?.scaleY ?? 1 }
    
    // Here is some Maths that we use for the "Shake" animation of the targets, move along... nothing to see here :D
    const amplitude = Sequencer.Helpers.random_float_between(0.0, 0.2);
    let hitRay = new Ray(source, target);
    const shakeDirection = { x: Math.sign(hitRay.dx), y: Math.sign(hitRay.dy) };
    const values = {
        x: [0, -amplitude * shakeDirection.y, amplitude * shakeDirection.y, (-amplitude * shakeDirection.y) / 4, (amplitude * shakeDirection.y) / 4, 0],
        y: [0, amplitude * shakeDirection.x, -amplitude * shakeDirection.x, (amplitude * shakeDirection.x) / 4, (-amplitude * shakeDirection.x) / 4, 0]
    }
    const interval = 50;
    const easeOption = "easeInOutSine";

    // Below is the Sequencer code for all the animations
    // The wiki for Sequencer is the best resource to learn about it: 
    // https://fantasycomputer.works/FoundryVTT-Sequencer/#/
    // check it out, follow the tutorials from Wasp, the developer, everything is there!
    new Sequence()

        .sound()
            .file(randSwooshSound)
            .playIf(enableSound)

        .sound()
            .file(randSwooshSound2)
            .playIf(enableSound)

        .effect()
            .file(`${randTrail}`)
            .atLocation(target)
            .rotateTowards(source)
            .rotate(180)
            .animateProperty("sprite", "position.x", { from: -(2.5*gridSize + hitRay.distance), to: -2.5*gridSize, duration: 500+hitRay.distance, ease: "easeOutQuint"})
            .scale(0.5)
            .mirrorY(isMirrored)
            .zIndex(11)
            .playIf(enableTrail)

        .effect()
            .file(`${randMeleeAnimation}`)
            .rotateTowards(source)
            .atLocation(target)
            .rotate(180)
            .animateProperty("sprite", "position.x", { from: -(2.5*gridSize + hitRay.distance), to: -2.5*gridSize, duration: 500+hitRay.distance, ease: "easeOutQuint"})
            .scale(0.5)
            .mirrorY(isMirrored)
            .zIndex(10)
            .waitUntilFinished(-1000) // By design, The hit should always be 1 second from the end of the weapon attack and the trail animations



        .sound()
            .file(soundFileHit)
            .playIf(enableSound && enableImpact)

        .sound()
            .file(soundFileHit2)
            .playIf(enableSound && enableImpact)

        .effect()
            .file(`${impact}`)
            .atLocation(target)
            .scaleToObject(impactScale, { uniform: true })
            .zIndex(12)
            .playIf(enableImpact)

        //START - BLOOD SPLATTER EFFECT
        .effect()
        .file('jb2a.liquid.splash_side.red')
        .atLocation(target)
        .rotateTowards(source)
        .randomRotation()
        .scaleToObject(1.5, { uniform: true })
        .playIf(enableBlood)
        .zIndex(12)
        //END - BLOOD SPLATTER EFFECT

        // START OF SHAKE SECTION
        .animation()
        .on(target)
        .fadeOut(50)
        .playIf(enableShake)

        .effect()
        .from(target)
        .loopProperty("spriteContainer", "position.x", {
            values: values.x,
            duration: interval - ((interval * amplitude) / 2),
            gridUnits: true,
            ease: easeOption
        })
        .loopProperty("spriteContainer", "position.y", {
            values: values.y,
            duration: interval - ((interval * amplitude) / 2),
            gridUnits: true,
            ease: easeOption
        })
        .scale({ x: targetScale.x, y: targetScale.y })
        .duration(interval * 9)
        .playIf(enableShake)
        .zIndex(1)
        .waitUntilFinished(-150)

        .animation()
        .on(target)
        .fadeIn(50)
        .playIf(enableShake)
        // END OF SHAKE SECTION

        .play();
};

/**************************
 * ANIMATION CALL AND LOOP*
 **************************/

// We will loop through this code for each targeted token and 
// pick a different random number each loop in order to have more
// probability to pick a different animation everytime
for (let target of targets) {


    let targetScale = { x: target?.document?.texture?.scaleX ?? 1, y: target?.document?.texture?.scaleY ?? 1 }
    // Arrays start at 0. This will return a random integer which we'll use to pick a random attack variation
    // and its corresponding trail.
    //let rand = Sequencer.Helpers.random_int_between(0, entriesLength - 1);
    let rand = Math.floor(Math.random() * (entriesLength))
    // Here, we rebuild the database paths and pass them along to the animation function.
    let randMeleeAnimation = `${dbPathAnimations}.${rand}`;
    let randTrail;
    let randSwooshSound;
    let randSwooshSound2;
    enableTrail? randTrail =`jb2a.${weaponGroup}.${trail}.${color}.${rand}` : randTrail = 'jb2a.antilife_shell.blue_no_circle'
    log("RAND + 1: ", "00" + (rand + 1))
    // enableSound? randSwooshSound = soundFileSwoosh["00" + (rand + 1)] : randSwooshSound = "";
    enableSound? randSwooshSound = soundFileSwoosh + "." + rand : randSwooshSound = "";
    enableSound? randSwooshSound2 = soundFileSwoosh2 + "." + rand : randSwooshSound2 = "";

    // Let's add to the randomisation by mirroring the animation half the time, on top of the random attack variation.
    let isMirrored = Math.random() < 0.5; // 50% probability. 0.1 would make it 10%, 0.2 20%...etc

    // This is the code which actually calls the animation function.
    await meleeAttack(target, randMeleeAnimation, randTrail, randSwooshSound, isMirrored, targetScale, randSwooshSound2)
    await Sequencer.Helpers.wait(delayBetweenAttacks)


    if(debug){
        log("random integer: ", rand)
        log("rando melee: ", randMeleeAnimation)
        log("random sound", randSwooshSound)
        log("random sound 2", randSwooshSound2)
        log("random trail: ", randTrail)
        log("target scale: ", targetScale)
    }
}