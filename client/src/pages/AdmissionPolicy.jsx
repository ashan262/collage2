import React, { useState } from "react";
import {
  FileText,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
} from "lucide-react";
import HeroCarousel from "../components/Herocarousal";

const AdmissionPolicy = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General Policies", icon: "📋" },
    { id: "admission", label: "Admission Policy", icon: "📝" },
    { id: "hssc", label: "HSSC Program", icon: "🎓" },
    { id: "bs", label: "BS Program", icon: "🏆" },
  ];

  // Get the current active tab label for breadcrumbs
  const getCurrentTabLabel = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.label : "General Policies";
  };

  const generalPolicies = [
    {
      title: "Admission Criteria",
      icon: React.createElement(Award, { size: 24 }),
      policies: [
        "Admission is based on merit determined by academic performance and entry test scores",
        "Minimum eligibility criteria must be met for all programs",
        "Original documents are required for verification during admission",
        "False information or forged documents will result in immediate disqualification",
      ],
    },
    {
      title: "Age Requirements",
      icon: React.createElement(Clock, { size: 24 }),
      policies: [
        "HSSC Programs: Minimum age 15 years, maximum age 19 years",
        "BS Programs: Minimum age 17 years, maximum age 23 years",
        "Age relaxation of 2 years for special categories as per government rules",
        "Age is calculated as on 1st October of the admission year",
      ],
    },
    {
      title: "Document Requirements",
      icon: React.createElement(FileText, { size: 24 }),
      policies: [
        "All certificates must be attested by concerned authorities",
        "Migration certificate is mandatory for students from other boards",
        "Character certificate from the last attended institution is required",
        "Medical fitness certificate from a registered medical practitioner",
      ],
    },
    {
      title: "Fee and Payment",
      icon: React.createElement(Users, { size: 24 }),
      policies: [
        "Admission fee is non-refundable once paid",
        "Monthly fees must be paid by the 10th of each month",
        "Late payment charges apply after the due date",
        "Fee concession available for deserving students as per college policy",
      ],
    },
  ];

  const hsscPolicies = [
    {
      category: "Pre-Medical",
      eligibility: "Matric with Science subjects and minimum 60% marks",
      subjects: "Physics, Chemistry, Biology as compulsory subjects",
      quota:
        "70% open merit, 15% district quota, 10% rural quota, 5% special quota",
      additionalInfo: "Medical fitness is mandatory due to laboratory work",
    },
    {
      category: "Pre-Engineering",
      eligibility: "Matric with Science subjects and minimum 60% marks",
      subjects: "Physics, Chemistry, Mathematics as compulsory subjects",
      quota:
        "70% open merit, 15% district quota, 10% rural quota, 5% special quota",
      additionalInfo: "Strong mathematics background preferred",
    },
    {
      category: "ICS (Computer Science)",
      eligibility: "Matric with Science/General subjects and minimum 50% marks",
      subjects: "Physics, Mathematics, Computer Science as compulsory subjects",
      quota: "80% open merit, 20% other quotas",
      additionalInfo: "Basic computer knowledge is an advantage",
    },
    {
      category: "Commerce (I.Com)",
      eligibility: "Matric with any subjects and minimum 45% marks",
      subjects:
        "Accounting, Business Mathematics, Economics as compulsory subjects",
      quota: "80% open merit, 20% other quotas",
      additionalInfo: "Interest in business and commerce is preferred",
    },
  ];

  const bsPolicies = [
    {
      program: "BS Computer Science",
      eligibility: "FSc Pre-Engineering/ICS with 60% marks or equivalent",
      entryTest:
        "Entry test covering Mathematics, Physics, English, and General Knowledge",
      duration: "4 years (8 semesters)",
      additionalRequirements: "Computer literacy test may be conducted",
    },
    {
      program: "BS Mathematics",
      eligibility: "FSc Pre-Engineering/Pre-Medical with 60% marks",
      entryTest:
        "Entry test covering Mathematics, Physics, English, and General Knowledge",
      duration: "4 years (8 semesters)",
      additionalRequirements: "Strong mathematical background essential",
    },
    {
      program: "BS Physics",
      eligibility: "FSc Pre-Engineering/Pre-Medical with 60% marks",
      entryTest:
        "Entry test covering Physics, Mathematics, English, and General Knowledge",
      duration: "4 years (8 semesters)",
      additionalRequirements: "Laboratory work experience is preferred",
    },
    {
      program: "BS Chemistry",
      eligibility: "FSc Pre-Engineering/Pre-Medical with 60% marks",
      entryTest:
        "Entry test covering Chemistry, Physics, English, and General Knowledge",
      duration: "4 years (8 semesters)",
      additionalRequirements: "Laboratory safety training will be provided",
    },
  ];

  return React.createElement(
    "div",
    { className: "min-h-screen" },
    // Hero Section
    React.createElement(HeroCarousel, {
      title: "Admission Policy",
      subtitle:
        "Comprehensive admission guidelines and policies for F.G Degree College for Boys Kohat",
      height: "h-64",
      breadcrumbs: [
        { label: "Admissions", href: "/admissions" },
        { label: "Admission Policy", href: "/admission-policy" },
        { label: getCurrentTabLabel() },
      ],
    }),

    // Tab Navigation
    React.createElement(
      "div",
      { className: "container mx-auto px-4 mb-8" },
      React.createElement(
        "div",
        { className: "bg-white rounded-lg shadow-lg overflow-hidden" },
        React.createElement(
          "div",
          { className: "flex flex-wrap border-b border-gray-200" },
          tabs.map((tab) =>
            React.createElement(
              "button",
              {
                key: tab.id,
                onClick: () => setActiveTab(tab.id),
                className: `flex items-center space-x-2 px-6 py-4 font-medium text-sm md:text-base transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`,
              },
              React.createElement("span", { className: "text-lg" }, tab.icon),
              React.createElement(
                "span",
                { className: "hidden sm:inline" },
                tab.label
              )
            )
          )
        )
      )
    ),

    // Tab Content
    React.createElement(
      "div",
      { className: "container mx-auto px-4 pb-16" },
      // General Policies Tab
      activeTab === "general" &&
        React.createElement(
          "div",
          { className: "space-y-8" },
          React.createElement(
            "div",
            { className: "text-center mb-12" },
            React.createElement(
              "h2",
              {
                className:
                  "text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4",
              },
              "General Policies"
            ),
            React.createElement(
              "p",
              { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
              "Basic policies applicable to all admission programs"
            )
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
            generalPolicies.map((policy, index) =>
              React.createElement(
                "div",
                {
                  key: index,
                  className:
                    "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300",
                },
                React.createElement(
                  "div",
                  { className: "flex items-center mb-4" },
                  React.createElement(
                    "div",
                    { className: "text-indigo-600 mr-3" },
                    policy.icon
                  ),
                  React.createElement(
                    "h3",
                    {
                      className: "text-xl font-heading font-bold text-gray-800",
                    },
                    policy.title
                  )
                ),
                React.createElement(
                  "ul",
                  { className: "space-y-2" },
                  policy.policies.map((item, itemIndex) =>
                    React.createElement(
                      "li",
                      { key: itemIndex, className: "flex items-start" },
                      React.createElement(CheckCircle, {
                        className: "text-green-600 mr-2 mt-0.5 flex-shrink-0",
                        size: 14,
                      }),
                      React.createElement(
                        "span",
                        { className: "text-gray-700 text-sm" },
                        item
                      )
                    )
                  )
                )
              )
            )
          )
        ),

      // Admission Policy Tab
      activeTab === "admission" &&
        React.createElement(
          "div",
          { className: "space-y-8" },
          React.createElement(
            "div",
            { className: "text-center mb-12" },
            React.createElement(
              "h2",
              {
                className:
                  "text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4",
              },
              "Detailed Admission Policy"
            ),
            React.createElement(
              "p",
              { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
              "Complete admission guidelines and procedures for F.G Degree College for Boys Kohat"
            )
          ),

          // General Information
          React.createElement(
            "div",
            { className: "bg-white rounded-lg shadow-lg p-8 mb-8" },
            React.createElement(
              "h3",
              {
                className:
                  "text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center",
              },
              React.createElement(FileText, {
                className: "text-indigo-600 mr-3",
                size: 24,
              }),
              "General Information"
            ),
            React.createElement(
              "div",
              { className: "prose max-w-none text-gray-700" },
              React.createElement(
                "p",
                { className: "mb-4" },
                "Admission to the First Year and the Third Year opens after the declaration of the Federal Board results. Exact dates of admission are noticed through the national press. Only Pre Engineering Course is offered in the second shift."
              ),
              React.createElement(
                "p",
                { className: "mb-4" },
                'Admission of a candidate is subject to eligibility, quota and policies laid down by the FGEI (C/G) Directorate. Foreign Students should apply through the Ministry of Higher Education, Government of Pakistan, Islamabad, and obtain "Equivalence Certificate" from the ministry, for the academic qualifications attained by them in their country of origin.'
              ),
              React.createElement(
                "div",
                {
                  className:
                    "mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500",
                },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-blue-800 mb-2" },
                  "Important Notice"
                ),
                React.createElement(
                  "p",
                  { className: "text-blue-700 text-sm" },
                  "Following are the detailed eligibility criteria and admission procedures that all candidates must carefully review before applying."
                )
              )
            )
          ),

          // Eligibility Categories
          React.createElement(
            "div",
            { className: "bg-white rounded-lg shadow-lg p-8" },
            React.createElement(
              "h3",
              {
                className:
                  "text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center",
              },
              React.createElement(Users, {
                className: "text-indigo-600 mr-3",
                size: 24,
              }),
              "Category-wise Eligibility"
            ),
            React.createElement(
              "div",
              { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
              React.createElement(
                "div",
                { className: "border border-gray-200 rounded-lg p-6" },
                React.createElement(
                  "h4",
                  { className: "text-lg font-bold mb-3 text-indigo-600" },
                  "(a) Children of Civilian Residents of Cantonment"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Proof regarding residence in Rawalpindi Cantt. / Chaklala Cantt. i.e CNIC or any utility bill or Registry of the house in the name of Father/Mother or certificate of residence from the respective Executive Officer, Cantt Board."
                )
              ),
              React.createElement(
                "div",
                { className: "border border-gray-200 rounded-lg p-6" },
                React.createElement(
                  "h4",
                  { className: "text-lg font-bold mb-3 text-green-600" },
                  "(b) Children of Serving Armed Forces Personnel"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Service certificate from concerned Formation/Unit etc will be furnished. Children of MES employees will also be considered at par with those of army serving."
                )
              ),
              React.createElement(
                "div",
                { className: "border border-gray-200 rounded-lg p-6" },
                React.createElement(
                  "h4",
                  { className: "text-lg font-bold mb-3 text-purple-600" },
                  "(c) Children of Retired Armed Forces Personnel"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Copy of Pension Book will have to be furnished as proof."
                )
              ),
              React.createElement(
                "div",
                { className: "border border-gray-200 rounded-lg p-6" },
                React.createElement(
                  "h4",
                  { className: "text-lg font-bold mb-3 text-orange-600" },
                  "(d) Children of Employees paid out of Defence Estimates"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Certificate from the concerned office that they are being paid out of defence estimates will be required. Only those residing in Rawalpindi are eligible."
                )
              ),
              React.createElement(
                "div",
                {
                  className:
                    "border border-gray-200 rounded-lg p-6 lg:col-span-2",
                },
                React.createElement(
                  "h4",
                  { className: "text-lg font-bold mb-3 text-teal-600" },
                  "(e) Children of FGEI (C/G) Employees"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Certificate to that effect will be provided by the head of Office/Institution."
                )
              )
            )
          ),

          // First Year Admission
          React.createElement(
            "div",
            { className: "bg-white rounded-lg shadow-lg p-8 mb-8" },
            React.createElement(
              "h3",
              {
                className:
                  "text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center",
              },
              React.createElement(BookOpen, {
                className: "text-indigo-600 mr-3",
                size: 24,
              }),
              "Admission to First Year"
            ),
            React.createElement(
              "div",
              { className: "space-y-4" },
              React.createElement(
                "div",
                { className: "border-l-4 border-blue-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(a) Minimum Marks Requirement"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Admission to Pre-Engineering, Pre-Medical, Science General, Computer Science will be restricted to candidates obtaining a minimum of 60% marks in SSC Examination in the current year. Similarly, minimum of 50% marks will be required to qualify as a candidate for admission to Humanities Group."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-green-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(b) Application Process"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Application is to be made on the prescribed form which is available from college office on payment and to be submitted on or before the last date notified by the Admission Committee. One photostat copy of School/College Leaving Certificate or marks sheet duly attested by the Headmaster/Principal of the institution from where he has passed his matriculation Examination along with one passport sized photograph must be attached."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-purple-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(c) Character Certificate"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "In addition to the normal Character Certificate, the Principal may, if he deems necessary, call for a special report of good behavior, attendance, student's reputation and his amenability to discipline, from the Institution he last attended."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-orange-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(d) Merit Consideration"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Number of seats available in a category to which a candidate belongs and his merit therein according to the marks obtained by him are the basic considerations for admission."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-teal-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(e) Second Shift Consideration"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Students who do not stand on merit for admission in the first shift may be considered for the second shift on the same form."
                )
              )
            )
          ),

          // Third Year Admission
          React.createElement(
            "div",
            { className: "bg-white rounded-lg shadow-lg p-8 mb-8" },
            React.createElement(
              "h3",
              {
                className:
                  "text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center",
              },
              React.createElement(Award, {
                className: "text-indigo-600 mr-3",
                size: 24,
              }),
              "Admission to Third Year"
            ),
            React.createElement(
              "div",
              { className: "space-y-4" },
              React.createElement(
                "div",
                { className: "border-l-4 border-blue-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(a) Priority System"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Priority will be given to students passing FA/F.Sc. from F.G Degree College for Boys Kohat Rawalpindi in the current year. Their admission will be made as per allocation of seats, category/quota. Students passing F.A/F.Sc. from other colleges will be considered for admission only against the seats available in their respective category after the Sirsyedians have been accommodated."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-green-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(b) Mathematics Requirement"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Students who have not studied Maths at F.A/F.Sc. level will not be allowed to take any combination with Maths as a subject in B.A/B.Sc."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-purple-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(c) Character Certificate & Record"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Candidate will provide character certificate issued by the Head of the institution last attended. PREVIOUS RECORD of the former students of the college to determine their candidature for admission."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-orange-500 pl-4" },
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-2" },
                  "(d) Hafiz-e-Quran Bonus"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Hafiz-e-Quran candidates will be awarded twenty marks on provision of proof."
                )
              )
            )
          ),

          // Admission Procedure
          React.createElement(
            "div",
            { className: "bg-white rounded-lg shadow-lg p-8 mb-8" },
            React.createElement(
              "h3",
              {
                className:
                  "text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center",
              },
              React.createElement(CheckCircle, {
                className: "text-indigo-600 mr-3",
                size: 24,
              }),
              "Admission Procedure"
            ),
            React.createElement(
              "div",
              { className: "space-y-4" },
              React.createElement(
                "div",
                {
                  className:
                    "flex items-start space-x-3 p-4 bg-gray-50 rounded-lg",
                },
                React.createElement(
                  "div",
                  {
                    className:
                      "flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold",
                  },
                  "1"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Admission forms, duly completed in all respects, are received by the college up to the date announced by the Admission Committee. Incomplete forms stand rejected forthwith."
                )
              ),
              React.createElement(
                "div",
                {
                  className:
                    "flex items-start space-x-3 p-4 bg-gray-50 rounded-lg",
                },
                React.createElement(
                  "div",
                  {
                    className:
                      "flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold",
                  },
                  "2"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Lists of names of candidates eligible for interview along with dates for interview are displayed on the College Notice Board and on its website."
                )
              ),
              React.createElement(
                "div",
                {
                  className:
                    "flex items-start space-x-3 p-4 bg-gray-50 rounded-lg",
                },
                React.createElement(
                  "div",
                  {
                    className:
                      "flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold",
                  },
                  "3"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "Candidates cleared by the Admission Committee are required to read out the PLEDGE in the presence of a parent or a responsible guardian, in the Principal's office."
                )
              ),
              React.createElement(
                "div",
                {
                  className:
                    "flex items-start space-x-3 p-4 bg-gray-50 rounded-lg",
                },
                React.createElement(
                  "div",
                  {
                    className:
                      "flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold",
                  },
                  "4"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700" },
                  "A candidate stands formally admitted to the college after his form has been signed by the Principal and he has paid all college dues on or before the date mentioned on the Admission Form."
                )
              ),
              React.createElement(
                "div",
                {
                  className:
                    "flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200",
                },
                React.createElement(
                  "div",
                  {
                    className:
                      "flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold",
                  },
                  "5"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-red-700" },
                  "Candidature of a candidate may be rejected at any stage from 1 to 4 above and the college is not bound to give reasons thereof."
                )
              )
            )
          ),

          // Interview Requirements
          React.createElement(
            "div",
            { className: "bg-white rounded-lg shadow-lg p-8 mb-8" },
            React.createElement(
              "h3",
              {
                className:
                  "text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center",
              },
              React.createElement(Users, {
                className: "text-indigo-600 mr-3",
                size: 24,
              }),
              "At the Time of Interview"
            ),
            React.createElement(
              "div",
              { className: "space-y-6" },
              React.createElement(
                "div",
                {},
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-3" },
                  "(a) General Requirements"
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "The candidate accompanied by his parent (Father or Mother) should come in college uniform along with following documents:"
                ),
                React.createElement(
                  "ul",
                  {
                    className:
                      "list-disc list-inside space-y-2 text-sm text-gray-700 ml-4",
                  },
                  React.createElement(
                    "li",
                    {},
                    "Army retired personnel should bring pension book/discharge certificate in original."
                  ),
                  React.createElement(
                    "li",
                    {},
                    "Two Passport size and one 1\" x 1\" size recent photographs (unattested). The candidate's name and father's name should be written on the back of the photographs."
                  )
                )
              ),
              React.createElement(
                "div",
                {},
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-3" },
                  "(b) Attested Photo Copies Required"
                ),
                React.createElement(
                  "ul",
                  {
                    className:
                      "list-disc list-inside space-y-2 text-sm text-gray-700 ml-4",
                  },
                  React.createElement(
                    "li",
                    {},
                    "Character certificate issued by the Head of Institution last attended."
                  ),
                  React.createElement("li", {}, "Two copies of Marks sheet."),
                  React.createElement(
                    "li",
                    {},
                    "Migration certificate, in original, in case the applicant has passed his SSC/HSSC examination from a board other than the Federal Board, Islamabad."
                  ),
                  React.createElement(
                    "li",
                    {},
                    "For admission in Degree Classes, students are required to furnish NOC from a Board outside the jurisdiction of the University of Punjab if applicable."
                  ),
                  React.createElement(
                    "li",
                    {},
                    "College Leaving Certificate in original if the candidate is joining the college under migration from another college."
                  )
                )
              ),
              React.createElement(
                "div",
                {},
                React.createElement(
                  "h4",
                  { className: "font-semibold text-gray-800 mb-3" },
                  "(c) Original Documents Required"
                ),
                React.createElement(
                  "ul",
                  {
                    className:
                      "list-disc list-inside space-y-2 text-sm text-gray-700 ml-4",
                  },
                  React.createElement("li", {}, "Marks Sheet"),
                  React.createElement(
                    "li",
                    {},
                    "Character/Provisional Certificate"
                  ),
                  React.createElement(
                    "li",
                    {},
                    "Pension Book (for Retired Armed Forces Personnel)"
                  ),
                  React.createElement(
                    "li",
                    {},
                    "Service card (for serving Armed Forces Personnel FGEI (C/G))"
                  ),
                  React.createElement(
                    "li",
                    {},
                    "Employees and civilian paid out of defence estimates"
                  ),
                  React.createElement("li", {}, "'B' Form (Issued by NADRA)"),
                  React.createElement(
                    "li",
                    {},
                    "Affidavit with a Court Stamp of the value of Rs. 20/-"
                  )
                )
              )
            )
          ),

          // General Instructions
          React.createElement(
            "div",
            { className: "bg-white rounded-lg shadow-lg p-8 mb-8" },
            React.createElement(
              "h3",
              {
                className:
                  "text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center",
              },
              React.createElement(FileText, {
                className: "text-indigo-600 mr-3",
                size: 24,
              }),
              "Admission: General Instructions"
            ),
            React.createElement(
              "div",
              { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
              React.createElement(
                "div",
                { className: "border-l-4 border-yellow-500 pl-4" },
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "(a) Acceptance of an application form does not necessarily mean acceptance of a candidate for admission."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-yellow-500 pl-4" },
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "(b) In their own interest, candidates are advised to apply for admission to other colleges as well."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-red-500 pl-4" },
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "(c) Admission form containing incorrect or false information shall stand rejected even after a candidate has paid admission fee."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-blue-500 pl-4" },
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "(d) In case a candidate wants to be considered for admission to more than one groups (Pre-Medical, Pre-Engineering, Science, Gen./Humanities), he should submit separate admission forms for each group, on or before the closing date."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-purple-500 pl-4" },
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "(e) For Admission in Degree classes the students are required to furnish NOC from a Board outside the jurisdiction of the Punjab. (if applicable)"
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-gray-500 pl-4" },
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "(f) The college does not admit students on casual basis."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-orange-500 pl-4" },
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "(g) The college does not accept the cases of students desiring migration from Colleges in Rawalpindi and Islamabad."
                )
              ),
              React.createElement(
                "div",
                { className: "border-l-4 border-red-500 pl-4" },
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-700 mb-3" },
                  "(h) The Principal reserves the right to refuse admission to any candidate without assigning any reason."
                )
              )
            )
          ),

          // Re-admission Policy
          React.createElement(
            "div",
            {
              className:
                "bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow-lg p-8 border border-red-200",
            },
            React.createElement(
              "h3",
              {
                className:
                  "text-2xl font-heading font-bold text-red-800 mb-4 flex items-center",
              },
              React.createElement(Clock, {
                className: "text-red-600 mr-3",
                size: 24,
              }),
              "Re-admission Policy"
            ),
            React.createElement(
              "p",
              { className: "text-red-700" },
              "Re-admission of any student to repeat his previous class is not allowed except in case a student who could not appear in Board's exam on medical grounds and had informed the college well in time."
            )
          )
        ),

      // HSSC Program Tab
      activeTab === "hssc" &&
        React.createElement(
          "div",
          { className: "space-y-8" },
          React.createElement(
            "div",
            { className: "text-center mb-12" },
            React.createElement(
              "h2",
              {
                className:
                  "text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4",
              },
              "HSSC Program Policies"
            ),
            React.createElement(
              "p",
              { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
              "Specific admission policies for Intermediate programs"
            )
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
            hsscPolicies.map((program, index) =>
              React.createElement(
                "div",
                {
                  key: index,
                  className:
                    "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300",
                },
                React.createElement(
                  "div",
                  { className: "flex items-center mb-4" },
                  React.createElement(BookOpen, {
                    className: "text-indigo-600 mr-3",
                    size: 20,
                  }),
                  React.createElement(
                    "h3",
                    {
                      className: "text-lg font-heading font-bold text-gray-800",
                    },
                    program.category
                  )
                ),
                React.createElement(
                  "div",
                  { className: "space-y-3" },
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "span",
                      { className: "text-sm font-medium text-gray-600" },
                      "Eligibility: "
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-800" },
                      program.eligibility
                    )
                  ),
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "span",
                      { className: "text-sm font-medium text-gray-600" },
                      "Core Subjects: "
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-800" },
                      program.subjects
                    )
                  ),
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "span",
                      { className: "text-sm font-medium text-gray-600" },
                      "Quota System: "
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-800" },
                      program.quota
                    )
                  ),
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "span",
                      { className: "text-sm font-medium text-gray-600" },
                      "Additional Info: "
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-800" },
                      program.additionalInfo
                    )
                  )
                )
              )
            )
          )
        ),

      // BS Program Tab
      activeTab === "bs" &&
        React.createElement(
          "div",
          { className: "space-y-8" },
          React.createElement(
            "div",
            { className: "text-center mb-12" },
            React.createElement(
              "h2",
              {
                className:
                  "text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4",
              },
              "BS Program Policies"
            ),
            React.createElement(
              "p",
              { className: "text-xl text-gray-600 max-w-2xl mx-auto" },
              "Admission policies for Bachelor's degree programs"
            )
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
            bsPolicies.map((program, index) =>
              React.createElement(
                "div",
                {
                  key: index,
                  className:
                    "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300",
                },
                React.createElement(
                  "div",
                  { className: "flex items-center mb-4" },
                  React.createElement(Award, {
                    className: "text-purple-600 mr-3",
                    size: 20,
                  }),
                  React.createElement(
                    "h3",
                    {
                      className: "text-lg font-heading font-bold text-gray-800",
                    },
                    program.program
                  )
                ),
                React.createElement(
                  "div",
                  { className: "space-y-3" },
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "span",
                      { className: "text-sm font-medium text-gray-600" },
                      "Eligibility: "
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-800" },
                      program.eligibility
                    )
                  ),
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "span",
                      { className: "text-sm font-medium text-gray-600" },
                      "Entry Test: "
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-800" },
                      program.entryTest
                    )
                  ),
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "span",
                      { className: "text-sm font-medium text-gray-600" },
                      "Duration: "
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-800" },
                      program.duration
                    )
                  ),
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "span",
                      { className: "text-sm font-medium text-gray-600" },
                      "Additional Requirements: "
                    ),
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-800" },
                      program.additionalRequirements
                    )
                  )
                )
              )
            )
          )
        )
    )
  );
};

export default AdmissionPolicy;
