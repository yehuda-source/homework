"use strict";

function trackDosage(MedicationName, initialDosage){
    let dosage = initialDosage;
    const pin = 1234;
    return{
        getInstructions: function(){
            return `Take ${dosage}mg of ${MedicationName}`;
        },
        adjustDosage: function(doctorPin, newDosage){
            if(doctorPin === pin && newDosage > 0){
                dosage = newDosage;
            }
            else{
                console.log("error cannot change dosage. Make sure pin and dosage is correct");
            }

        }
    }
}

let patientAdosage = trackDosage("advil", 200);
console.log(patientAdosage.getInstructions());
patientAdosage.adjustDosage(1111, 400);
patientAdosage.adjustDosage(1234, 300);
console.log(patientAdosage.getInstructions());