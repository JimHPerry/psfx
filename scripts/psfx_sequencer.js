const psfxDatabase = {};
export async function registerPSFXDatabase(prefix) {

    psfxDatabase["toll-the-dead"] = {
        "001": `${prefix}/library/toll-the-dead/toll-the-dead-001.ogg`,
        "002": `${prefix}/library/toll-the-dead/toll-the-dead-002.ogg`,
        "rasping-whispers": {
            "001": `${prefix}/library/toll-the-dead/rasping-whispers-001.ogg`
        },
        "ominous-bell": {
            "001": `${prefix}/library/toll-the-dead/ominous-bell-001.ogg`
        }
    }
    psfxDatabase["melee-attack"] = {
        "swoosh": {
            "001": [
                `${prefix}/library/melee-attack/swoosh-01/melee-attack-swoosh-01-01.ogg`,
                `${prefix}/library/melee-attack/swoosh-01/melee-attack-swoosh-01-02.ogg`,
                `${prefix}/library/melee-attack/swoosh-01/melee-attack-swoosh-01-03.ogg`,
                `${prefix}/library/melee-attack/swoosh-01/melee-attack-swoosh-01-04.ogg`
            ]
        }
    }
    psfxDatabase["fire-bolt"] = {
        "001": {
            "05ft": `${prefix}/library/fire-bolt/fire-bolt-001-05ft.ogg`,
            "15ft": `${prefix}/library/fire-bolt/fire-bolt-001-15ft.ogg`,
            "30ft": `${prefix}/library/fire-bolt/fire-bolt-001-30ft.ogg`,
            "60ft": `${prefix}/library/fire-bolt/fire-bolt-001-60ft.ogg`,
            "90ft": `${prefix}/library/fire-bolt/fire-bolt-001-90ft.ogg`
        }
    }
}
export { psfxDatabase }