const TIMESTAMPS_COUNT = 50000;
const PROBABILITY_SCORE_CHANGED = 0.0001;
const PROBABILITY_HOME_SCORE = 0.45;
const OFFSET_MAX_STEP = 3;

type Score = {
    home: number;
    away: number;
};

type Stamp = {
    offset: number;
    score: Score;
};

export const generateGame = (): Array<Stamp> => {
    let stamps = Array<Stamp>(TIMESTAMPS_COUNT)
    let currentStamp = stamps[0]
    for (let i = 1; i < TIMESTAMPS_COUNT; i++) {
        currentStamp = generateStamps(currentStamp)
        stamps[i] = currentStamp
    }
    return stamps
}

export const generateStamps = (previousValue: Stamp): Stamp => {
    let scoreChanged = Math.random() > 1 - PROBABILITY_SCORE_CHANGED
    let homeScoreChange = 0
    if (scoreChanged && Math.random() > 1 - PROBABILITY_HOME_SCORE) { homeScoreChange = 1 }
    let awayScoreChange = 0
    if (scoreChanged && homeScoreChange == 0) { awayScoreChange = 1 }
    let offsetChange = Number(Math.floor(Math.random() * OFFSET_MAX_STEP) + 1)

    return {
        offset: previousValue.offset + offsetChange,
        score: {
            home: previousValue.score.home + homeScoreChange,
            away: previousValue.score.away + awayScoreChange
        }
    }
}

export const getScore = (gameStamps: Stamp[], offset: number): Score => {
    gameStamps.forEach(function(elem) {
        if (elem.offset == offset) {
            return  elem.score
        }
    })
    throw new Error('out of range!')
};

function main() {
    let gameStamps = generateGame()
    for (const stamp in gameStamps) {
        console.log(`${stamp}`)
    }
    let offset = 120
    console.log(`Score closest to offset ${offset}: ${getScore(gameStamps, offset)}`);
}