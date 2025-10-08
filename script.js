/* -------------------- Lab database -------------------- */
const LAB_DB = {
"WBC":{name:"WBC", synonyms:["wbc","white blood cell","leukocyte"],unit:"10^3/µL",ranges:{male:[4,11],female:[4,11],other:[4,11]}},
"HGB":{name:"Hemoglobin", synonyms:["hgb","hemoglobin"],unit:"g/dL",ranges:{male:[13.5,17.5],female:[12,15.5],other:[12,17.5]}},
"HCT":{name:"Hematocrit", synonyms:["hct","hematocrit"],unit:"%",ranges:{male:[41,53],female:[36,46],other:[36,53]}},
"RBC":{name:"RBC", synonyms:["rbc","red blood cell","erythrocyte"],unit:"10^6/µL",ranges:{male:[4.5,5.9],female:[4.1,5.1],other:[4.1,5.9]}},
"MCV":{name:"MCV", synonyms:["mcv","mean corpuscular volume"],unit:"fL",ranges:{male:[80,100],female:[80,100],other:[80,100]}},
"PLT":{name:"Platelets", synonyms:["plt","platelet","platelets"],unit:"10^3/µL",ranges:{male:[150,450],female:[150,450],other:[150,450]}},
"ALT": {name:"Alanine Aminotransferase", synonyms:["alt","alanine aminotransferase","sgpt"], unit:"U/L", ranges:{male:[7,56],female:[7,56],other:[7,56]}},
"AST": {name:"Aspartate Aminotransferase", synonyms:["ast","aspartate aminotransferase","sgot"], unit:"U/L", ranges:{male:[10,40],female:[10,40],other:[10,40]}},
"ALP": {name:"Alkaline Phosphatase", synonyms:["alp","alkaline phosphatase"], unit:"U/L", ranges:{male:[45,115],female:[30,100],other:[30,115]}},
"VITAMIN_D": {name:"Vitamin D", synonyms:["vitamin d","25-oh vitamin d","25-hydroxy vitamin d"], unit:"ng/mL", ranges:{male:[30,100],female:[30,100],other:[30,100]}},
"VITAMIN_B12": {name:"Vitamin B12", synonyms:["vitamin b12","cobalamin","b12"], unit:"pg/mL", ranges:{male:[200,900],female:[200,900],other:[200,900]}},
"FOLATE": {name:"Folate", synonyms:["folate","folic acid"], unit:"ng/mL", ranges:{male:[3,17],female:[3,17],other:[3,17]}},
"RDW": {name:"Red Cell Distribution Width", synonyms:["rdw","red cell distribution width","red blood cell width"], unit:"%", ranges:{male:[11.5,14.5],female:[11.5,14.5],other:[11.5,14.5]}},
"MPV": {name:"Mean Platelet Volume", synonyms:["mpv","mean platelet volume"], unit:"fL", ranges:{male:[7.5,11.5],female:[7.5,11.5],other:[7.5,11.5]}},
"LDH": {name:"Lactate Dehydrogenase", synonyms:["ldh","lactate dehydrogenase","l-lactate dehydrogenase"], unit:"U/L", ranges:{male:[140,280],female:[140,280],other:[140,280]}},
"CRP_HIGH": {name:"C-Reactive Protein High Sensitivity", synonyms:["crp","c-reactive protein","crp high sensitivity"], unit:"mg/L", ranges:{male:[0,3],female:[0,3],other:[0,3]}},
"UA": {name:"Uric Acid", synonyms:["ua","uric acid","urate"], unit:"mg/dL", ranges:{male:[3.4,7.0],female:[2.4,6.0],other:[2.4,7.0]}},
"TSH": {name:"Thyroid Stimulating Hormone", synonyms:["tsh","thyroid stimulating hormone","thyroid function test"], unit:"µIU/mL", ranges:{male:[0.4,4.0],female:[0.4,4.0],other:[0.4,4.0]}},
"FT4": {name:"Free T4", synonyms:["ft4","free t4","thyroxine"], unit:"ng/dL", ranges:{male:[0.8,1.8],female:[0.8,1.8],other:[0.8,1.8]}},
"FT3": {name:"Free T3", synonyms:["ft3","free t3","triiodothyronine"], unit:"pg/mL", ranges:{male:[2.3,4.2],female:[2.3,4.2],other:[2.3,4.2]}},
"A1C": {name:"Hemoglobin A1C", synonyms:["a1c","hba1c","hemoglobin a1c"], unit:"%", ranges:{male:[4.0,5.6],female:[4.0,5.6],other:[4.0,5.6]}},
"GLU": {name:"Fasting Glucose", synonyms:["glu","glucose","fasting glucose","blood sugar"], unit:"mg/dL", ranges:{male:[70,99],female:[70,99],other:[70,99]}},
"CHOL": {name:"Total Cholesterol", synonyms:["chol","cholesterol","total cholesterol"], unit:"mg/dL", ranges:{male:[125,200],female:[125,200],other:[125,200]}},
"HDL": {name:"High-Density Lipoprotein", synonyms:["hdl","high density lipoprotein","good cholesterol"], unit:"mg/dL", ranges:{male:[40,60],female:[50,60],other:[40,60]}},
"LDL": {name:"Low-Density Lipoprotein", synonyms:["ldl","low density lipoprotein","bad cholesterol"], unit:"mg/dL", ranges:{male:[0,130],female:[0,130],other:[0,130]}},
"TRIG": {name:"Triglycerides", synonyms:["trig","triglycerides","triacylglycerol"], unit:"mg/dL", ranges:{male:[0,150],female:[0,150],other:[0,150]}},
"BUN": {name:"Blood Urea Nitrogen", synonyms:["bun","blood urea nitrogen","urea"], unit:"mg/dL", ranges:{male:[7,20],female:[7,20],other:[7,20]}},
"CREAT": {name:"Creatinine", synonyms:["creat","creatinine","serum creatinine"], unit:"mg/dL", ranges:{male:[0.7,1.3],female:[0.6,1.1],other:[0.6,1.3]}},
"VitaminD":{name:"Vitamin D",synonyms:["vit d","25-hydroxy vitamin d","25(OH)D"],unit:"ng/mL",ranges:{male:[30,100],female:[30,100],other:[30,100]}},
"VitaminB12":{name:"Vitamin B12",synonyms:["b12","cobalamin"],unit:"pg/mL",ranges:{male:[200,900],female:[200,900],other:[200,900]}},
"Folate":{name:"Folate",synonyms:["folic acid","vitamin b9"],unit:"ng/mL",ranges:{male:[3,20],female:[3,20],other:[3,20]}},
"VitaminA":{name:"Vitamin A",synonyms:["retinol"],unit:"µg/dL",ranges:{male:[20,80],female:[20,80],other:[20,80]}},
"VitaminE":{name:"Vitamin E",synonyms:["alpha-tocopherol"],unit:"mg/L",ranges:{male:[5,20],female:[5,20],other:[5,20]}},
"VitaminK":{name:"Vitamin K",synonyms:["phylloquinone"],unit:"ng/mL",ranges:{male:[0.2,3],female:[0.2,3],other:[0.2,3]}},
"VitaminC":{name:"Vitamin C",synonyms:["ascorbic acid"],unit:"mg/dL",ranges:{male:[0.2,2.0],female:[0.2,2.0],other:[0.2,2.0]}},
"Iron":{name:"Iron",synonyms:["serum iron"],unit:"µg/dL",ranges:{male:[65,175],female:[50,170],other:[50,175]}},
"Ferritin":{name:"Ferritin",synonyms:["iron stores"],unit:"ng/mL",ranges:{male:[30,300],female:[15,150],other:[15,300]}},
"TransferrinSaturation":{name:"Transferrin Saturation",synonyms:["tsat"],unit:"%",ranges:{male:[20,50],female:[20,50],other:[20,50]}},
"TIBC":{name:"Total Iron Binding Capacity",synonyms:["tibc"],unit:"µg/dL",ranges:{male:[250,450],female:[250,450],other:[250,450]}}
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
 if(labs["WBC"] && labs["WBC"].value>10) cond.push("Possible Infection (High WBC)");
 if(labs["PLT"] && labs["PLT"].value<125) cond.push("Thrombocytopenia (Low Platelets)");
 if(labs["HCT"] && labs["HCT"].value < 35) cond.push("Anemia (Low Hematocrit)");
 if(labs["MCV"] && labs["MCV"].value > 100) cond.push("Macrocytosis (High MCV)");
 if(labs["TSH"] && (labs["TSH"].value < 0.4 || labs["TSH"].value > 4.0)) cond.push("Thyroid Disorder");
 if(labs["CRP"] && labs["CRP"].value > 3) cond.push("Inflammation / Infection");
 if(labs["MCH"] && labs["MCH"].value < 27) cond.push("Possible Iron Deficiency (Low MCH)");
 if(labs["CHOL"] && labs["CHOL"].value > 200) cond.push("Hypercholesterolemia (High Total Cholesterol)");
 if(labs["LDL"] && labs["LDL"].value > 130) cond.push("High LDL (Cardiovascular Risk)");
 if(labs["HDL"] && labs["HDL"].value < 40) cond.push("Low HDL (Cardiovascular Risk)");
 if(labs["TRIG"] && labs["TRIG"].value > 150) cond.push("Hypertriglyceridemia (High Triglycerides)");
 if(labs["Vitamin D"] && labs["Vitamin D"].value < 30) cond.push("Vitamin D Deficiency");
 if(labs["Vitamin B12"] && labs["Vitamin B12"].value < 210) cond.push("Vitamin B12 Deficiency");
 if(labs["Folate"] && labs["FOLATE"].value < 13) cond.push("Folate Deficiency");
 if(labs["Ferritin"] && labs["Ferritin"].value < 25) cond.push("Low Iron");
 if(labs["Iron"] && labs["Iron"].value < 49) cond.push("Low Iron");
 if(labs["FT4"] && (labs["FT4"].value < 0.8 || labs["FT4"].value > 1.8)) cond.push("Thyroid Dysfunction (Free T4 abnormal)");
 if(labs["FT3"] && (labs["FT3"].value < 2.3 || labs["FT3"].value > 4.2)) cond.push("Thyroid Dysfunction (Free T3 abnormal)");
 if(labs["GLU"] && labs["GLU"].value > 99) cond.push("Hyperglycemia (High Fasting Glucose)");
 if(labs["A1C"] && labs["A1C"].value > 5.6) cond.push("Prediabetes / Diabetes (High HbA1c)");
 if(labs["BUN"] && labs["BUN"].value > 20) cond.push("Kidney Function Abnormal (High BUN)");
 if(labs["CREAT"] && labs["CREAT"].value > 1.3) cond.push("Kidney Function Abnormal (High Creatinine)");
 if(labs["Glucose"] && labs["Glucose"].value < 70) cond.push("Hypoglycemia (Low Glucose)");
 if(labs["Glucose"] && labs["Glucose"].value > 126) cond.push("Diabetes Mellitus (High Glucose)");
 if(labs["Creatinine"] && labs["Creatinine"].value > 1.2) cond.push("Renal Impairment (High Creatinine)");
 if(labs["Urea"] && labs["Urea"].value > 50) cond.push("Azotemia (High Urea)");
 if(labs["ALT"] && labs["ALT"].value > 40) cond.push("Liver Injury (High ALT)");
 if(labs["AST"] && labs["AST"].value > 40) cond.push("Liver Injury (High AST)");
 if(labs["ALP"] && labs["ALP"].value > 120) cond.push("Cholestasis or Bone Disorder (High ALP)");
 if(labs["Bilirubin"] && labs["Bilirubin"].value > 1.2) cond.push("Hyperbilirubinemia (High Bilirubin)");
 if(labs["Na"] && labs["Na"].value < 135) cond.push("Hyponatremia (Low Sodium)");
 if(labs["Na"] && labs["Na"].value > 145) cond.push("Hypernatremia (High Sodium)");
 if(labs["K"] && labs["K"].value < 3.5) cond.push("Hypokalemia (Low Potassium)");
 if(labs["K"] && labs["K"].value > 5.0) cond.push("Hyperkalemia (High Potassium)");
 if(labs["Ca"] && labs["Ca"].value < 8.5) cond.push("Hypocalcemia (Low Calcium)");
 if(labs["Ca"] && labs["Ca"].value > 10.5) cond.push("Hypercalcemia (High Calcium)");
 if(labs["Vitamin D"] && labs["Vitamin D"].value < 20) cond.push("Severe Vitamin D Deficiency");
 if(labs["Vitamin D"] && labs["Vitamin D"].value >= 20 && labs["Vitamin D"].value < 30) cond.push("Vitamin D Insufficiency");
 if(labs["Vitamin D"] && labs["Vitamin D"].value > 100) cond.push("Vitamin D Toxicity (Hypervitaminosis D)");
 if(labs["Vitamin B12"] && labs["Vitamin B12"].value < 200) cond.push("Vitamin B12 Deficiency (Risk of Megaloblastic Anemia)");
 if(labs["Vitamin B12"] && labs["Vitamin B12"].value > 900) cond.push("High Vitamin B12 (Possible Liver Disease or Myeloproliferative Disorder)");
 if(labs["Folate"] && labs["Folate"].value < 3) cond.push("Folate Deficiency (Risk of Megaloblastic Anemia)");
 if(labs["Folate"] && labs["Folate"].value > 20) cond.push("High Folate (Possible Excess Supplementation)");
 if(labs["Vitamin A"] && labs["Vitamin A"].value < 20) cond.push("Vitamin A Deficiency (Risk of Vision and Immune Issues)");
 if(labs["Vitamin A"] && labs["Vitamin A"].value > 80) cond.push("Vitamin A Toxicity (Hypervitaminosis A)");
 if(labs["Vitamin E"] && labs["Vitamin E"].value < 5) cond.push("Vitamin E Deficiency (Oxidative Stress Risk)");
 if(labs["Vitamin E"] && labs["Vitamin E"].value > 20) cond.push("Vitamin E Excess (Possible Coagulation Impairment)");
 if(labs["Vitamin K"] && labs["Vitamin K"].value < 0.2) cond.push("Vitamin K Deficiency (Risk of Bleeding)");
 if(labs["Vitamin K"] && labs["Vitamin K"].value > 3) cond.push("High Vitamin K (Possible Over-supplementation)");
 if(labs["Vitamin C"] && labs["Vitamin C"].value < 0.2) cond.push("Vitamin C Deficiency (Scurvy Risk)");
 if(labs["Vitamin C"] && labs["Vitamin C"].value > 2.0) cond.push("High Vitamin C (Possible Kidney Stone Risk)");
 if(labs["Iron"] && labs["Iron"].value < 50) cond.push("Iron Deficiency (Low Serum Iron)");
 if(labs["Iron"] && labs["Iron"].value > 170) cond.push("Iron Overload (Possible Hemochromatosis or Excess Intake)");
 if(labs["Ferritin"] && labs["Ferritin"].value < 30) cond.push("Iron Deficiency (Low Ferritin, Depleted Stores)");
 if(labs["Ferritin"] && labs["Ferritin"].value > 300) cond.push("High Ferritin (Possible Inflammation, Liver Disease, or Hemochromatosis)");
 if(labs["Transferrin Saturation"] && labs["Transferrin Saturation"].value < 20) cond.push("Iron Deficiency (Low Transferrin Saturation)");
 if(labs["Transferrin Saturation"] && labs["Transferrin Saturation"].value > 50) cond.push("Iron Overload (High Transferrin Saturation)");
 if(labs["TIBC"] && labs["TIBC"].value > 450) cond.push("Iron Deficiency (High TIBC)");
 if(labs["TIBC"] && labs["TIBC"].value < 250) cond.push("Iron Overload or Chronic Disease (Low TIBC)");
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























