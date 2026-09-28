/**
 * KLE Hospital - Healthcare Data Repository
 * Departments, Doctors, Health Packages, Sample Reports, and Services
 */

const HOSPITAL_DATA = {
  info: {
    name: "KLE Hospital",
    legalName: "KLE Multi-Specialty & Research Hospital",
    tagline: "Excellence in Healthcare, Compassion in Healing",
    emergencyPhone: "+91 831 247 3777",
    ambulancePhone: "+91 831 247 9999",
    generalPhone: "+91 831 247 1000",
    email: "care@klehospital.org",
    appointmentEmail: "appointments@klehospital.org",
    address: "Nehru Nagar, National Highway 4, Belagavi, Karnataka 590010, India",
    workingHours: "24 Hours Emergency | OPD: 08:00 AM - 08:00 PM (Mon - Sat)",
    accreditations: ["NABH Accredited", "JCI Certified", "NABL Lab", "ISO 9001:2015"],
    stats: {
      beds: "1,250+",
      doctors: "350+",
      specialties: "45+",
      surgeriesPerYear: "28,000+",
      happyPatients: "500,000+",
      satisfactionRate: "99.4%"
    }
  },

  departments: [
    {
      id: "cardiology",
      name: "Cardiology & Cardiac Surgery",
      icon: "heart-pulse",
      shortDesc: "Comprehensive cardiac care with digital Cath Labs, bypass surgeries, and heart rhythm management.",
      fullDesc: "The KLE Institute of Cardiac Sciences is recognized as a regional center of excellence for tertiary cardiac care. Our facility is equipped with state-of-the-art bi-plane digital catheterization laboratories, hybrid operating rooms, and dedicated coronary intensive care units.",
      keyProcedures: ["Coronary Angioplasty & Stenting", "Minimally Invasive CABG", "Pediatric Cardiac Surgery", "Pacemaker & ICD Implants", "TAVI / TAVR Procedures"],
      leadDoctor: "Dr. Vikramaditya Patil",
      stats: "15,000+ Cath Lab Procedures",
      bannerImage: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "neurology",
      name: "Neurology & Neurosurgery",
      icon: "activity",
      shortDesc: "Advanced brain and spine institute featuring neuro-navigation, stroke unit, and microsurgery.",
      fullDesc: "Specialized care for acute neurological emergencies, neuro-oncology, complex spine disorders, and pediatric neurosurgery. Supported by 3T Intra-operative MRI, biplane neuro-angiography, and dedicated Neuro ICU.",
      keyProcedures: ["24/7 Hyperacute Stroke Protocol", "Microvascular Decompression", "Endoscopic Skull Base Surgery", "Spinal Fusion & Disc Replacement", "Epilepsy Monitoring & Surgery"],
      leadDoctor: "Dr. Meenakshi Sundaram",
      stats: "98.2% Stroke Recovery Rate",
      bannerImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "oncology",
      name: "Comprehensive Cancer Care (Oncology)",
      icon: "shield-alert",
      shortDesc: "Multidisciplinary cancer center combining medical, surgical, and precision radiation oncology.",
      fullDesc: "Our comprehensive cancer care unit adopts an evidence-based tumor board approach. We offer linear accelerators with TrueBeam stereotactic radiotherapy, Daycare Chemotherapy suites, and advanced bone marrow transplantation.",
      keyProcedures: ["Immunotherapy & Targeted Therapies", "Stereotactic Radiosurgery (SRS/SBRT)", "Organ-Preserving Cancer Surgeries", "PET-CT Guided Biopsy", "Daycare Infusion Centre"],
      leadDoctor: "Dr. Rajeshwar Kulkarni",
      stats: "12,000+ Chemotherapy Cycles/Yr",
      bannerImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "orthopedics",
      name: "Orthopedics & Joint Replacement",
      icon: "bone",
      shortDesc: "Robotic joint replacements, sports trauma medicine, and minimally invasive spine interventions.",
      fullDesc: "Equipped with the Mako Robotic-Arm surgical system for precision total knee and hip replacements. Fast-track rehabilitation programs enable 85% of our joint replacement patients to walk within 12 hours of surgery.",
      keyProcedures: ["Robotic Knee & Hip Arthroplasty", "Arthroscopic ACL/Meniscus Repair", "Complex Pelvic Acetabular Trauma", "Deformity Correction", "Geriatric Fracture Unit"],
      leadDoctor: "Dr. Anand Deshpande",
      stats: "6,500+ Robotic Joint Surgeries",
      bannerImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pediatrics",
      name: "Pediatrics & Neonatology",
      icon: "baby",
      shortDesc: "Level-III Neonatal ICU, pediatric emergency unit, and specialized pediatric surgery.",
      fullDesc: "Dedicated to the health of newborns, infants, children, and adolescents. Our Level III NICU handles extreme premature births down to 24 weeks gestation with modern high-frequency ventilators and nitric oxide therapy.",
      keyProcedures: ["Extreme Preterm Infant Care", "Pediatric Intensive Care (PICU)", "Congenital Anomaly Corrections", "Pediatric Pulmonology & Asthma", "Childhood Immunization Programs"],
      leadDoctor: "Dr. Shalini Hegde",
      stats: "Level III NICU with 99.1% Survival",
      bannerImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gastroenterology",
      name: "Gastroenterology & Hepatology",
      icon: "layers",
      shortDesc: "Advanced digestive endoscopy, liver care, pancreatic diseases, and GI surgery.",
      fullDesc: "Offering comprehensive diagnosis and treatment of gastrointestinal and hepatobiliary disorders with high-definition video endoscopes, spyglass cholangioscopy, and endoscopic ultrasound (EUS).",
      keyProcedures: ["Diagnostic & Therapeutic ERCP", "Endoscopic Submucosal Dissection", "Liver Disease & Cirrhosis Clinic", "Bariatric & Metabolic Surgeries", "Capsule Endoscopy"],
      leadDoctor: "Dr. Pradeep Shenoy",
      stats: "8,000+ Endoscopies Per Year",
      bannerImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "nephrology",
      name: "Nephrology & Urology Care",
      icon: "droplet",
      shortDesc: "Advanced renal care, high-flux hemodialysis, kidney transplants, and laser stone removal.",
      fullDesc: "Modern dialysis facility with online hemodiafiltration (HDF), automated peritoneal dialysis training, and kidney transplantation program with donor lap nephrectomy.",
      keyProcedures: ["Renal Transplantation", "Holmium Laser Enucleation (HoLEP)", "Flexible Ureteroscopy (RIRS)", "24/7 Hemodialysis Unit", "Pediatric Nephrology Clinic"],
      leadDoctor: "Dr. Arun Kumar Joshi",
      stats: "200+ Renal Transplants",
      bannerImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "emergency",
      name: "Emergency & Level-1 Trauma",
      icon: "flame",
      shortDesc: "24/7 dedicated acute emergency resuscitation bays with integrated triage and trauma OT.",
      fullDesc: "Manned round-the-clock by certified emergency physicians, trauma surgeons, and anesthesiologists. Direct access to 128-slice CT and digital X-ray right within the emergency wing.",
      keyProcedures: ["Rapid Resuscitation Bay", "Advanced Cardiac Life Support", "Polytrauma Critical Care", "Toxin & Poison Management", "Mobile ICU Ambulance Fleet"],
      leadDoctor: "Dr. Raghavendra Rao",
      stats: "< 8 Minutes Door-to-Doctor Time",
      bannerImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80"
    }
  ],

  doctors: [
    {
      id: "doc-1",
      name: "Dr. Vikramaditya Patil",
      designation: "Chief Cardiologist & Director of Heart Institute",
      departmentId: "cardiology",
      departmentName: "Cardiology",
      degrees: "MBBS, MD (Internal Med), DM (Cardiology), FACC (USA)",
      experience: "24+ Years",
      rating: 4.9,
      reviewsCount: 384,
      opdTiming: "Mon - Fri | 10:00 AM - 02:00 PM",
      fee: "₹ 1,000",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
      bio: "Pioneer in transradial coronary interventions and complex structural heart therapies with over 18,000 angiographies and angioplasties.",
      languages: ["English", "Hindi", "Kannada", "Marathi"]
    },
    {
      id: "doc-2",
      name: "Dr. Meenakshi Sundaram",
      designation: "Senior Consultant Neurosurgeon & Spine Specialist",
      departmentId: "neurology",
      departmentName: "Neurology",
      degrees: "MBBS, MS (General Surgery), MCh (Neurosurgery), FINR",
      experience: "20+ Years",
      rating: 4.9,
      reviewsCount: 312,
      opdTiming: "Tue, Thu, Sat | 11:00 AM - 03:30 PM",
      fee: "₹ 1,200",
      image: "https://images.unsplash.com/photo-1594824813568-15104d49a2a7?auto=format&fit=crop&w=600&q=80",
      bio: "Internationally trained neurosurgeon focusing on skull base microneurosurgery, awake craniotomy, and endoscopic spine stabilization.",
      languages: ["English", "Hindi", "Kannada", "Tamil"]
    },
    {
      id: "doc-3",
      name: "Dr. Rajeshwar Kulkarni",
      designation: "Head - Surgical & Precision Oncology",
      departmentId: "oncology",
      departmentName: "Oncology",
      degrees: "MBBS, MS, DNB (Surgical Oncology), Fellow Memorial Sloan Kettering",
      experience: "19+ Years",
      rating: 4.8,
      reviewsCount: 278,
      opdTiming: "Mon, Wed, Fri | 09:30 AM - 01:30 PM",
      fee: "₹ 1,100",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
      bio: "Expert in minimally invasive gastrointestinal, thoracic, and gynecologic oncological surgeries, with a focus on organ preservation.",
      languages: ["English", "Hindi", "Kannada", "Marathi"]
    },
    {
      id: "doc-4",
      name: "Dr. Anand Deshpande",
      designation: "Director - Joint Replacement & Arthroscopy",
      departmentId: "orthopedics",
      departmentName: "Orthopedics",
      degrees: "MBBS, MS (Ortho), MCh (Orth, UK), AO Fellow (Switzerland)",
      experience: "22+ Years",
      rating: 4.9,
      reviewsCount: 420,
      opdTiming: "Mon - Sat | 09:00 AM - 01:00 PM",
      fee: "₹ 900",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
      bio: "Renowned for performing over 7,000 computer-navigated and robotic-assisted total knee and hip replacements.",
      languages: ["English", "Hindi", "Kannada"]
    },
    {
      id: "doc-5",
      name: "Dr. Shalini Hegde",
      designation: "Lead Neonatologist & Pediatric Critical Care",
      departmentId: "pediatrics",
      departmentName: "Pediatrics",
      degrees: "MBBS, MD (Pediatrics), Fellowship in Neonatology (Sydney)",
      experience: "16+ Years",
      rating: 4.95,
      reviewsCount: 512,
      opdTiming: "Mon - Sat | 10:00 AM - 04:00 PM",
      fee: "₹ 800",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
      bio: "Specializes in high-risk neonatology, developmental follow-ups, pediatric emergency resuscitation, and neonatal ventilation.",
      languages: ["English", "Hindi", "Kannada"]
    },
    {
      id: "doc-6",
      name: "Dr. Pradeep Shenoy",
      designation: "Senior Consultant Medical Gastroenterologist",
      departmentId: "gastroenterology",
      departmentName: "Gastroenterology",
      degrees: "MBBS, MD, DM (Gastroenterology), FACG",
      experience: "18+ Years",
      rating: 4.8,
      reviewsCount: 260,
      opdTiming: "Mon, Wed, Fri | 02:00 PM - 06:00 PM",
      fee: "₹ 950",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
      bio: "Expert in complex biliary therapeutic endoscopies, non-alcoholic fatty liver disease (NAFLD), and inflammatory bowel disorders (IBD).",
      languages: ["English", "Hindi", "Kannada", "Konkani"]
    },
    {
      id: "doc-7",
      name: "Dr. Arun Kumar Joshi",
      designation: "Chief of Renal Sciences & Kidney Transplant",
      departmentId: "nephrology",
      departmentName: "Nephrology",
      degrees: "MBBS, MD, DM (Nephrology), FISN",
      experience: "21+ Years",
      rating: 4.85,
      reviewsCount: 304,
      opdTiming: "Tue, Thu, Sat | 09:30 AM - 01:30 PM",
      fee: "₹ 1,000",
      image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=600&q=80",
      bio: "Leading nephrologist with special interest in diabetic kidney disease, hemodialysis optimization, and living donor renal transplants.",
      languages: ["English", "Hindi", "Kannada"]
    },
    {
      id: "doc-8",
      name: "Dr. Raghavendra Rao",
      designation: "Head - Emergency Medicine & Trauma Care",
      departmentId: "emergency",
      departmentName: "Emergency Care",
      degrees: "MBBS, MD (Emergency Medicine), MRCEM (UK)",
      experience: "15+ Years",
      rating: 4.9,
      reviewsCount: 460,
      opdTiming: "24/7 On-Duty Roster Emergency Desk",
      fee: "₹ 750",
      image: "https://images.unsplash.com/photo-1622253694242-abdb3c8b417e?auto=format&fit=crop&w=600&q=80",
      bio: "Emergency medicine specialist trained in acute trauma resuscitation, toxicological crises, disaster triaging, and cardiac arrest rescue.",
      languages: ["English", "Hindi", "Kannada"]
    }
  ],

  healthPackages: [
    {
      id: "pkg-basic",
      name: "KLE Essential Wellness",
      idealFor: "Young Adults & Routine Checkups",
      tag: "Popular",
      price: "₹ 1,499",
      originalPrice: "₹ 2,800",
      parameterCount: "38 Parameters",
      tests: [
        "Complete Blood Count (CBC with ESR - 18 parameters)",
        "Fasting Blood Sugar (FBS)",
        "Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)",
        "Liver Function Test (SGOT, SGPT, Bilirubin)",
        "Kidney Function Test (Serum Creatinine, Blood Urea)",
        "Routine Urine Analysis",
        "Resting 12-Lead ECG",
        "General Physician Consultation"
      ]
    },
    {
      id: "pkg-cardiac",
      name: "KLE Executive Heart & Vascular Care",
      idealFor: "Individuals aged 35+, High-Stress Professionals",
      tag: "Best Value",
      price: "₹ 4,499",
      originalPrice: "₹ 7,800",
      parameterCount: "62 Parameters",
      tests: [
        "Everything in Essential Wellness Package",
        "High Sensitivity Troponin-I / hs-CRP",
        "HbA1c (3-Month Glycemic Average)",
        "2D Echocardiogram with Color Doppler",
        "Treadmill Stress Test (TMT) / Stress Echo",
        "Digital Chest X-Ray (PA View)",
        "Serum Electrolytes (Na, K, Cl)",
        "Consultation with Senior Cardiologist & Dietitian"
      ]
    },
    {
      id: "pkg-senior",
      name: "KLE Senior Citizen Comprehensive Care",
      idealFor: "Elders aged 60+ (Men & Women)",
      tag: "Recommended",
      price: "₹ 5,999",
      originalPrice: "₹ 10,500",
      parameterCount: "74 Parameters",
      tests: [
        "Everything in Executive Package",
        "Serum Vitamin D3 & Vitamin B12 Levels",
        "Bone Mineral Density Scan (DEXA Spine & Hip)",
        "Prostate Specific Antigen (PSA) for Men",
        "Pelvic Ultrasound / Pap Smear for Women",
        "Complete Eye Examination & Glaucoma Screen",
        "Audiometry Hearing Assessment",
        "Geriatric & Orthopedic Specialist Consultations"
      ]
    },
    {
      id: "pkg-women",
      name: "KLE Women's Holistic Health & Harmony",
      idealFor: "Women of all ages (PCOS, Thyroid, Wellness)",
      tag: "Specialized",
      price: "₹ 3,799",
      originalPrice: "₹ 6,400",
      parameterCount: "52 Parameters",
      tests: [
        "Complete Blood Count, Iron & Ferritin Profile",
        "Comprehensive Thyroid Panel (FT3, FT4, TSH)",
        "HbA1c & Fasting Insulin (PCOS screen)",
        "Ultrasonography - Pelvis & Abdomen",
        "Digital Bilateral Sonomammography",
        "Cervical Cancer Screening (Liquid Pap Smear)",
        "Urine Microalbumin",
        "Senior Gynecologist & Nutritionist Consultation"
      ]
    }
  ],

  facilities: [
    {
      title: "Da Vinci Xi Robotic Surgical System",
      desc: "Millimeter-precision multi-quadrant surgeries with smaller incisions, negligible blood loss, and faster recovery.",
      icon: "cpu"
    },
    {
      title: "3.0 Tesla Digital MRI & 128-Slice Dual Source CT",
      desc: "Ultra-sharp diagnostic neuro, cardiac, and musculoskeletal imaging in half the conventional scan time.",
      icon: "scan"
    },
    {
      title: "12 Modular Laminar Airflow OTs",
      desc: "HEPA filtration Class-100 cleanroom operating suites minimizing surgical site infection risk to near zero.",
      icon: "shield-check"
    },
    {
      title: "Level-1 Trauma & 24/7 Mobile ICU Fleet",
      desc: "GPS-synchronized critical care ambulances equipped with defibrillators, transport ventilators, and telemetry.",
      icon: "truck"
    },
    {
      title: "Comprehensive Blood Bank & Component Lab",
      desc: "24/7 apheresis, leukodepleted blood components, and antibody screening accredited by state authorities.",
      icon: "droplets"
    },
    {
      title: "Green Hospital & Sustainable Campus",
      desc: "Solar-powered clean energy grid, advanced effluent treatment, and zero-paper digital EHR systems.",
      icon: "leaf"
    }
  ],

  sampleLabReports: {
    "KLE-1001": {
      patientId: "KLE-1001",
      patientName: "Ramesh M. Patil",
      age: "48 Yrs",
      gender: "Male",
      referredBy: "Dr. Vikramaditya Patil",
      sampleDate: "2026-09-27 08:30 AM",
      reportedDate: "2026-09-27 02:45 PM",
      testCategory: "Executive Lipid & Glycemic Profile",
      status: "Verified & Approved",
      summary: "Borderline elevated LDL Cholesterol. Glycemic control is satisfactory.",
      parameters: [
        { test: "Fasting Blood Sugar", value: "98", unit: "mg/dL", normal: "70 - 100", status: "normal" },
        { test: "HbA1c (Glycated Hb)", value: "5.6", unit: "%", normal: "4.0 - 5.7", status: "normal" },
        { test: "Total Cholesterol", value: "214", unit: "mg/dL", normal: "< 200", status: "borderline" },
        { test: "HDL (Good Cholesterol)", value: "48", unit: "mg/dL", normal: "> 40", status: "normal" },
        { test: "LDL (Bad Cholesterol)", value: "142", unit: "mg/dL", normal: "< 100", status: "high" },
        { test: "Triglycerides", value: "158", unit: "mg/dL", normal: "< 150", status: "borderline" },
        { test: "Serum Creatinine", value: "0.9", unit: "mg/dL", normal: "0.7 - 1.2", status: "normal" }
      ]
    },
    "KLE-1002": {
      patientId: "KLE-1002",
      patientName: "Ananya S. Sharma",
      age: "34 Yrs",
      gender: "Female",
      referredBy: "Dr. Shalini Hegde",
      sampleDate: "2026-09-26 09:15 AM",
      reportedDate: "2026-09-26 03:20 PM",
      testCategory: "Thyroid & Complete Hemogram",
      status: "Verified & Approved",
      summary: "Mild iron deficiency detected. Thyroid stimulation parameters are within normal range.",
      parameters: [
        { test: "Hemoglobin", value: "11.2", unit: "g/dL", normal: "12.0 - 15.5", status: "borderline" },
        { test: "Total RBC Count", value: "4.1", unit: "mill/cumm", normal: "3.8 - 4.8", status: "normal" },
        { test: "WBC (Total Count)", value: "6,800", unit: "/cumm", normal: "4,000 - 11,000", status: "normal" },
        { test: "Platelet Count", value: "245,000", unit: "/cumm", normal: "150,000 - 450,000", status: "normal" },
        { test: "TSH (Ultrasensitive)", value: "2.45", unit: "uIU/mL", normal: "0.35 - 4.94", status: "normal" },
        { test: "Serum Ferritin", value: "16", unit: "ng/mL", normal: "20 - 200", status: "low" },
        { test: "Vitamin D3 (25-OH)", value: "32.4", unit: "ng/mL", normal: "30.0 - 100.0", status: "normal" }
      ]
    },
    "KLE-1003": {
      patientId: "KLE-1003",
      patientName: "David Miller",
      age: "56 Yrs",
      gender: "Male",
      referredBy: "Dr. Anand Deshpande",
      sampleDate: "2026-09-25 11:00 AM",
      reportedDate: "2026-09-25 04:30 PM",
      testCategory: "Renal Function & Uric Acid",
      status: "Verified & Approved",
      summary: "Renal parameters normal. Serum Uric acid slightly higher than reference threshold.",
      parameters: [
        { test: "Blood Urea Nitrogen", value: "15.4", unit: "mg/dL", normal: "7 - 20", status: "normal" },
        { test: "Serum Creatinine", value: "1.05", unit: "mg/dL", normal: "0.7 - 1.3", status: "normal" },
        { test: "Uric Acid", value: "7.8", unit: "mg/dL", normal: "3.5 - 7.2", status: "borderline" },
        { test: "Serum Sodium (Na)", value: "141", unit: "mEq/L", normal: "136 - 145", status: "normal" },
        { test: "Serum Potassium (K)", value: "4.2", unit: "mEq/L", normal: "3.5 - 5.1", status: "normal" },
        { test: "eGFR (Estimated)", value: "88", unit: "mL/min/1.73m2", normal: "> 60", status: "normal" }
      ]
    }
  },

  testimonials: [
    {
      id: 1,
      patient: "Suresh Hegde",
      age: "62 Yrs",
      treatment: "Complex Cardiac Angioplasty",
      doctor: "Dr. Vikramaditya Patil",
      rating: 5,
      comment: "I arrived at KLE Hospital at 2 AM with severe chest pain. The emergency cardiac team performed an emergency angioplasty within 25 minutes of arrival. Today I am back to my regular morning walks. Truly world-class hospital and nursing care!",
      date: "September 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      patient: "Radhika K. Kulkarni",
      age: "58 Yrs",
      treatment: "Robotic Bilateral Knee Replacement",
      doctor: "Dr. Anand Deshpande",
      rating: 5,
      comment: "I had severe osteoarthritis and was unable to climb stairs for 4 years. Dr. Anand Deshpande performed robotic knee replacement. I stood on my feet the very next morning with minimal pain! The grey and light white hospital environment feels like a 5-star healing sanctuary.",
      date: "August 2026",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      patient: "Mohammed Irfan",
      age: "35 Yrs",
      treatment: "Emergency Trauma & Spine Recovery",
      doctor: "Dr. Meenakshi Sundaram",
      rating: 5,
      comment: "After a highway motorcycle collision, my spine was critically injured. The KLE trauma emergency staff and Dr. Meenakshi’s team did surgery that saved me from lifelong paralysis. I cannot thank the doctors, nurses, and physical therapists enough.",
      date: "July 2026",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  ],

  insurancePartners: [
    "Star Health Insurance",
    "Max Bupa / Niva Bupa",
    "HDFC ERGO Health",
    "ICICI Lombard",
    "Care Health Insurance",
    "Medi Assist TPA",
    "Paramount Health Care",
    "Raksha TPA",
    "Vipul Medcorp",
    "Heritage Health TPA",
    "Ayushman Bharat (PM-JAY)",
    "CGHS & ECHS Approved"
  ],

  faqs: [
    {
      question: "How can I book an appointment with a specialist doctor at KLE Hospital?",
      answer: "You can book directly through our website using the 'Book Appointment' button on any doctor profile, call our central appointment desk at +91 831 247 1000, or walk in directly to our outpatient registration desks between 8:00 AM and 8:00 PM."
    },
    {
      question: "Is emergency and ambulance assistance available 24/7?",
      answer: "Yes, our Level-1 Trauma Centre and Advanced Life Support (ALS) Mobile ICU ambulances operate round-the-clock, 365 days a year. Call our direct Emergency Hotline at +91 831 247 3777 or +91 831 247 9999 for instant dispatch."
    },
    {
      question: "How does cashless insurance hospitalization work at KLE Hospital?",
      answer: "Our dedicated 24/7 TPA & Insurance Desk is located on the ground floor. Simply present your health insurance card, government ID, and policy number. Our team coordinates pre-authorization with over 40+ insurance companies and TPAs for a hassle-free cashless claim."
    },
    {
      question: "Can I view and download my laboratory reports online?",
      answer: "Yes! Use our 'Patient Portal / Lab Reports' feature on this website. Enter your unique Patient ID (e.g. KLE-1001) or registered mobile number to immediately view, print, or download your verified diagnostic reports."
    },
    {
      question: "What are the visiting hours for inpatients and intensive care units?",
      answer: "General Wards: 04:30 PM - 07:00 PM daily. ICUs & Critical Care Units: 11:00 AM - 12:00 PM & 05:00 PM - 06:00 PM (restricted to 1 attendee at a time with sanitization protocols)."
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.HOSPITAL_DATA = HOSPITAL_DATA;
}
