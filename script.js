/* -------------------- Lab database -------------------- */
const LAB_DB = {
"WBC":{name:"WBC", synonyms:["wbc","white blood cell","leukocyte"],unit:"10^3/µL",ranges:{male:[4,11],female:[4,11],other:[4,11]}},
"HGB":{name:"Hemoglobin", synonyms:["hgb","hemoglobin"],unit:"g/dL",ranges:{male:[13.5,17.5],female:[12,15.5],other:[12,17.5]}},
"HCT":{name:"Hematocrit", synonyms:["hct","hematocrit"],unit:"%",ranges:{male:[41,53],female:[36,46],other:[36,53]}},
"RBC":{name:"RBC", synonyms:["rbc","red blood cell","erythrocyte"],unit:"10^6/µL",ranges:{male:[4.5,5.9],female:[4.1,5.1],other:[4.1,5.9]}},
"MCV":{name:"MCV", synonyms:["mcv","mean corpuscular volume"],unit:"fL",ranges:{male:[80,100],female:[80,100],other:[80,100]}},
"PLT":{name:"Platelets", synonyms:["plt","platelet","platelets"],unit:"10^3/µL",ranges:{male:[150,450],female:[150,450],other:[150,450]}},
"RDW": {name:"Red Cell Distribution Width", unit:"%", ranges:{male:[11.5,14.5],female:[11.5,14.5],other:[11.5,14.5]}},
"MPV": {name:"Mean Platelet Volume", unit:"fL", ranges:{male:[7.5,11.5],female:[7.5,11.5],other:[7.5,11.5]}},
"LDH": {name:"Lactate Dehydrogenase", unit:"U/L", ranges:{male:[140,280],female:[140,280],other:[140,280]}},
"CRP_HIGH": {name:"C-Reactive Protein High Sensitivity", unit:"mg/L", ranges:{male:[0,3],female:[0,3],other:[0,3]}},
"UA": {name:"Uric Acid", unit:"mg/dL", ranges:{male:[3.4,7.0],female:[2.4,6.0],other:[2.4,7.0]}},
"TSH": {name:"Thyroid Stimulating Hormone", unit:"µIU/mL", ranges:{male:[0.4,4.0],female:[0.4,4.0],other:[0.4,4.0]}},
"FT4": {name:"Free T4", unit:"ng/dL", ranges:{male:[0.8,1.8],female:[0.8,1.8],other:[0.8,1.8]}},
"FT3": {name:"Free T3", unit:"pg/mL", ranges:{male:[2.3,4.2],female:[2.3,4.2],other:[2.3,4.2]}},
"A1C": {name:"Hemoglobin A1C", unit:"%", ranges:{male:[4.0,5.6],female:[4.0,5.6],other:[4.0,5.6]}},
"GLU": {name:"Fasting Glucose", unit:"mg/dL", ranges:{male:[70,99],female:[70,99],other:[70,99]}},
"CHOL": {name:"Total Cholesterol", unit:"mg/dL", ranges:{male:[125,200],female:[125,200],other:[125,200]}},
"HDL": {name:"High-Density Lipoprotein", unit:"mg/dL", ranges:{male:[40,60],female:[50,60],other:[40,60]}},
"LDL": {name:"Low-Density Lipoprotein", unit:"mg/dL", ranges:{male:[0,130],female:[0,130],other:[0,130]}},
"TRIG": {name:"Triglycerides", unit:"mg/dL", ranges:{male:[0,150],female:[0,150],other:[0,150]}},
"BUN": {name:"Blood Urea Nitrogen", unit:"mg/dL", ranges:{male:[7,20],female:[7,20],other:[7,20]}},
"CREAT": {name:"Creatinine", unit:"mg/dL", ranges:{male:[0.7,1.3],female:[0.6,1.1],other:[0.6,1.3]}},
"ALT": {name:"Alanine Aminotransferase", unit:"U/L", ranges:{male:[7,56],female:[7,56],other:[7,56]}},
"AST": {name:"Aspartate Aminotransferase", unit:"U/L", ranges:{male:[10,40],female:[10,40],other:[10,40]}},
"ALP": {name:"Alkaline Phosphatase", unit:"U/L", ranges:{male:[45,115],female:[30,100],other:[30,115]}},
"VITAMIN_D": {name:"Vitamin D", unit:"ng/mL", ranges:{male:[30,100],female:[30,100],other:[30,100]}},
"VITAMIN_B12": {name:"Vitamin B12", unit:"pg/mL", ranges:{male:[200,900],female:[200,900],other:[200,900]}},
"FOLATE": {name:"Folate", unit:"ng/mL", ranges:{male:[3,17],female:[3,17],other:[3,17]}}
/* Additional CBC & Metabolic tests */
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
  if(labs["UA"] && labs["UA"].value > 7) cond.push("Hyperuricemia / Gout");
  if(labs["CRP_HIGH"] && labs["CRP_HIGH"].value > 3) cond.push("Inflammation / Infection");
  if(labs["MCH"] && labs["MCH"].value < 27) cond.push("Possible Iron Deficiency (Low MCH)");
  if(labs["PLT"] && labs["PLT"].value < 150) cond.push("Thrombocytopenia (Low Platelets)");
  if(labs["TSH"] && (labs["TSH"].value < 0.4 || labs["TSH"].value > 4.0)) cond.push("Thyroid Disorder");
  if(labs["GLU"] && labs["GLU"].value > 126) cond.push("Possible Diabetes (High Fasting Glucose)");
  if(labs["A1C"] && labs["A1C"].value > 6.5) cond.push("Possible Diabetes (High A1C)");
  if(labs["CHOL"] && labs["CHOL"].value > 200) cond.push("Hypercholesterolemia (High Total Cholesterol)");
  if(labs["LDL"] && labs["LDL"].value > 130) cond.push("High LDL (Cardiovascular Risk)");
  if(labs["HDL"] && labs["HDL"].value < 40) cond.push("Low HDL (Cardiovascular Risk)");
  if(labs["TRIG"] && labs["TRIG"].value > 150) cond.push("Hypertriglyceridemia (High Triglycerides)");
  if(labs["CRP"] && labs["CRP"].value > 5) cond.push("Inflammation / Infection");
  if(labs["BUN"] && labs["BUN"].value > 20) cond.push("Possible Kidney Dysfunction (High BUN)");
  if(labs["CREAT"] && labs["CREAT"].value > 1.3) cond.push("Possible Kidney Dysfunction (High Creatinine)");
  if(labs["ALT"] && labs["ALT"].value > 56) cond.push("Possible Liver Injury (High ALT)");
  if(labs["AST"] && labs["AST"].value > 40) cond.push("Possible Liver Injury (High AST)");
  if(labs["ALP"] && labs["ALP"].value > 147) cond.push("Possible Liver/Bone Issue (High ALP)");
  if(labs["VITAMIN_D"] && labs["VITAMIN_D"].value < 30) cond.push("Vitamin D Deficiency");
  if(labs["VITAMIN_B12"] && labs["VITAMIN_B12"].value < 200) cond.push("Vitamin B12 Deficiency");
  if(labs["FOLATE"] && labs["FOLATE"].value < 3) cond.push("Folate Deficiency");
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




