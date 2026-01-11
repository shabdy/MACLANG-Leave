export const leaveTypes = [
  {
    code: "VL",
    name: "Vacation Leave",
    maxDays: 5,
    paid: true,
    requiresAttachment: false,
    description: "Leave taken for personal reasons, rest, or travel.",
    instructions: [
      "Must be filed 5 days in advance whenever possible.",
      "If traveling abroad, it requires securing travel authority and clearing money/work accountabilities."
    ]
  },
  {
    code: "MFL",
    name: "Mandatory/Forced Leave",
    maxDays: 5,
    paid: true,
    requiresAttachment: false,
    description: "An annual 5-day vacation leave that must be taken, or it will be forfeited at the end of the year.",
    instructions: [
      "If a scheduled leave is cancelled by the agency due to 'exigency of service,' it won't be deducted from the employee's accumulated credits.",
      "Taking at least 1 day of Vacation Leave (VL) counts toward this requirement."
    ]
  },
  {
    code: "SL",
    name: "Sick Leave",
    maxDays: 0,
    paid: true,
    requiresAttachment: true,
    description: "Leave taken due to illness or injury.",
    instructions: [
      "Filed immediately upon return.",
      "If filed in advance or if it exceeds 5 days, a medical certificate is required.",
      "If no medical consultation was made, the employee must submit an affidavit."
    ]
  },
  {
    code: "ML",
    name: "Maternity Leave",
    maxDays: 105,
    paid: true,
    requiresAttachment: true,
    description: "Leave for female employees for childbirth or miscarriage.",
    instructions: [
      "Requires proof of pregnancy (ultrasound or doctor’s certificate with expected delivery date).",
      "CS Form No. 6a (Notice of Allocation of Maternity Leave Credits) if applicable."
    ]
  },
  {
    code: "PL",
    name: "Paternity Leave",
    maxDays: 7,
    paid: true,
    requiresAttachment: true,
    description: "Leave for married male employees to support their spouse during recovery/childcare.",
    instructions: [
      "Proof of child's delivery (birth certificate), medical certificate, and marriage contract."
    ]
  },
  {
    code: "SPL",
    name: "Special Privilege Leave",
    maxDays: 3,
    paid: true,
    requiresAttachment: false,
    description: "Leave for personal milestones or obligations (e.g., birthdays, PTA meetings).",
    instructions: [
      "Must be filed/approved 1 week prior, except in emergencies.",
      "Travel authority needed if going abroad."
    ]
  },
  {
    code: "SOPL",
    name: "Solo Parent Leave",
    maxDays: 7,
    paid: true,
    requiresAttachment: true,
    description: "Leave granted to employees who are single parents.",
    instructions: [
      "Filed in advance (5 days before) whenever possible.",
      "Must present an updated Solo Parent Identification Card."
    ]
  },
  {
    code: "SLD",
    name: "Study Leave",
    maxDays: 180,
    paid: false,
    requiresAttachment: true,
    description: "Leave granted for studying or preparing for board exams.",
    instructions: [
      "Must meet agency internal requirements.",
      "Requires a formal contract between the agency head and the employee."
    ]
  },
  {
    code: "VAWC",
    name: "VAWC Leave",
    maxDays: 10,
    paid: true,
    requiresAttachment: true,
    description: "Leave for victims of 'Violence Against Women and Their Children.'",
    instructions: [
      "Filed in advance or upon return.",
      "Supporting documents: Barangay Protection Order (BPO), TPO/PPO from court, or a certification from the prosecutor/clerk of court.",
      "If none are available, a police report and medical certificate may be submitted."
    ]
  },
  {
    code: "RL",
    name: "Rehabilitation Leave",
    maxDays: 180,
    paid: true,
    requiresAttachment: true,
    description: "For injuries sustained while performing official duties.",
    instructions: [
      "Filed within 1 week of the accident.",
      "Requires a letter request, police reports (if any), and medical certificate.",
      "Written concurrence of a government physician if the attending doctor is a private practitioner."
    ]
  },
  {
    code: "SPLW",
    name: "Special Leave Benefits for Women",
    maxDays: 60,
    paid: true,
    requiresAttachment: true,
    description: "Leave for those who undergo surgery due to gynecological disorders.",
    instructions: [
      "Filed at least 5 days before scheduled surgery (or upon return for emergencies).",
      "Must include medical certificate, clinical summary, histopathological report, and details of the operative technique."
    ]
  },
  {
    code: "SECL",
    name: "Special Emergency (Calamity) Leave",
    maxDays: 5,
    paid: true,
    requiresAttachment: false,
    description: "Leave for employees affected by natural calamities/disasters.",
    instructions: [
      "Can be taken for 5 straight days or staggered within 30 days of disaster.",
      "Eligibility verified based on employee residence in a declared calamity area."
    ]
  },
  {
    code: "MLC",
    name: "Monetization of Leave Credits",
    maxDays: 0,
    paid: false,
    requiresAttachment: true,
    description: "Converting earned leave credits into cash.",
    instructions: [
      "Requesting 50% or more of credits requires a letter to the head of agency stating valid and justifiable reasons."
    ]
  },
  {
    code: "TL",
    name: "Terminal Leave",
    maxDays: 0,
    paid: true,
    requiresAttachment: true,
    description: "Leave applied for at the end of service (resignation/retirement).",
    instructions: [
      "Proof of resignation, retirement, or separation from service."
    ]
  },
  {
    code: "AL",
    name: "Adoption Leave",
    maxDays: 0,
    paid: true,
    requiresAttachment: true,
    description: "Leave for employees who are legally adopting a child.",
    instructions: [
      "Must provide an authenticated copy of the Pre-Adoptive Placement Authority from the DSWD."
    ]
  }
];

export const leaveGeneralNote =
  "Any leave of 30 calendar days or more (and Terminal Leave) requires a formal clearance from money, property, and work-related accountabilities.";
