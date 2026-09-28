/**
 * KLE Hospital - Main Application Logic & Interactive Features
 * Provides: Doctor Finder, Appointment Wizard, Lab Report Portal,
 * Health Risk Calculator, Ambulance Dispatch Simulator, and Modal Managers.
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeroTabs();
  renderDepartments();
  renderDoctors();
  renderPackages();
  renderTestimonials();
  initAppointmentWizard();
  initLabReportsPortal();
  initHealthCalculator();
  initAmbulanceSimulator();
  initContactForm();
  initMobileNav();
  initQuickStats();
  featherOrLucideInit();
});

/* Helper: Re-trigger icon rendering if Lucide or Feather is present */
function featherOrLucideInit() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   1. Hero Interactive Console Tabs
   ========================================================================== */
function initHeroTabs() {
  const tabs = document.querySelectorAll(".hero-tab-btn");
  const panels = document.querySelectorAll(".hero-tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanel = tab.getAttribute("data-tab");

      tabs.forEach((t) => t.classList.remove("active", "text-slate-900", "border-b-2", "border-slate-900"));
      tabs.forEach((t) => t.classList.add("text-slate-500"));
      tab.classList.add("active", "text-slate-900", "border-b-2", "border-slate-900");
      tab.classList.remove("text-slate-500");

      panels.forEach((p) => {
        if (p.id === targetPanel) {
          p.classList.remove("hidden");
          p.classList.add("block");
        } else {
          p.classList.add("hidden");
          p.classList.remove("block");
        }
      });
      featherOrLucideInit();
    });
  });
}

/* ==========================================================================
   2. Departments Showcase
   ========================================================================== */
function renderDepartments() {
  const container = document.getElementById("departmentsGrid");
  if (!container || !window.HOSPITAL_DATA) return;

  const depts = window.HOSPITAL_DATA.departments;
  container.innerHTML = depts.map(dept => `
    <div class="glass-card rounded-2xl p-6 hover-lift border-highlight-on-hover flex flex-col justify-between group transition-all duration-300">
      <div>
        <div class="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-5 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300 shadow-sm">
          <i data-lucide="${dept.icon || 'activity'}" class="w-7 h-7"></i>
        </div>
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xl font-bold text-slate-900 font-heading group-hover:text-slate-700 transition-colors">${dept.name}</h3>
        </div>
        <p class="text-sm text-slate-600 mb-4 leading-relaxed">${dept.shortDesc}</p>
        
        <div class="mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Key Clinical Specialties</div>
          <ul class="text-xs text-slate-700 space-y-1.5">
            ${dept.keyProcedures.slice(0, 3).map(proc => `
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>${proc}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="block text-[11px] uppercase tracking-wide text-slate-400">Director / Lead</span>
          <span class="text-xs font-semibold text-slate-800">${dept.leadDoctor}</span>
        </div>
        <button onclick="filterAndScrollToDoctors('${dept.id}')" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
          <span>Consult</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');

  featherOrLucideInit();
}

function filterAndScrollToDoctors(deptId) {
  const doctorSection = document.getElementById("doctors");
  if (doctorSection) {
    doctorSection.scrollIntoView({ behavior: "smooth" });
    const filterBtn = document.querySelector(`.doc-filter-btn[data-dept="${deptId}"]`);
    if (filterBtn) {
      filterBtn.click();
    }
  }
}

/* ==========================================================================
   3. Doctor Finder & Directory
   ========================================================================== */
let activeDoctorFilter = "all";
let doctorSearchTerm = "";

function renderDoctors() {
  const container = document.getElementById("doctorsGrid");
  const countBadge = document.getElementById("doctorCountBadge");
  if (!container || !window.HOSPITAL_DATA) return;

  const doctors = window.HOSPITAL_DATA.doctors;
  const filtered = doctors.filter((doc) => {
    const matchesDept = activeDoctorFilter === "all" || doc.departmentId === activeDoctorFilter;
    const matchesSearch = 
      doc.name.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
      doc.degrees.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
      doc.bio.toLowerCase().includes(doctorSearchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Specialists Available`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
        <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h4 class="text-lg font-bold text-slate-800 mb-1">No Specialists Found</h4>
        <p class="text-sm text-slate-500 mb-4">Try clearing your search query or selecting a different clinical specialty.</p>
        <button onclick="resetDoctorFilters()" class="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition">
          Reset All Filters
        </button>
      </div>
    `;
    featherOrLucideInit();
    return;
  }

  container.innerHTML = filtered.map(doc => `
    <div class="glass-card rounded-2xl overflow-hidden hover-lift border-highlight-on-hover flex flex-col justify-between transition-all duration-300">
      <div>
        <div class="relative h-64 bg-slate-200 overflow-hidden">
          <img src="${doc.image}" alt="${doc.name}" class="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          
          <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-800 border border-slate-200/60 shadow-sm flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>${doc.departmentName}</span>
          </div>

          <div class="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md text-[11px] font-semibold text-white flex items-center gap-1 shadow-sm">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
            <span>${doc.rating}</span>
            <span class="text-slate-400 text-[10px]">(${doc.reviewsCount})</span>
          </div>

          <div class="absolute bottom-3 left-3 right-3 text-white">
            <h3 class="text-lg font-bold font-heading leading-tight">${doc.name}</h3>
            <p class="text-xs text-slate-300 font-medium">${doc.designation}</p>
          </div>
        </div>

        <div class="p-5">
          <div class="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <i data-lucide="graduation-cap" class="w-4 h-4 text-slate-400 shrink-0"></i>
            <span class="truncate">${doc.degrees}</span>
          </div>

          <div class="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl mb-4 text-xs border border-slate-100">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">Experience</span>
              <span class="font-bold text-slate-800">${doc.experience}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">OPD Fee</span>
              <span class="font-bold text-slate-800">${doc.fee}</span>
            </div>
          </div>

          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">${doc.bio}</p>

          <div class="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400"></i>
            <span>${doc.opdTiming}</span>
          </div>
        </div>
      </div>

      <div class="px-5 pb-5 pt-0 flex gap-2">
        <button onclick="openDoctorModal('${doc.id}')" class="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition flex items-center justify-center gap-1.5">
          <i data-lucide="user" class="w-3.5 h-3.5"></i>
          <span>View Profile</span>
        </button>
        <button onclick="startBookingWithDoctor('${doc.id}')" class="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition flex items-center justify-center gap-1.5">
          <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
          <span>Book Slot</span>
        </button>
      </div>
    </div>
  `).join('');

  featherOrLucideInit();
  initFilterButtons();
}

function initFilterButtons() {
  const filterButtons = document.querySelectorAll(".doc-filter-btn");
  filterButtons.forEach((btn) => {
    btn.onclick = () => {
      filterButtons.forEach((b) => {
        b.classList.remove("bg-slate-900", "text-white");
        b.classList.add("bg-white", "text-slate-700", "border-slate-200");
      });
      btn.classList.remove("bg-white", "text-slate-700", "border-slate-200");
      btn.classList.add("bg-slate-900", "text-white");

      activeDoctorFilter = btn.getAttribute("data-dept");
      renderDoctors();
    };
  });

  const searchInput = document.getElementById("doctorSearchInput");
  if (searchInput) {
    searchInput.oninput = (e) => {
      doctorSearchTerm = e.target.value;
      renderDoctors();
    };
  }
}

function resetDoctorFilters() {
  activeDoctorFilter = "all";
  doctorSearchTerm = "";
  const searchInput = document.getElementById("doctorSearchInput");
  if (searchInput) searchInput.value = "";
  const allBtn = document.querySelector('.doc-filter-btn[data-dept="all"]');
  if (allBtn) allBtn.click();
  renderDoctors();
}

function openDoctorModal(docId) {
  const doc = window.HOSPITAL_DATA.doctors.find((d) => d.id === docId);
  if (!doc) return;

  const modal = document.getElementById("doctorProfileModal");
  const modalContent = document.getElementById("doctorModalBody");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <div class="md:w-1/3">
        <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 mb-4">
          <img src="${doc.image}" alt="${doc.name}" class="w-full h-72 object-cover object-top" />
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
          <div class="flex justify-between">
            <span class="text-slate-500">Department:</span>
            <span class="font-semibold text-slate-800">${doc.departmentName}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Experience:</span>
            <span class="font-semibold text-slate-800">${doc.experience}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Consultation Fee:</span>
            <span class="font-bold text-slate-900">${doc.fee}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Rating:</span>
            <span class="font-bold text-amber-600">★ ${doc.rating} (${doc.reviewsCount} reviews)</span>
          </div>
        </div>
      </div>

      <div class="md:w-2/3 flex flex-col justify-between">
        <div>
          <div class="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full mb-2">
            Verified Specialist
          </div>
          <h3 class="text-2xl font-bold text-slate-900 font-heading mb-1">${doc.name}</h3>
          <p class="text-sm font-medium text-slate-600 mb-3">${doc.designation}</p>
          <p class="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">${doc.degrees}</p>

          <h4 class="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">Professional Background & Biography</h4>
          <p class="text-sm text-slate-700 leading-relaxed mb-5">${doc.bio}</p>

          <h4 class="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">OPD Schedule & Languages</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">Hospital OPD Clinic</span>
              <span class="font-semibold text-slate-800">${doc.opdTiming}</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">Languages Spoken</span>
              <span class="font-semibold text-slate-800">${doc.languages.join(", ")}</span>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex gap-3">
          <button onclick="startBookingWithDoctor('${doc.id}'); closeDoctorModal();" class="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2">
            <i data-lucide="calendar-check" class="w-4 h-4"></i>
            <span>Book Consultation Now</span>
          </button>
          <button onclick="closeDoctorModal()" class="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-medium transition">
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  featherOrLucideInit();
}

function closeDoctorModal() {
  const modal = document.getElementById("doctorProfileModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

/* ==========================================================================
   4. Health Checkup Packages
   ========================================================================== */
function renderPackages() {
  const container = document.getElementById("packagesGrid");
  if (!container || !window.HOSPITAL_DATA) return;

  const packages = window.HOSPITAL_DATA.healthPackages;
  container.innerHTML = packages.map((pkg, idx) => `
    <div class="glass-card rounded-2xl p-6 hover-lift border-highlight-on-hover flex flex-col justify-between transition-all duration-300 relative ${idx === 1 ? 'ring-2 ring-slate-900' : ''}">
      ${pkg.tag ? `
        <div class="absolute -top-3 right-6 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          ${pkg.tag}
        </div>
      ` : ''}

      <div>
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">${pkg.idealFor}</div>
        <h3 class="text-xl font-bold text-slate-900 font-heading mb-2">${pkg.name}</h3>
        
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-3xl font-extrabold text-slate-900 font-heading">${pkg.price}</span>
          <span class="text-sm text-slate-400 line-through">${pkg.originalPrice}</span>
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-auto">${pkg.parameterCount}</span>
        </div>

        <div class="border-t border-slate-100 pt-4 mb-6">
          <div class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Package Inclusions:</div>
          <ul class="text-xs text-slate-600 space-y-2">
            ${pkg.tests.map(test => `
              <li class="flex items-start gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5"></i>
                <span class="leading-tight">${test}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100">
        <button onclick="bookHealthPackage('${pkg.name}')" class="w-full py-2.5 rounded-xl ${idx === 1 ? 'bg-slate-900 text-white hover:bg-slate-800' : 'border border-slate-300 text-slate-800 hover:bg-slate-100'} text-xs font-semibold transition flex items-center justify-center gap-2">
          <span>Book This Package</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');

  featherOrLucideInit();
}

function bookHealthPackage(pkgName) {
  openAppointmentModal();
  const noteField = document.getElementById("patientNotes");
  if (noteField) {
    noteField.value = `Interested in Health Package: ${pkgName}`;
  }
  showToast(`Selected Package: ${pkgName}. Please complete your details.`);
}

/* ==========================================================================
   5. Interactive Appointment Booking Wizard
   ========================================================================== */
let bookingState = {
  step: 1,
  department: "",
  doctor: "",
  type: "in-person",
  date: "",
  time: "",
  name: "",
  phone: "",
  age: "",
  gender: "male",
  notes: "",
  bookingId: ""
};

function initAppointmentWizard() {
  const deptSelect = document.getElementById("bookingDeptSelect");
  const doctorSelect = document.getElementById("bookingDoctorSelect");

  if (deptSelect && window.HOSPITAL_DATA) {
    deptSelect.innerHTML = `<option value="">-- Choose Department / Specialty --</option>` +
      window.HOSPITAL_DATA.departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');

    deptSelect.addEventListener("change", (e) => {
      populateDoctorsForDept(e.target.value);
    });
  }

  // Time slot selection pills
  const slots = document.querySelectorAll(".time-slot-btn");
  slots.forEach((btn) => {
    btn.addEventListener("click", () => {
      slots.forEach((s) => s.classList.remove("selected", "bg-slate-900", "text-white"));
      btn.classList.add("selected", "bg-slate-900", "text-white");
      bookingState.time = btn.getAttribute("data-time") || btn.textContent.trim();
    });
  });

  // Default date setup (tomorrow)
  const dateInput = document.getElementById("bookingDateInput");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    bookingState.date = dateInput.value;
    
    dateInput.addEventListener("change", (e) => {
      bookingState.date = e.target.value;
    });
  }
}

function populateDoctorsForDept(deptId) {
  const doctorSelect = document.getElementById("bookingDoctorSelect");
  if (!doctorSelect || !window.HOSPITAL_DATA) return;

  const docs = deptId
    ? window.HOSPITAL_DATA.doctors.filter(d => d.departmentId === deptId)
    : window.HOSPITAL_DATA.doctors;

  doctorSelect.innerHTML = `<option value="">-- Select Specialist (Optional / Any Available) --</option>` +
    docs.map(doc => `<option value="${doc.id}">${doc.name} (${doc.departmentName} - ${doc.experience})</option>`).join('');
}

function openAppointmentModal() {
  const modal = document.getElementById("appointmentModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    goToBookingStep(1);
    featherOrLucideInit();
  }
}

function closeAppointmentModal() {
  const modal = document.getElementById("appointmentModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function startBookingWithDoctor(docId) {
  const doc = window.HOSPITAL_DATA.doctors.find(d => d.id === docId);
  if (!doc) return;

  openAppointmentModal();
  const deptSelect = document.getElementById("bookingDeptSelect");
  if (deptSelect) {
    deptSelect.value = doc.departmentId;
    populateDoctorsForDept(doc.departmentId);
  }
  const docSelect = document.getElementById("bookingDoctorSelect");
  if (docSelect) {
    docSelect.value = doc.id;
  }
  bookingState.department = doc.departmentId;
  bookingState.doctor = doc.id;
  showToast(`Booking initiated with ${doc.name}`);
}

function goToBookingStep(step) {
  bookingState.step = step;

  // Update step indicators
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`stepIndicator${i}`);
    const line = document.getElementById(`stepLine${i}`);
    if (indicator) {
      if (i === step) {
        indicator.className = "w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center ring-4 ring-slate-200";
      } else if (i < step) {
        indicator.className = "w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center";
      } else {
        indicator.className = "w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-xs border border-slate-300 flex items-center justify-center";
      }
    }
    if (line) {
      line.className = i < step ? "h-0.5 w-12 bg-slate-700" : "h-0.5 w-12 bg-slate-200";
    }
  }

  // Show/Hide step panes
  document.getElementById("stepPane1")?.classList.toggle("hidden", step !== 1);
  document.getElementById("stepPane2")?.classList.toggle("hidden", step !== 2);
  document.getElementById("stepPane3")?.classList.toggle("hidden", step !== 3);
  document.getElementById("stepPaneSuccess")?.classList.toggle("hidden", step !== 4);
}

function nextBookingStep() {
  if (bookingState.step === 1) {
    const dept = document.getElementById("bookingDeptSelect").value;
    if (!dept) {
      showToast("Please choose a medical department to continue.", "warning");
      return;
    }
    bookingState.department = dept;
    bookingState.doctor = document.getElementById("bookingDoctorSelect").value;
    bookingState.type = document.querySelector('input[name="consultType"]:checked')?.value || "in-person";
    goToBookingStep(2);
  } else if (bookingState.step === 2) {
    const date = document.getElementById("bookingDateInput").value;
    if (!date) {
      showToast("Please select a date for your visit.", "warning");
      return;
    }
    if (!bookingState.time) {
      // Pick first slot as default if none clicked
      const activeSlot = document.querySelector(".time-slot-btn.selected");
      bookingState.time = activeSlot ? activeSlot.textContent.trim() : "10:00 AM";
    }
    bookingState.date = date;
    goToBookingStep(3);
  } else if (bookingState.step === 3) {
    const name = document.getElementById("patientNameInput").value.trim();
    const phone = document.getElementById("patientPhoneInput").value.trim();
    const age = document.getElementById("patientAgeInput").value.trim();

    if (!name || !phone) {
      showToast("Please provide the patient name and contact phone number.", "warning");
      return;
    }

    bookingState.name = name;
    bookingState.phone = phone;
    bookingState.age = age || "30";
    bookingState.gender = document.getElementById("patientGenderSelect").value;
    bookingState.notes = document.getElementById("patientNotes").value.trim();

    // Generate Confirmation
    generateBookingConfirmation();
  }
}

function generateBookingConfirmation() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  bookingState.bookingId = `KLE-2026-${randomNum}`;

  let docObj = window.HOSPITAL_DATA.doctors.find(d => d.id === bookingState.doctor);
  let deptObj = window.HOSPITAL_DATA.departments.find(d => d.id === bookingState.department);
  const docName = docObj ? docObj.name : "Duty Super-Specialist";
  const deptName = deptObj ? deptObj.name : "General Outpatient";

  const successCard = document.getElementById("bookingSuccessDetails");
  if (successCard) {
    successCard.innerHTML = `
      <div class="bg-white rounded-xl border-2 border-dashed border-slate-300 p-5 text-left mb-5">
        <div class="flex justify-between items-center pb-3 border-b border-slate-100 mb-3">
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400">Appointment Token</span>
            <div class="text-xl font-extrabold text-slate-900 font-mono">${bookingState.bookingId}</div>
          </div>
          <div class="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
            Confirmed
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs mb-3">
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Patient Name</span>
            <span class="font-bold text-slate-800">${bookingState.name} (${bookingState.age}Y / ${bookingState.gender})</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Contact</span>
            <span class="font-bold text-slate-800">${bookingState.phone}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Specialist Doctor</span>
            <span class="font-bold text-slate-800">${docName}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Department</span>
            <span class="font-bold text-slate-800">${deptName}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Date & Time</span>
            <span class="font-bold text-slate-800">${bookingState.date} at ${bookingState.time}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Mode</span>
            <span class="font-bold text-slate-800 uppercase">${bookingState.type === 'in-person' ? 'Hospital OPD Visit' : 'Telehealth HD Video'}</span>
          </div>
        </div>

        <div class="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <i data-lucide="info" class="w-3.5 h-3.5 inline text-slate-400 mr-1"></i>
          An SMS confirmation has been simulated to ${bookingState.phone}. Please arrive 15 minutes prior to your designated slot at the OPD Registration Desk (Ground Floor).
        </div>
      </div>
    `;
  }

  goToBookingStep(4);
  featherOrLucideInit();
  showToast(`Appointment booked successfully! ID: ${bookingState.bookingId}`, "success");
}

function printAppointmentSlip() {
  window.print();
}

/* ==========================================================================
   6. Patient Portal: Interactive Lab Reports Lookup
   ========================================================================== */
function initLabReportsPortal() {
  const searchBtn = document.getElementById("lookupReportBtn");
  const reportInput = document.getElementById("patientIdReportInput");

  if (searchBtn && reportInput) {
    searchBtn.addEventListener("click", () => {
      lookupReport(reportInput.value.trim());
    });

    reportInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        lookupReport(reportInput.value.trim());
      }
    });
  }

  // Quick Demo Chips
  const chips = document.querySelectorAll(".sample-report-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const id = chip.getAttribute("data-id");
      if (reportInput) reportInput.value = id;
      lookupReport(id);
    });
  });
}

function openLabPortalModal(prefillId = "") {
  const modal = document.getElementById("labReportsModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    const idToUse = prefillId || document.getElementById("modalPatientIdInput")?.value || "KLE-1001";
    const input = document.getElementById("modalPatientIdInput");
    if (input) input.value = idToUse;
    const pageInput = document.getElementById("patientIdReportInput");
    if (pageInput) pageInput.value = idToUse;
    lookupReport(idToUse);
    featherOrLucideInit();
  }
}

function closeLabPortalModal() {
  const modal = document.getElementById("labReportsModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function lookupReport(query) {
  const resultContainer = document.getElementById("labReportResultContainer");
  const modalContainer = document.getElementById("modalReportContainer");
  if (!resultContainer && !modalContainer) return;

  const normalized = (query || "").trim().toUpperCase();
  let report = window.HOSPITAL_DATA.sampleLabReports[normalized];

  // If not in sample presets, generate dynamic realistic report for the entered phone/ID
  if (!report && normalized.length >= 3) {
    report = {
      patientId: normalized.startsWith("KLE") ? normalized : `KLE-${normalized.slice(-4)}`,
      patientName: "Guest Registered Patient",
      age: "42 Yrs",
      gender: "Male / Female",
      referredBy: "Dr. Vikramaditya Patil",
      sampleDate: "2026-09-27 09:00 AM",
      reportedDate: "2026-09-27 03:30 PM",
      testCategory: "Routine Comprehensive Clinical Diagnostic Profile",
      status: "Verified & Approved",
      summary: "All tested bio-markers indicate stable health metrics within standard clinical limits.",
      parameters: [
        { test: "Hemoglobin", value: "14.2", unit: "g/dL", normal: "13.0 - 17.0", status: "normal" },
        { test: "Fasting Blood Sugar", value: "92", unit: "mg/dL", normal: "70 - 100", status: "normal" },
        { test: "Serum Creatinine", value: "0.95", unit: "mg/dL", normal: "0.7 - 1.2", status: "normal" },
        { test: "Total Cholesterol", value: "178", unit: "mg/dL", normal: "< 200", status: "normal" },
        { test: "Uric Acid", value: "5.4", unit: "mg/dL", normal: "3.5 - 7.2", status: "normal" }
      ]
    };
  }

  const renderNotFound = (q) => `
    <div class="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
      <i data-lucide="file-question" class="w-10 h-10 text-slate-400 mx-auto mb-2"></i>
      <p class="text-sm font-bold text-slate-700">No report record found for "${q}"</p>
      <p class="text-xs text-slate-500 mt-1">Please enter a valid Patient ID like <span class="font-mono font-semibold text-slate-800">KLE-1001</span> or use the quick demo chips.</p>
    </div>
  `;

  if (!report) {
    const errorHtml = renderNotFound(query);
    if (resultContainer) resultContainer.innerHTML = errorHtml;
    if (modalContainer) modalContainer.innerHTML = errorHtml;
    featherOrLucideInit();
    return;
  }

  const reportHtml = `
    <div id="printableReportArea" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-slate-900">
      <!-- Report Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b-2 border-slate-900 mb-5 gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base">K</span>
            <span class="text-xl font-bold font-heading text-slate-900">KLE Hospital</span>
          </div>
          <p class="text-[11px] text-slate-500">Department of Laboratory Medicine & Molecular Diagnostics</p>
          <p class="text-[10px] text-slate-400">NABL Accredited Lab #M-4821 | ISO 15189:2022 Certified</p>
        </div>
        <div class="text-right">
          <div class="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold mb-1">
            ${report.status}
          </div>
          <div class="text-xs text-slate-500 font-mono">PID: <span class="font-bold text-slate-900">${report.patientId}</span></div>
        </div>
      </div>

      <!-- Patient Bio Data -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs mb-5">
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-semibold">Patient Name</span>
          <span class="font-bold text-slate-900">${report.patientName}</span>
        </div>
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-semibold">Age / Gender</span>
          <span class="font-semibold text-slate-800">${report.age} / ${report.gender}</span>
        </div>
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-semibold">Ref. Doctor</span>
          <span class="font-semibold text-slate-800">${report.referredBy}</span>
        </div>
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-semibold">Reported At</span>
          <span class="font-semibold text-slate-800">${report.reportedDate}</span>
        </div>
      </div>

      <div class="mb-3 flex justify-between items-center">
        <h4 class="text-sm font-bold text-slate-900 uppercase tracking-wide">${report.testCategory}</h4>
        <span class="text-xs text-slate-400">Standard SI Reference Units</span>
      </div>

      <!-- Test Parameters Table -->
      <div class="overflow-x-auto mb-6">
        <table class="w-full text-xs text-left">
          <thead class="bg-slate-100 text-slate-700 font-semibold border-y border-slate-200">
            <tr>
              <th class="py-2.5 px-3">Test Investigation</th>
              <th class="py-2.5 px-3">Observed Value</th>
              <th class="py-2.5 px-3">Unit</th>
              <th class="py-2.5 px-3">Biological Reference Interval</th>
              <th class="py-2.5 px-3 text-right">Status Flag</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${report.parameters.map(param => `
              <tr class="hover:bg-slate-50/70 transition">
                <td class="py-2 px-3 font-medium text-slate-800">${param.test}</td>
                <td class="py-2 px-3 font-bold ${param.status === 'high' ? 'text-rose-600' : param.status === 'borderline' ? 'text-amber-600' : 'text-slate-900'}">${param.value}</td>
                <td class="py-2 px-3 text-slate-500">${param.unit}</td>
                <td class="py-2 px-3 text-slate-600 font-mono">${param.normal}</td>
                <td class="py-2 px-3 text-right">
                  ${param.status === 'high' ? `
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">ELEVATED</span>
                  ` : param.status === 'borderline' ? `
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">BORDERLINE</span>
                  ` : param.status === 'low' ? `
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">LOW</span>
                  ` : `
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">NORMAL</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Clinical Interpretation -->
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs mb-6">
        <span class="font-bold text-slate-900 block mb-1">Pathologist Clinical Interpretation:</span>
        <p class="text-slate-700 leading-relaxed">${report.summary}</p>
      </div>

      <!-- Signatures Footer -->
      <div class="flex justify-between items-end pt-4 border-t border-slate-200 text-xs text-slate-500">
        <div>
          <div class="font-bold text-slate-800">Medical Technologist</div>
          <div>Verified via LIMS System</div>
        </div>
        <div class="text-right">
          <div class="font-bold text-slate-900 font-mono">Dr. Arvind K. Rao, MD</div>
          <div>Consultant Biochemist & HOD</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-3 no-print">
        <button onclick="window.print()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i>
          <span>Print / Save PDF</span>
        </button>
      </div>
    </div>
  `;

  if (resultContainer) resultContainer.innerHTML = reportHtml;
  if (modalContainer) modalContainer.innerHTML = reportHtml;

  featherOrLucideInit();
  showToast(`Diagnostic record loaded for ${report.patientName}`);
}

/* ==========================================================================
   7. Interactive Health Tools: BMI & Cardiovascular Quick Calculator
   ========================================================================== */
function initHealthCalculator() {
  const calcBtn = document.getElementById("calculateBmiBtn");
  if (!calcBtn) return;

  calcBtn.addEventListener("click", () => {
    const heightCm = parseFloat(document.getElementById("calcHeight")?.value);
    const weightKg = parseFloat(document.getElementById("calcWeight")?.value);
    const age = parseInt(document.getElementById("calcAge")?.value) || 30;

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      showToast("Please enter valid height and weight values.", "warning");
      return;
    }

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    let category = "";
    let colorClass = "";
    let advice = "";
    let recommendation = "";

    if (bmi < 18.5) {
      category = "Underweight";
      colorClass = "text-blue-600 bg-blue-50 border-blue-200";
      advice = "Your BMI suggests you may be under target body weight. Nutrient absorption and balanced dietary calorie intake are recommended.";
      recommendation = "Clinical Nutritionist & General Physician";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Healthy & Optimal Range";
      colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
      advice = "Congratulations! Your BMI is within the ideal clinical reference threshold. Maintain your active lifestyle and balanced diet.";
      recommendation = "Annual Preventive Health Checkup";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
      colorClass = "text-amber-700 bg-amber-50 border-amber-200";
      advice = "Your BMI is slightly elevated. Adopting regular cardiovascular exercise and lipid profile monitoring can prevent metabolic complications.";
      recommendation = "Preventive Cardiology & Lifestyle Medicine";
    } else {
      category = "Obesity Class";
      colorClass = "text-rose-700 bg-rose-50 border-rose-200";
      advice = "Your BMI indicates increased risk for hypertension, type-2 diabetes, and cardiovascular strain. Comprehensive clinical evaluation advised.";
      recommendation = "Bariatric & Metabolic Health Clinic";
    }

    const resultCard = document.getElementById("bmiResultCard");
    if (resultCard) {
      resultCard.classList.remove("hidden");
      resultCard.innerHTML = `
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div>
              <span class="text-[11px] uppercase font-bold text-slate-400">Calculated BMI Score</span>
              <div class="text-3xl font-extrabold text-slate-900 font-heading">${bmi} <span class="text-sm font-normal text-slate-500">kg/m²</span></div>
            </div>
            <div class="px-3 py-1.5 rounded-full text-xs font-bold border ${colorClass}">
              ${category}
            </div>
          </div>

          <p class="text-xs text-slate-600 mb-4 leading-relaxed">${advice}</p>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">Recommended Department</span>
              <span class="font-bold text-slate-800">${recommendation}</span>
            </div>
            <button onclick="openAppointmentModal()" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition">
              Consult Now
            </button>
          </div>
        </div>
      `;
    }
  });
}

/* ==========================================================================
   8. 24/7 Rapid Ambulance Request Simulator
   ========================================================================== */
function initAmbulanceSimulator() {
  const requestBtn = document.getElementById("requestAmbulanceBtn");
  if (!requestBtn) return;

  requestBtn.addEventListener("click", () => {
    const locationInput = document.getElementById("ambulanceLocationInput")?.value.trim();
    const emergencyType = document.getElementById("ambulanceTypeSelect")?.value || "General Emergency";

    if (!locationInput) {
      showToast("Please enter your current location or landmark for dispatch.", "warning");
      return;
    }

    const statusBox = document.getElementById("ambulanceStatusContainer");
    if (!statusBox) return;

    statusBox.classList.remove("hidden");
    statusBox.innerHTML = `
      <div class="p-4 rounded-xl bg-slate-900 text-white text-xs border border-slate-800 shadow-lg">
        <div class="flex items-center gap-2 mb-2 text-rose-400 font-bold">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500 pulse-badge"></span>
          <span>DISPATCH PROTOCOL INITIATED</span>
        </div>
        <p class="text-slate-300 mb-3">Triaging for <strong>${emergencyType}</strong> at <strong>${locationInput}</strong>...</p>
        <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
          <div class="bg-rose-500 h-full w-2/3 animate-pulse"></div>
        </div>
        <div class="text-[11px] text-slate-400">Locating closest Mobile ICU Unit via GPS Telemetry...</div>
      </div>
    `;

    setTimeout(() => {
      statusBox.innerHTML = `
        <div class="p-5 rounded-2xl bg-white border-2 border-emerald-500 shadow-md text-xs text-slate-800">
          <div class="flex justify-between items-start mb-3">
            <div>
              <span class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase mb-1">
                Ambulance En Route
              </span>
              <h4 class="text-base font-bold text-slate-900 font-heading">Unit ALS-08 Dispatched</h4>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-slate-400 block uppercase font-bold">Est. Arrival</span>
              <span class="text-lg font-extrabold text-emerald-600 font-mono">6 - 8 Mins</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl mb-3 border border-slate-100">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase">Pilot</span>
              <span class="font-bold text-slate-800">Santosh Pujari</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase">ALS Paramedic</span>
              <span class="font-bold text-slate-800">Nurse Jyoti V.</span>
            </div>
          </div>

          <p class="text-[11px] text-slate-500 mb-3">Unit is equipped with 12-lead ECG telemetry, defibrillator, oxygen, and emergency resuscitation bay.</p>

          <div class="flex gap-2">
            <a href="tel:+918312473777" class="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-center transition flex items-center justify-center gap-1.5">
              <i data-lucide="phone-call" class="w-3.5 h-3.5"></i>
              <span>Call Onboard Paramedic</span>
            </a>
          </div>
        </div>
      `;
      featherOrLucideInit();
      showToast("Ambulance dispatched! Paramedics have been notified.", "success");
    }, 2200);
  });
}

/* ==========================================================================
   9. Testimonials Carousel / Grid
   ========================================================================== */
function renderTestimonials() {
  const container = document.getElementById("testimonialsGrid");
  if (!container || !window.HOSPITAL_DATA) return;

  const list = window.HOSPITAL_DATA.testimonials;
  container.innerHTML = list.map(item => `
    <div class="glass-card rounded-2xl p-6 hover-lift border-highlight-on-hover flex flex-col justify-between transition-all duration-300">
      <div>
        <div class="flex items-center gap-1 text-amber-400 mb-4">
          ${Array(item.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join('')}
        </div>
        <p class="text-xs text-slate-600 leading-relaxed italic mb-6">"${item.comment}"</p>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
        <img src="${item.avatar}" alt="${item.patient}" class="w-11 h-11 rounded-full object-cover border border-slate-200" />
        <div>
          <h4 class="text-xs font-bold text-slate-900">${item.patient} (${item.age})</h4>
          <p class="text-[11px] text-slate-500 font-medium">${item.treatment}</p>
          <p class="text-[10px] text-slate-400">${item.doctor}</p>
        </div>
      </div>
    </div>
  `).join('');

  featherOrLucideInit();
}

/* ==========================================================================
   10. Contact & Feedback Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("hospitalContactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName")?.value.trim();
    const email = document.getElementById("contactEmail")?.value.trim();
    const message = document.getElementById("contactMessage")?.value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all contact fields.", "warning");
      return;
    }

    const ticketId = `MSG-${Math.floor(10000 + Math.random() * 90000)}`;
    showToast(`Thank you, ${name}! Your inquiry #${ticketId} has been received by our patient care desk.`, "success");
    form.reset();
  });
}

/* ==========================================================================
   11. Mobile Navigation & Floating Actions
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  const closeBtn = document.getElementById("closeMobileMenuBtn");

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener("click", () => {
      mobileDrawer.classList.toggle("hidden");
    });
  }

  if (closeBtn && mobileDrawer) {
    closeBtn.addEventListener("click", () => {
      mobileDrawer.classList.add("hidden");
    });
  }

  // Close mobile drawer when clicking any link
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileDrawer) mobileDrawer.classList.add("hidden");
    });
  });
}

function initQuickStats() {
  // Can add dynamic counting animations if desired
}

/* ==========================================================================
   12. Notification Toast System
   ========================================================================== */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-item px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-3 border ${
    type === 'success' 
      ? 'bg-slate-900 text-white border-slate-700' 
      : type === 'warning' 
      ? 'bg-amber-900 text-white border-amber-700' 
      : 'bg-slate-800 text-white border-slate-700'
  }`;

  const iconName = type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : 'info';
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 shrink-0 text-slate-300"></i>
    <span class="leading-tight">${message}</span>
  `;

  container.appendChild(toast);
  featherOrLucideInit();

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Emergency SOS trigger modal helper
function openEmergencyModal() {
  const modal = document.getElementById("emergencySosModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    featherOrLucideInit();
  }
}

function closeEmergencyModal() {
  const modal = document.getElementById("emergencySosModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}
