const source = args[1].sourceToken;
const targets = args[1].allTargets;


await Sequencer.Preloader.preloadForClients(["jb2a.ranged.02.projectile.01.purple", "psfx-demo.cantrips.fire-bolt.v1"])

for(let target of targets){
    let distance = await measureDistance(source.center, target.center);
    let soundFile;
    let animFile;

    if(distance <= 10){
        soundFile = "modules/psfx-demo/library/cantrips/fire-bolt/v1/fire-bolt-001-05ft.ogg";
        animFile = "modules/jb2a_patreon/Library/Generic/RangedSpell/02/RangedInstant02_01_Regular_Purple_05ft_600x400.webm";
    }
    if(distance > 10 && distance <= 20){
        soundFile = "modules/psfx-demo/library/cantrips/fire-bolt/v1/fire-bolt-001-15ft.ogg";
        animFile = "modules/jb2a_patreon/Library/Generic/RangedSpell/02/RangedProjectile02_01_Regular_Purple_15ft_1000x400.webm";
    }
    if( distance > 20 && distance <= 45){
        soundFile = "modules/psfx-demo/library/cantrips/fire-bolt/v1/fire-bolt-001-30ft.ogg";
        animFile = "modules/jb2a_patreon/Library/Generic/RangedSpell/02/RangedProjectile02_01_Regular_Purple_30ft_1600x400.webm";
    }
    if(distance > 45 && distance <= 75){
        soundFile = "modules/psfx-demo/library/cantrips/fire-bolt/v1/fire-bolt-001-60ft.ogg";
        animFile = "modules/jb2a_patreon/Library/Generic/RangedSpell/02/RangedProjectile02_01_Regular_Purple_60ft_2800x400.webm";
    }
    if(distance > 75){
        soundFile = "modules/psfx-demo/library/cantrips/fire-bolt/v1/fire-bolt-001-90ft.ogg";
        animFile = "modules/jb2a_patreon/Library/Generic/RangedSpell/02/RangedProjectile02_01_Regular_Purple_90ft_4000x400.webm";
    }
    console.log("Distance: ", distance)
    console.log("Sound File: ", soundFile)
    console.log("Anim File: ", animFile)
    await Anim(soundFile, animFile, source, target)
}

async function measureDistance(pointA, pointB) {
    const ray = new Ray({ x: pointA.x, y: pointA.y }, { x: pointB.x, y: pointB.y });
    const segments = [{ ray }];
    let dist = canvas.grid.measureDistances(segments, { gridSpaces: true })[0]
    return dist;
}

async function Anim(soundFile, animFile, source, target){
    new Sequence()
//        .sound()
//            .file(soundFile)
        .effect()
            .file(animFile)
            .atLocation(source)
            .template({ gridSize: 200, startPoint: 200, endPoint: 200 })
            .stretchTo(target)
            .name("mindsliver")
        .play()
}