const questions = [
  {
    id: "height",
    question: "What's your height?",
    type: "select",
    options: [
      "4'10\"",
      "4'11\"",
      "5'0\"",
      "5'1\"",
      "5'2\"",
      "5'3\"",
      "5'4\"",
      "5'5\"",
      "5'6\"",
      "5'7\"",
      "5'8\"",
      "5'9\"",
      "5'10\"",
      "5'11\"",
      "6'0\"",
      "6'1\"",
      "6'2\"",
    ],
  },

  {
    id: "weight",
    question: "What's your weight?",
    type: "number",
    optional: true,
  },

  {
    id: "waist",
    question: "Waist Measurement",
    type: "select",
    options: Array.from(
      { length: 29 },
      (_, i) => `${24 + i}"`
    ),
  },

  {
    id: "hip",
    question: "Hip Measurement",
    type: "select",
    options: Array.from(
      { length: 29 },
      (_, i) => `${32 + i}"`
    ),
  },

  {
    id: "waistFit",
    question: "Waist Fit",
    type: "radio",
    options: [
      "Snug",
      "Slightly Relaxed",
      "Relaxed",
    ],
  },

  {
    id: "rise",
    question: "Where should the waistband sit?",
    type: "radio",
    options: [
      "High Rise",
      "Mid Rise",
      "Low Rise",
    ],
  },

  {
    id: "thigh",
    question: "Thigh Fit",
    type: "radio",
    options: [
      "Fitted",
      "Relaxed",
      "Loose",
    ],
  },

  {
    id: "brands",
    question: "Brands you've worn",
    type: "multiselect",
    options: [
      "Levi's",
      "Wrangler",
      "Lee",
      "Pepe Jeans",
      "Spykar",
      "Flying Machine",
      "Roadster",
      "Zara",
      "H&M",
      "Jack & Jones",
    ],
  },

  {
    id: "problem",
    question: "Biggest Fit Frustration",
    type: "radio",
    options: [
      "Waist Gap",
      "Hip Tightness",
      "Wrong Length",
      "Thigh Fit",
      "Rise",
      "Other",
    ],
  },
];

export default questions;