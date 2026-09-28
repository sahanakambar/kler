# KLE Hospital - Premium Healthcare Web Platform

A modern, responsive, and feature-complete healthcare web application built for **KLE Hospital** (Multi-Specialty & Research Institute) using an elegant **Grey with Light-White** aesthetic, glassmorphism, and clinical healthcare design standards.

---

## 🏥 Brand Identity & Color Theme
- **Brand**: KLE Hospital (Multi-Specialty & Research Institute)
- **Tagline**: *Excellence in Healthcare, Compassion in Healing*
- **Accreditations**: NABH Accredited, JCI Certified, NABL Laboratory, ISO 9001:2015
- **Color Palette**:
  - **Light White / Porcelain Base**: `#fbfcfd`, `#f8fafc`, `#ffffff`
  - **Slate & Charcoal Greys**: `#0f172a`, `#1e293b`, `#334155`, `#475569`, `#64748b`
  - **Silver / Platinum Borders & Highlights**: `#cbd5e1`, `#e2e8f0`, `#f1f5f9`
  - **High-contrast Medical Accents**: Subtle cool silver, subtle cyan highlights, and high-visibility emergency badge indicators.

---

## 🚀 Key Clinical & Patient Features

1. **24/7 Emergency Header Bar**:
   - Zero-delay emergency telephone hotline (`+91 831 247 3777`)
   - Direct Ambulance Dispatcher and Blood Bank hotlines
   - Quick jump to online reports and trauma SOS

2. **Interactive Hero Section with Patient Console**:
   - Hero headline, clinical achievements, and live metrics (1,250+ Beds, 350+ Super Specialists, 45+ Specialties, 99.4% Recovery Rating)
   - **Hero Quick-Action Console**:
     - *Tab 1*: Find Doctor by specialty and name
     - *Tab 2*: Instant Lab Report token lookup
     - *Tab 3*: Rapid Ambulance GPS request

3. **Centers of Medical Excellence (Departments Showcase)**:
   - Cardiology & Cardiac Surgery (Bi-plane Cath Labs, TAVI, Minimally invasive CABG)
   - Neurology & Neurosurgery (Brain & Spine Institute, 24/7 Stroke Unit)
   - Comprehensive Oncology (Medical, Surgical & Radiation, TrueBeam)
   - Orthopedics & Joint Replacement (Mako Robotic Surgery, Sports Medicine)
   - Pediatrics & Neonatology (Level-III NICU, PICU)
   - Gastroenterology & Hepatology (ERCP, Endoscopic Ultrasound)
   - Nephrology & Kidney Care (Dialysis Unit, Renal Transplants)
   - Level-1 Trauma & Emergency Medicine

4. **Interactive Specialist Doctor Finder**:
   - Filter by clinical specialty buttons with responsive smooth scrolling
   - Real-time search query matching doctor names, qualifications, and conditions
   - Doctor cards with qualifications, experience, OPD timings, ratings, consultation fees
   - Detailed **Doctor Profile Modal** with full bio, credentials, and languages spoken

5. **3-Step Interactive Appointment Booking Wizard Modal**:
   - **Step 1**: Department & Doctor selector + Consultation Mode (Hospital OPD Visit vs. Telehealth HD Video)
   - **Step 2**: Calendar date picker + Interactive time slots (Morning, Afternoon, Evening)
   - **Step 3**: Patient name, age, gender, contact number, and clinical symptoms
   - **Step 4**: Generated unique booking token slip (`KLE-2026-XXXX`) with SMS confirmation simulation and 1-click **Print Token Slip**

6. **Patient Diagnostic Lab Reports Portal**:
   - Search by Patient ID (`KLE-1001`, `KLE-1002`, `KLE-1003`) or mobile number
   - Verified clinical laboratory report layout complete with NABL accreditation badge, observed values, standard reference intervals, status badges (Normal, Elevated, Borderline), pathologist clinical interpretation, and **Print/Save PDF** action

7. **Preventive Health Checkup Packages**:
   - KLE Essential Wellness (38 Parameters)
   - KLE Executive Heart & Vascular Care (62 Parameters)
   - KLE Senior Citizen Comprehensive Care (74 Parameters)
   - KLE Women's Holistic Health & Harmony (52 Parameters)
   - Direct 1-click booking integration

8. **Cutting-Edge Medical Infrastructure**:
   - Da Vinci Xi 4th Gen Robotic Surgery
   - 3.0 Tesla Digital MRI & 128-Slice Dual Source CT
   - 12 Modular Laminar Airflow Cleanroom OTs
   - Level-1 Trauma & Mobile ICU Ambulance Fleet
   - 24/7 Apheresis & Blood Component Bank
   - Green Hospital campus initiative

9. **Interactive Health Assessment Screener**:
   - Built-in Body Mass Index (BMI) calculator
   - Instant clinical status categorization, personalized health advice, and specialist department recommendation

10. **24/7 Rapid Ambulance Request Simulator**:
    - Location and emergency category input
    - Live dispatch animation and telemetry status (Pilot, Paramedic, ETA: 6-8 mins, direct paramedic call button)

11. **Cashless Insurance & TPA Network**:
    - Empanelled with 12+ major health insurance partners (Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, Care, Ayushman Bharat PM-JAY, CGHS)
    - 4-step seamless cashless hospitalization workflow guide

12. **Patient Stories & Reviews**:
    - Verified recovery stories from heart surgery, robotic joint replacement, and acute trauma

13. **Frequently Asked Questions (FAQ)**:
    - Interactive accordion covering OPD appointments, visiting hours, insurance claims, and emergency protocols

14. **Campus Location & Contact Desk**:
    - Address on NH-4 Belagavi, Karnataka
    - Working interactive inquiry form with instant ticket receipt simulation

15. **Sticky Floating Emergency Hub**:
    - Quick-access floating SOS dialer and appointment launcher from any scroll position

---

## 📁 File Structure
```
APPLICATION/
│
├── index.html          # Semantic HTML5 architecture & layout
├── css/
│   └── styles.css      # Grey & light white design system, glassmorphism, animations, print layout
├── js/
│   ├── data.js         # Comprehensive hospital data model (doctors, departments, packages, reports)
│   └── app.js          # Interactive features, wizard, search, calculators, simulators, and modals
└── README.md           # Documentation & feature overview
```

---

## 🌐 How to Run Locally

You can open `index.html` directly in any web browser, or serve it using Python's built-in HTTP server:

```powershell
# In c:\Users\student\Desktop\APPLICATION
python -m http.server 8080
```
Then visit: `http://localhost:8080` in your web browser.
