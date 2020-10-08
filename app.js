function calculateTaxable(basicSalary, myCurrentRetirementContribution, newContributionPerc, companyMedicalContribution) {
  //console.log(basicSalary, newContributionPerc, companyMedicalContribution)
  const oldTaxable = (Number(basicSalary) + Number(companyMedicalContribution) - (Number(basicSalary) / 100 * 7.5 )) * 12;
  const newTaxable = (Number(basicSalary) + Number(companyMedicalContribution) - (Number(basicSalary) / 100 * Number(newContributionPerc))) * 12;
  return {
    oldTaxable, 
    newTaxable
   }
}

function calculateTax(basicSalary) {
  let fixed = 0;
  let percentage = 0;
  let rebate = 14958;
  let netPay = 0
  if(basicSalary >= 0 && basicSalary <= 205900) {
    fixed = 0;
    percentage = 18;
    netPay = fixed + ((basicSalary - 0) * percentage / 100) - rebate
  } else if(basicSalary >= 205901 && basicSalary <= 321600) {
    fixed = 37062;
    percentage = 26;
    netPay = fixed + ((basicSalary - 205900) * percentage / 100) - rebate
  } else if(basicSalary >= 321601 && basicSalary <= 445100) {
    fixed = 67114;
    percentage = 31;
    netPay = fixed + ((basicSalary - 321601) * percentage / 100) - rebate
  } else if(basicSalary >= 445101 && basicSalary <= 584200) {
    fixed = 105429;
    percentage = 36;
    netPay = fixed + ((basicSalary - 445101) * percentage / 100) - rebate
  } else if(basicSalary >= 584201 && basicSalary <= 744800) {
    fixed = 155505;
    percentage = 39;
    netPay = fixed + ((basicSalary - 584201) * percentage / 100) - rebate
  } else if(basicSalary >= 744801 && basicSalary <= 1577300) {
    fixed = 218139;
    percentage = 41;
    netPay = fixed + ((basicSalary - 744801) * percentage / 100) - rebate
  } else if(basicSalary >= 1577301 && basicSalary <= 100000000) {
    fixed = 559464;
    percentage = 45;
    netPay = fixed + ((basicSalary - 1577301) * percentage / 100) - rebate
  }

  return (netPay / 12).toFixed(2);
}

function updateCalculator() {
  const basicSalary = document.getElementById("basicSalary").value || 0;
  console.log('Basic Salary: ' + basicSalary)

  const companyMedicalContribution = document.getElementById("companyMedicalContribution").value || 0
  console.log('Company Medical Contribution: ' + companyMedicalContribution)

  const myCurrentRetirementContribution = (basicSalary * 7.5 / 100).toFixed(2);
  console.log('Current Retirement Contribution: ' + myCurrentRetirementContribution)

  const newContributionPerc = document.getElementById("newContributionPerc").value || 0
  console.log('New Retirement Contribution %: ' + newContributionPerc)

  const myNewContribution = (basicSalary * newContributionPerc / 100 ) || 0;
  console.log('New Contribution: ' + myNewContribution)

  document.getElementById("myCurrentRetirementContribution").value = (basicSalary * 7.5 / 100).toFixed(2);
  document.getElementById("myNewContribution").innerHTML = 'R '+ myNewContribution.toFixed(2);
  document.getElementById("changeInContribution").innerHTML = 'R ' + (myNewContribution - myCurrentRetirementContribution).toFixed(2);

  const taxable = calculateTaxable(basicSalary, myCurrentRetirementContribution, newContributionPerc, companyMedicalContribution);
  const newTaxableResult = calculateTax(taxable.newTaxable);
  const oldTaxableResult = calculateTax(taxable.oldTaxable);

  const changeInNet = (Number(basicSalary * newContributionPerc / 100) - (Number(basicSalary) / 100 * 7.5 ));

  document.getElementById("changeInNetPay").innerHTML = 'R ' + ((Number(newTaxableResult - oldTaxableResult) + Number(changeInNet))).toFixed(2);
}

document.getElementById("newContributionPerc").addEventListener("change", updateCalculator);
document.getElementById("basicSalary").addEventListener("keydown", updateCalculator);
document.getElementById("basicSalary").addEventListener("change", updateCalculator);
document.getElementById("companyMedicalContribution").addEventListener("change", updateCalculator);
document.getElementById("companyMedicalContribution").addEventListener("keydown", updateCalculator);

/* function calculateCurrentContribution(event) {
  const basicSalary = event.target.value;
  document.getElementById("myCurrentMedicalContribution").value = (basicSalary * 7.5 / 100).toFixed(2);

  const companyMedicalContribution = document.getElementById("companyMedicalContribution").value
  const myCurrentMedicalContribution = document.getElementById("myCurrentMedicalContribution").value
  const newContributionPerc = document.getElementById("newContributionPerc").value
  const myNewContribution = (basicSalary * newContributionPerc / 100 );
  document.getElementById("myNewContribution").innerHTML = 'R '+ myNewContribution.toFixed(2);
  document.getElementById("changeInContribution").innerHTML = 'R ' + (myNewContribution - myCurrentMedicalContribution).toFixed(2);

  const taxable = calculateTaxable(basicSalary, myCurrentMedicalContribution, newContributionPerc, companyMedicalContribution);
  const newTaxableResult = calculateTax(taxable.newTaxable);
  const oldTaxableResult = calculateTax(taxable.oldTaxable);

  const changeInNet = (Number(basicSalary * newContributionPerc / 100) - (Number(basicSalary) / 100 * 7.5 ));
  console.log(changeInNet);
  document.getElementById("changeInNetPay").innerHTML = 'R ' + ((Number(newTaxableResult - oldTaxableResult) + Number(changeInNet))).toFixed(2);
}

function calculateNewContribution(event) {
  const basicSalary = document.getElementById("basicSalary").value
  const myCurrentMedicalContribution = document.getElementById("myCurrentMedicalContribution").value
  const myNewContribution = (basicSalary * event.target.value / 100 );
  const newContributionPerc = document.getElementById("newContributionPerc").value
  const companyMedicalContribution = document.getElementById("companyMedicalContribution").value

  document.getElementById("myNewContribution").innerHTML = 'R '+ myNewContribution.toFixed(2);
  document.getElementById("changeInContribution").innerHTML = 'R ' + (myNewContribution - myCurrentMedicalContribution).toFixed(2);
  
  const taxable = calculateTaxable(basicSalary, myCurrentMedicalContribution, newContributionPerc, companyMedicalContribution);
  const newTaxableResult = calculateTax(taxable.newTaxable);
  const oldTaxableResult = calculateTax(taxable.oldTaxable);

  const changeInNet = (Number(basicSalary * newContributionPerc / 100) - (Number(basicSalary) / 100 * 7.5 ));

  document.getElementById("changeInNetPay").innerHTML = 'R ' + ((Number(newTaxableResult - oldTaxableResult) + Number(changeInNet))).toFixed(2);
} */


/* function updateNetPay(event)  {
  const basicSalary = document.getElementById("basicSalary").value
  const myCurrentMedicalContribution = document.getElementById("myCurrentMedicalContribution").value
  const newContributionPerc = document.getElementById("newContributionPerc").value
  const companyMedicalContribution = document.getElementById("companyMedicalContribution").value
  
  const taxable = calculateTaxable(basicSalary, myCurrentMedicalContribution, newContributionPerc, companyMedicalContribution);
  const newTaxableResult = calculateTax(taxable.newTaxable);
  const oldTaxableResult = calculateTax(taxable.oldTaxable);

  const changeInNet = (Number(basicSalary * newContributionPerc / 100) - (Number(basicSalary) / 100 * 7.5 ));

  document.getElementById("changeInNetPay").innerHTML = 'R ' + ((Number(newTaxableResult - oldTaxableResult) + Number(changeInNet))).toFixed(2);
} */

