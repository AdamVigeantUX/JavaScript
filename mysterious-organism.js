// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//P.aequor Factory Function
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,

    //Randomly change a dna base to a different base
    mutate() {
      let randBase = returnRandBase();
      let randDnaIndex = Math.floor(Math.random() * 15);
      while (randBase === this.dna[randDnaIndex]) {
        randBase = returnRandBase();
      }
      this.dna[randDnaIndex] = randBase;
    },
    
    //Print the % of DNA in common between specimens
    compareDNA(obj) {
      let otherDna = obj.dna;
      let myDna = this.dna;
      let inCommon = 0;
      for (i = 0; i < 15; i++) {
        if (otherDna[i] === myDna[i]) {
          inCommon++;
        }
      }
      console.log(`specimen #${obj.specimenNum} and specimen #${this.specimenNum} have ${inCommon / 15 * 100}% DNA in common`);
    },

    //Checks to see if dna is at least 60% C and G bases
    willLikelySurvive() {
      let amountOfCG = 0;
      let myDna = this.dna;
      for (i = 0; i < 15; i++) {
        if (myDna[i] === 'C' || myDna[i] === 'G') {
          amountOfCG++;
        }
      }
      if ((amountOfCG / 15) >= .6) {
        return true;
      } else {
        return false;
      }
    },
  };
}

/* This code took too much memory
//Creates array containing 30 specimens
const newTestSpecimens = () => {
  let specimenArr = [];
  let currentSpecimen = {};
  for (i = 1; i <= 30; i++) {
      currentSpecimen = pAequorFactory(i,mockUpStrand());
      while (!currentSpecimen.willLikelySurvive()) {
        currentSpecimen = pAequorFactory(i,mockUpStrand());
      }
      specimenArr.push(currentSpecimen);
    }
  return specimenArr;
};

const testSpecimens91120 = newTestSpecimens();

console.log(testSpecimens91120.length);*/

//Creates array containing 30 specimens (based on solution code)
let specimenArr = [];
let specimenCounter = 1;

while (specimenArr.length < 30) {
  newSpecimen = pAequorFactory(specimenCounter,mockUpStrand());
  if (newSpecimen.willLikelySurvive()) {
      specimenArr.push(newSpecimen);
    }
  specimenCounter++;
};

console.log(specimenArr);