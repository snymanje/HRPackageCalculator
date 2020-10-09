function calculateTaxable(basicSalary, newContributionPerc, companyMedicalContribution) {
  //console.log(basicSalary, newContributionPerc, companyMedicalContribution)
  var oldTaxable = (Number(basicSalary) + Number(companyMedicalContribution) - (Number(basicSalary) / 100 * 7.5 )) * 12;
  var newTaxable = (Number(basicSalary) + Number(companyMedicalContribution) - (Number(basicSalary) / 100 * Number(newContributionPerc))) * 12;
  return {
    oldTaxable: oldTaxable, 
    newTaxable: newTaxable
   }
}

function calculateTax(basicSalary) {
  var fixed = 0;
  var percentage = 0;
  var rebate = 14958;
  var netPay = 0
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
  var basicSalary = document.getElementById("basicSalary").value || 0;
  console.log('Basic Salary: ' + basicSalary)

  var companyMedicalContribution = document.getElementById("companyMedicalContribution").value || 0
  console.log('Company Medical Contribution: ' + companyMedicalContribution)

  var myCurrentRetirementContribution = (basicSalary * 7.5 / 100).toFixed(2);
  console.log('Current Retirement Contribution: ' + myCurrentRetirementContribution)

  var newContributionPerc = document.getElementById("newContributionPerc").value || 0
  console.log('New Retirement Contribution %: ' + newContributionPerc)

  var myNewContribution = (basicSalary * newContributionPerc / 100 ) || 0;
  console.log('New Contribution: ' + myNewContribution)

  document.getElementById("myCurrentRetirementContribution").value = (basicSalary * 7.5 / 100).toFixed(2);
  document.getElementById("myNewContribution").innerHTML = 'R '+ myNewContribution.toFixed(2);
  document.getElementById("changeInContribution").innerHTML = 'R ' + (myNewContribution - myCurrentRetirementContribution).toFixed(2);

  var taxable = calculateTaxable(basicSalary, newContributionPerc, companyMedicalContribution);
  var newTaxableResult = calculateTax(taxable.newTaxable);
  var oldTaxableResult = calculateTax(taxable.oldTaxable);

  var changeInNet = (Number(basicSalary * newContributionPerc / 100) - (Number(basicSalary) / 100 * 7.5 ));

  document.getElementById("changeInNetPay").innerHTML = 'R ' + ((Number(newTaxableResult - oldTaxableResult) + Number(changeInNet))).toFixed(2);
}

document.getElementById("newContributionPerc").addEventListener("change", updateCalculator);
document.getElementById("basicSalary").addEventListener("keydown", updateCalculator);
document.getElementById("basicSalary").addEventListener("change", updateCalculator);
document.getElementById("companyMedicalContribution").addEventListener("change", updateCalculator);
document.getElementById("companyMedicalContribution").addEventListener("keydown", updateCalculator);

