/* -------------------- Lab database -------------------- */
const LAB_DB = {
"WBC":{name:"WBC", synonyms:["wbc","white blood cell","leukocyte"],unit:"10^3/µL",ranges:{male:[4,11],female:[4,11],other:[4,11]}},
"HGB":{name:"Hemoglobin", synonyms:["hgb","hemoglobin"],unit:"g/dL",ranges:{male:[13.5,17.5],female:[12,15.5],other:[12,17.5]}},
"HCT":{name:"Hematocrit", synonyms:["hct","hematocrit"],unit:"%",ranges:{male:[41,53],female:[36,46],other:[36,53]}},
"RBC":{name:"RBC", synonyms:["rbc","red blood cell","erythrocyte"],unit:"10^6/µL",ranges:{male:[4.5,5.9],female:[4.1,5.1],other:[4.1,5.9]}},
"MCV":{name:"MCV", synonyms:["mcv","mean corpuscular volume"],unit:"fL",ranges:{male:[80,100],female:[80,100],other:[80,100]}},
"PLT":{name:"Platelets", synonyms:["plt","platelet","platelets"],unit:"10^3/µL",ranges:{male:[150,450],female:[150,450],other:[150,450]}},
// add more as needed
};

/* Flatten synonyms */
const SYN_TO_KEY = {};
for(const [k,v] of Object.entries(LAB_DB)){
  SYN_TO_KEY[v.name.toLowerCase()] = k;
  v.synonyms.forEach(s=>SYN_TO_KEY[s.toLowerCase()] = k);
}

/* Extract text from PDF */
async function extractTextFromPDF(file){
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
  let text = "";
  for(let p=1;p<=pdf.numPages;p++){
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const strings = content.items.map(i=>i.str);
    text += strings.join(" ")+"\n";
  }
  return text;
}

/* OCR fallback */
async function ocrFile(file){
  const {data} = await Tesseract.recognize(file,'eng',{logger:m=>{}});
  return data.text;
}

/* Extract numbers */
function parseNumbersFromText(text){
  const rx = /([0-9]+(?:\.[0-9]+)?)/g;
  const matches = [];
  let m;
  while((m=rx.exec(text))!==null){
    matches.push({num:Number(m[1]), index:m.index});
  }
  return matches;
}

/* Normalize line */
function normalizeLine(s){return s.trim().toLowerCase();}

/* Get lines */
function getLines(text){
  return text.split(/\r?\n|;/).map(l=>l.trim()).filter(l=>l.length>0);
}

/* Find labs in text */
function findLabsInText(text){
  const lines = getLines(text);
  const found = {};
  for(let i=0;i<lines.length;i++){
    const line = normalizeLine(lines[i]);
    for(const phrase in SYN_TO_KEY){
      if(line.includes(phrase)){
        const key = SYN_TO_KEY[phrase];
        const nums = parseNumbersFromText(lines[i]);
        if(nums.length>0){
          found[key] = {value: nums[0].num, rawLine: lines[i]};
        }
      }
    }
  }
  return found;
}

/* Interpret flags */
function interpretValue(key,value){
  const meta = LAB_DB[key];
  const [low,high] = meta.ranges.male; // for simplicity, can adapt to sex
  let flag = "Normal";
  if(value<low) flag="Low";
  else if(value>high) flag="High";
  return {flag, value, unit:meta.unit, name:meta.name};
}

/* Simple predictions based on labs */
function predictConditions(labs){
  const cond = [];
  if(labs["HGB"] && labs["HGB"].value<12) cond.push("Anemia (Low Hemoglobin)");
  if(labs["WBC"] && labs["WBC"].value>11) cond.push("Possible Infection (High WBC)");
  if(labs["PLT"] && labs["PLT"].value<150) cond.push("Thrombocytopenia (Low Platelets)");
  if(labs["HCT"] && labs["HCT"].value < 36) cond.push("Anemia (Low Hematocrit)");
  if(labs["MCV"] && labs["MCV"].value > 100) cond.push("Macrocytosis (High MCV)");
  if(labs["TSH"] && (labs["TSH"].value < 0.4 || labs["TSH"].value > 4.0)) cond.push("Thyroid Disorder");
  if(labs["CRP"] && labs["CRP"].value > 3) cond.push("Inflammation / Infection");
  if(labs["MCH"] && labs["MCH"].value < 27) cond.push("Possible Iron Deficiency (Low MCH)");
  if(labs["CHOL"] && labs["CHOL"].value > 200) cond.push("Hypercholesterolemia (High Total Cholesterol)");
  if(labs["LDL"] && labs["LDL"].value > 130) cond.push("High LDL (Cardiovascular Risk)");
  if(labs["HDL"] && labs["HDL"].value < 40) cond.push("Low HDL (Cardiovascular Risk)");
  if(labs["TRIG"] && labs["TRIG"].value > 150) cond.push("Hypertriglyceridemia (High Triglycerides)");
  if(labs["VITAMIN_D"] && labs["VITAMIN_D"].value < 30) cond.push("Vitamin D Deficiency");
  if(labs["VITAMIN_B12"] && labs["VITAMIN_B12"].value < 210) cond.push("Vitamin B12 Deficiency");
  if(labs["FOLATE"] && labs["FOLATE"].value < 13) cond.push("Folate Deficiency");
  return cond.length>0?cond:["No major abnormalities detected"];
}

/* Main analyze function */
async function analyzeReport(file, sex, age){
  const statusText = document.getElementById('statusText');
  statusText.innerText='Reading file...';
  let text="";
  try{
    if(file.name.toLowerCase().endsWith('.pdf')){
      text = await extractTextFromPDF(file);
      if(!text || text.trim().length<50) text = await ocrFile(file);
    } else {
      text = await ocrFile(file);
    }
  } catch(err){throw new Error("Failed to read file: "+err);}
  
  statusText.innerText='Parsing labs...';
  const found = findLabsInText(text);
  const flagsList = document.getElementById('flagsList');
  const predictionList = document.getElementById('predictionList');
  flagsList.innerHTML=''; predictionList.innerHTML='';
  
  const interpreted = {};
  for(const k in found){
    const iv = interpretValue(k,found[k].value);
    interpreted[k]=iv;
    const div = document.createElement('div');
    div.className='result-row';
    div.innerHTML=`<div class="result-name">${iv.name}</div><div class="result-val">${iv.value} ${iv.unit}</div><div class="result-flag ${iv.flag.toLowerCase()}"> ${iv.flag} </div>`;
    flagsList.appendChild(div);
  }
  
  document.getElementById('flagsSection').classList.remove('hidden');
  document.getElementById('predictionSection').classList.remove('hidden');
  
  const predictions = predictConditions(interpreted);
  predictions.forEach(p=>{
    const div = document.createElement('div');
    div.className='result-row';
    div.innerText=p;
    predictionList.appendChild(div);
  });
  
  statusText.innerText='Analysis complete.';
}

/* Event listener */
document.getElementById('analyzeBtn').addEventListener('click', async ()=>{
  const file = document.getElementById('fileInput').files[0];
  const sex = document.getElementById('sex').value;
  const age = Number(document.getElementById('age').value);
  const statusText = document.getElementById('statusText');
  if(!file){statusText.innerText='Please select a file!'; return;}
  statusText.innerText='Processing...';
  try{
    await analyzeReport(file, sex, age);
  } catch(err){
    statusText.innerText='Error: '+err.message;
  }
});












