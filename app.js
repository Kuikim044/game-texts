const CATEGORIES = [
  "Bug",
  "Gameplay",
  "Balance",
  "Monetization",
  "Gacha",
  "Performance",
  "Event",
  "Progression",
  "UI/UX",
  "Translation",
  "Community",
  "Network",
  "LiveOps",
  "Other"
];

const PRIORITIES = ["Critical", "High", "Medium", "Low"];
const SENTIMENTS = ["Positive", "Neutral", "Negative"];
const OWNERS = [
  "Game Design",
  "Backend",
  "Client Engineering",
  "QA",
  "UIUX",
  "Monetization",
  "LiveOps",
  "Community",
  "Localization",
  "Product Manager"
];

const COLORS = {
  Positive: "#39d98a",
  Neutral: "#ffd166",
  Negative: "#ff5c7a",
  Critical: "#ff5c7a",
  High: "#ffad5a",
  Medium: "#ffd166",
  Low: "#39d98a",
  blue: "#5da9ff",
  cyan: "#40d9ff",
  violet: "#b78cff"
};

const I18N = {
  en: {
    tabs: { dashboard: "Dashboard", analysis: "Analysis Table", report: "Insight Report", workflow: "AI Workflow", validation: "Human Review" },
    pageTitles: { dashboard: "Analytics Dashboard", analysis: "Feedback Analysis Table", report: "Executive Insight Report", workflow: "AI Workflow", validation: "Validation / Human Review" },
    panels: ["Sentiment Distribution", "Priority Distribution", "Category Distribution", "Team Ownership", "Top Mentioned Issues", "Common Complaints", "Keyword Analysis", "Critical Risk Areas", "AI Generated Key Insights", "Most Important Feedback", "Recommendation Highlights", "Impact Heatmap"],
    buttons: { refresh: "Refresh", csv: "Export CSV", excel: "Export Excel", previous: "Previous", next: "Next", lang: "ไทย" },
    table: { search: "Search feedback, summary, owner...", sentiments: "All Sentiments", categories: "All Categories", priorities: "All Priorities", showing: "Showing", of: "of", rows: "rows", page: "Page" },
    columns: { feedback_id: "Feedback ID", player_feedback: "Player Feedback", sentiment: "Sentiment", category: "Category", priority: "Priority", ai_summary: "AI Summary", suggested_owner: "Owner", confidence: "Confidence", note: "Note" },
    kpi: {
      total: ["Total Feedback", "All spreadsheet rows processed"],
      negative: ["Negative Sentiment", "player entries"],
      risk: ["High Risk Items", "Critical + High priorities"],
      topCategory: ["Top Category", "entries"],
      mainIssue: ["Main Issue", "mentions"],
      positive: ["Positive Signals", "of all entries"],
      owners: ["Team Owners", "Suggested accountable groups"],
      critical: ["Critical Items", "Immediate triage candidates"]
    },
    dashboardText: { analyzed: "analyzed rows", mentions: "mentions", totalFeedback: "of total feedback", riskScore: "risk score", total: "total", critical: "critical", high: "high", negative: "negative" },
    brand: { eyebrow: "AI-powered player voice analytics", auto: "Auto Analysis", loading: "Loading data...", waiting: "Waiting for dataset" }
  },
  th: {
    tabs: { dashboard: "แดชบอร์ด", analysis: "ตารางวิเคราะห์", report: "รายงาน Insight", workflow: "Workflow AI", validation: "ตรวจทานโดยคน" },
    pageTitles: { dashboard: "แดชบอร์ดวิเคราะห์ Feedback", analysis: "ตารางวิเคราะห์ Feedback", report: "รายงาน Insight สำหรับผู้บริหาร", workflow: "Workflow การทำงานของ AI", validation: "Validation / ตรวจทานโดยคน" },
    panels: ["สัดส่วน Sentiment", "สัดส่วน Priority", "สัดส่วน Category", "สัดส่วนทีม Owner", "ประเด็นที่ถูกพูดถึงมากที่สุด", "Complaint ที่พบบ่อย", "วิเคราะห์ Keyword", "พื้นที่เสี่ยง Critical", "Insight สำคัญจาก AI", "Feedback ที่สำคัญที่สุด", "ข้อแนะนำหลัก", "Heatmap ผลกระทบ"],
    buttons: { refresh: "รีเฟรช", csv: "Export CSV", excel: "Export Excel", previous: "ก่อนหน้า", next: "ถัดไป", lang: "EN" },
    table: { search: "ค้นหา feedback, summary, owner...", sentiments: "ทุก Sentiment", categories: "ทุก Category", priorities: "ทุก Priority", showing: "แสดง", of: "จาก", rows: "รายการ", page: "หน้า" },
    columns: { feedback_id: "Feedback ID", player_feedback: "Feedback ผู้เล่น", sentiment: "Sentiment", category: "Category", priority: "Priority", ai_summary: "สรุปโดย AI", suggested_owner: "Owner", confidence: "Confidence", note: "Note / ข้อสังเกต" },
    kpi: {
      total: ["Feedback ทั้งหมด", "ประมวลผลครบทุกแถวจากไฟล์"],
      negative: ["Sentiment เชิงลบ", "รายการจากผู้เล่น"],
      risk: ["รายการความเสี่ยงสูง", "Critical + High priority"],
      topCategory: ["Category หลัก", "รายการ"],
      mainIssue: ["Issue หลัก", "ครั้งที่พบ"],
      positive: ["สัญญาณเชิงบวก", "ของรายการทั้งหมด"],
      owners: ["ทีม Owner", "ทีมที่ควรรับผิดชอบ"],
      critical: ["รายการ Critical", "ควร triage ทันที"]
    },
    dashboardText: { analyzed: "รายการที่วิเคราะห์แล้ว", mentions: "ครั้งที่พบ", totalFeedback: "ของ feedback ทั้งหมด", riskScore: "risk score", total: "ทั้งหมด", critical: "critical", high: "high", negative: "negative" },
    brand: { eyebrow: "วิเคราะห์เสียงผู้เล่นด้วย AI", auto: "สถานะการวิเคราะห์", loading: "กำลังโหลดข้อมูล...", waiting: "รอ dataset" }
  }
};

const CATEGORY_RULES = [
  {
    category: "Bug",
    owner: "QA",
    words: ["ไม่ได้", "หาย", "ค้าง", "เด้ง", "error", "bug", "restart", "ล็อกอิน", "login", "ปุ่มย้อนกลับ", "แจ้งเตือนเควสต์ขึ้นซ้ำ"]
  },
  {
    category: "Performance",
    owner: "Client Engineering",
    words: ["แลค", "เฟรมตก", "โหลดแพตช์ช้า", "โหลด", "ช้า", "กระตุก", "performance", "fps"]
  },
  {
    category: "Network",
    owner: "Backend",
    words: ["เน็ต", "เชื่อมต่อ", "network", "server", "login", "Facebook", "ล็อกอิน"]
  },
  {
    category: "Gacha",
    owner: "Monetization",
    words: ["กาชา", "pity", "rate up", "โรล", "ตัวซ้ำ", "ticket", "preview animation", "ทดลองใช้ตัวละคร"]
  },
  {
    category: "Monetization",
    owner: "Monetization",
    words: ["เติมเงิน", "แพ็กเกจ", "เพชร", "shop", "skin", "ราคา", "ขาย", "item ใน event shop"]
  },
  {
    category: "Balance",
    owner: "Game Design",
    words: ["balance", "แรงเกิน", "one shot", "ไม่แฟร์", "meta", "ชนะง่าย", "ฮีล", "ดาเมจ", "อาวุธ", "บอส"]
  },
  {
    category: "Event",
    owner: "LiveOps",
    words: ["event", "กิจกรรม", "อันดับ", "ภารกิจ", "mini game", "stamina", "ร้าน", "ปฏิทิน"]
  },
  {
    category: "Progression",
    owner: "Game Design",
    words: ["ทรัพยากร", "ทอง", "ปลุกพลัง", "ฟาร์ม", "อัปเกรด", "รางวัลรายวัน", "login", "แต้ม", "ของรางวัล"]
  },
  {
    category: "UI/UX",
    owner: "UIUX",
    words: ["UI", "ตัวหนังสือ", "อ่านยาก", "inventory", "กรอง", "แจ้งเตือนสีแดง", "stat เปรียบเทียบ", "Tutorial", "หน้า"]
  },
  {
    category: "Translation",
    owner: "Localization",
    words: ["ภาษา", "subtitle", "เสียงพากย์", "แปล", "เงื่อนไขแล้วงง"]
  },
  {
    category: "Community",
    owner: "Community",
    words: ["guild", "กิลด์", "ทุกคนช่วยกัน", "community"]
  },
  {
    category: "LiveOps",
    owner: "LiveOps",
    words: ["รางวัล login", "เควสต์รายสัปดาห์", "ปฏิทิน event", "แจก", "rank", "อันดับ"]
  },
  {
    category: "Gameplay",
    owner: "Game Design",
    words: ["auto battle", "replay", "ด่าน", "ต่อสู้", "สกิล", "ตัวละคร", "จัดทีม", "ระบบ guild boss"]
  }
];

const POSITIVE_WORDS = ["ชอบ", "ดี", "สนุก", "น่ารัก", "สวย", "สะอาด", "เข้าใจง่าย", "กลับมาเล่น", "ไม่เครียด", "ขอบคุณ"];
const NEGATIVE_WORDS = [
  "ยาก",
  "ไม่แฟร์",
  "ท้อ",
  "น้อย",
  "สูงไป",
  "แพง",
  "ช้า",
  "แลค",
  "เฟรมตก",
  "หาย",
  "ไม่ได้",
  "งง",
  "ซ้ำ",
  "หนักมาก",
  "ขาด",
  "อ่านยาก",
  "แรงเกิน",
  "ไม่คุ้ม",
  "สู้ยาก",
  "เสียเวลา",
  "one shot"
];

const ISSUE_PATTERNS = [
  { key: "Gacha fairness and pity clarity", terms: ["กาชา", "pity", "rate up", "ตัวซ้ำ", "โรล"] },
  { key: "Event reward economy", terms: ["event shop", "รางวัล login", "เควสต์รายสัปดาห์", "stamina", "ของแลก", "ร้าน"] },
  { key: "Boss difficulty spikes", terms: ["บอส", "one shot", "หลบไม่ทัน"] },
  { key: "PvP meta compression", terms: ["PvP", "arena", "meta", "ชนะง่าย", "Mika"] },
  { key: "Progression resource scarcity", terms: ["ทอง", "ทรัพยากร", "ปลุกพลัง", "ฟาร์ม", "อัปเกรด"] },
  { key: "UI readability and navigation", terms: ["ตัวหนังสือ", "อ่านยาก", "ปุ่มย้อนกลับ", "แจ้งเตือนสีแดง", "inventory"] },
  { key: "Performance and patch loading", terms: ["แลค", "เฟรมตก", "โหลดแพตช์", "โหลด"] },
  { key: "Auto battle behavior", terms: ["auto battle", "ใช้สกิลแปลก"] },
  { key: "Localization and voice coverage", terms: ["ภาษาไทย", "subtitle", "เสียงพากย์", "แปล"] },
  { key: "Guild and social feature demand", terms: ["guild boss", "guild", "กิลด์"] },
  { key: "Replay and preview feature requests", terms: ["replay", "preview animation", "ทดลองใช้"] },
  { key: "Tutorial and onboarding pace", terms: ["Tutorial", "ผู้เล่นใหม่", "อธิบายระบบ"] }
];

const state = {
  raw: [],
  rows: [],
  analytics: null,
  filteredRows: [],
  sortKey: "priority",
  sortDir: "asc",
  page: 1,
  pageSize: 25,
  currentTab: "dashboard",
  lang: "en"
};

const columns = [
  ["feedback_id", "Feedback ID"],
  ["player_feedback", "Player Feedback"],
  ["sentiment", "Sentiment"],
  ["category", "Category"],
  ["priority", "Priority"],
  ["ai_summary", "AI Summary"],
  ["suggested_owner", "Owner"],
  ["confidence", "Confidence"],
  ["note", "Note"]
];

document.addEventListener("DOMContentLoaded", () => {
  wireNavigation();
  wireTableControls();
  wireExports();
  applyLanguage();
  loadData();
  setInterval(loadData, 60000);
});

async function loadData() {
  try {
    let raw;
    if (Array.isArray(window.FEEDBACK_DATA)) {
      raw = window.FEEDBACK_DATA;
    } else {
      try {
        const jsonResponse = await fetch(`feedback.json?ts=${Date.now()}`);
        if (!jsonResponse.ok) throw new Error("feedback.json not available");
        raw = await jsonResponse.json();
      } catch (error) {
        const csvResponse = await fetch(`feedback.csv?ts=${Date.now()}`);
        if (!csvResponse.ok) throw new Error("feedback.csv not available");
        raw = parseCsv(await csvResponse.text());
      }
    }

    state.raw = raw;
    state.rows = raw.map(analyzeFeedback);
    state.analytics = buildAnalytics(state.rows);
    state.page = 1;
    populateFilters();
    applyFilters();
    applyLanguage();
    renderAll();
    updateStatus("Analysis complete", `${state.rows.length} feedback rows processed`);
  } catch (error) {
    updateStatus("Data load failed", error.message);
  }
}

function analyzeFeedback(item, index) {
  const text = item.player_feedback || "";
  const normalized = text.toLowerCase();
  const sentiment = classifySentiment(normalized);
  const matchedRule = chooseCategory(normalized, item.game_area_hint || "");
  const priority = classifyPriority(normalized, sentiment, matchedRule.category, item.player_segment);
  const issue = detectIssue(normalized);
  const confidence = classifyConfidence(normalized, matchedRule.score, issue);
  const aiSummary = buildSummary(text, matchedRule.category, issue);
  const note = buildNote(item, priority, sentiment, matchedRule.category, issue);

  return {
    feedback_id: item.feedback_id || `FB-${String(index + 1).padStart(3, "0")}`,
    player_feedback: text,
    sentiment,
    category: matchedRule.category,
    priority,
    ai_summary: aiSummary,
    suggested_owner: matchedRule.owner,
    confidence,
    note,
    issue,
    date: item.date || "",
    source: item.source || "",
    player_segment: item.player_segment || "",
    platform: item.platform || "",
    game_version: item.game_version || "",
    game_area_hint: item.game_area_hint || ""
  };
}

function classifySentiment(text) {
  const positive = countMatches(text, POSITIVE_WORDS);
  const negative = countMatches(text, NEGATIVE_WORDS);
  if (negative >= positive + 1) return "Negative";
  if (positive >= negative + 1) return "Positive";
  if (negative > 0 && positive > 0) return "Neutral";
  return "Neutral";
}

function chooseCategory(text, areaHint) {
  const area = areaHint.toLowerCase();
  let best = { category: "Other", owner: "Product Manager", score: 0 };
  CATEGORY_RULES.forEach((rule) => {
    let score = countMatches(text, rule.words);
    if (rule.words.some((word) => area.includes(word.toLowerCase()))) score += 1;
    if (score > best.score) best = { ...rule, score };
  });
  return best;
}

function classifyPriority(text, sentiment, category, segment) {
  const criticalTerms = ["ไม่ได้", "ล็อกอิน", "หาย", "เด้ง", "ค้าง", "แลคมาก", "เฟรมตก", "server", "error"];
  const highTerms = ["one shot", "ไม่แฟร์", "แรงเกิน", "แพง", "สูงไป", "ตามคนอื่นไม่ทัน", "สู้ยาก", "ขาดตลอด", "โหลดแพตช์ช้า"];
  const mediumTerms = ["อยากให้", "อ่านยาก", "ซ้ำ", "น้อยไป", "ไม่คุ้ม", "งง", "เสียเวลา"];

  let score = 0;
  score += countMatches(text, criticalTerms) * 3;
  score += countMatches(text, highTerms) * 2;
  score += countMatches(text, mediumTerms);
  if (sentiment === "Negative") score += 1;
  if (["Bug", "Performance", "Network"].includes(category)) score += 1;
  if (["Whale", "Guild Leader"].includes(segment)) score += 1;

  if (score >= 5) return "Critical";
  if (score >= 3) return "High";
  if (score >= 1) return "Medium";
  return "Low";
}

function detectIssue(text) {
  let best = { key: "General feedback", score: 0 };
  ISSUE_PATTERNS.forEach((pattern) => {
    const score = countMatches(text, pattern.terms);
    if (score > best.score) best = { key: pattern.key, score };
  });
  return best.score > 0 ? best.key : "General feedback";
}

function classifyConfidence(text, categoryScore, issue) {
  const signal = categoryScore + (issue === "General feedback" ? 0 : 1) + Math.min(2, Math.floor(text.length / 45));
  if (signal >= 4) return "High";
  if (signal >= 2) return "Medium";
  return "Low";
}

function buildSummary(text, category, issue) {
  const clean = stripLeadIn(text);
  if (clean.length <= 92) return `${category}: ${clean}`;
  return `${category}: ${clean.slice(0, 89)}...`;
}

function buildNote(item, priority, sentiment, category, issue) {
  const segment = item.player_segment ? `${item.player_segment} segment` : "Player segment";
  if (priority === "Critical") {
    return `${segment}; investigate immediately because this can block play, damage trust, or create escalation risk. Issue cluster: ${issue}.`;
  }
  if (sentiment === "Positive") {
    return `Positive signal worth preserving; route learnings to ${category} roadmap decisions. Issue cluster: ${issue}.`;
  }
  if (priority === "High") {
    return `${segment}; likely to affect retention or spend perception. Prioritize triage and measure recurrence. Issue cluster: ${issue}.`;
  }
  return `Track trend and compare with future patches. Issue cluster: ${issue}.`;
}

function stripLeadIn(text) {
  return text
    .replace(/^อยากฝากทีมงานว่า\s*/i, "")
    .replace(/^ส่วนตัวคิดว่า\s*/i, "")
    .replace(/^เจอบ่อยมากว่า\s*/i, "")
    .replace(/\s*(รบกวนช่วยดูให้หน่อย|ถ้าแก้ได้จะดีมาก|ขอบคุณครับ\/ค่ะ)$/i, "")
    .trim();
}

function countMatches(text, words) {
  return words.reduce((count, word) => count + (text.includes(word.toLowerCase()) ? 1 : 0), 0);
}

function buildAnalytics(rows) {
  const total = rows.length;
  const sentiment = countBy(rows, "sentiment");
  const category = countBy(rows, "category");
  const priority = countBy(rows, "priority");
  const owner = countBy(rows, "suggested_owner");
  const issue = countBy(rows, "issue");
  const words = keywordAnalysis(rows);
  const issueEntries = sortEntries(issue);
  const namedIssues = issueEntries.filter(([key]) => key !== "General feedback");
  const topIssues = (namedIssues.length ? namedIssues : issueEntries).slice(0, 8);
  const complaints = namedIssues.slice(0, 6);
  const risks = buildRisks(rows);
  const important = [...rows].sort(compareImpact).slice(0, 6);
  const insights = buildInsights(rows, { total, sentiment, category, priority, owner, issue, risks });
  const recommendations = buildRecommendations(rows, { category, priority, issue, owner });

  return {
    total,
    sentiment,
    category,
    priority,
    owner,
    issue,
    words,
    topIssues,
    complaints,
    risks,
    important,
    insights,
    recommendations
  };
}

function countBy(rows, key) {
  return rows.reduce((acc, row) => {
    acc[row[key]] = (acc[row[key]] || 0) + 1;
    return acc;
  }, {});
}

function sortEntries(object) {
  return Object.entries(object).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function percent(value, total = (state.analytics ? state.analytics.total : state.rows.length)) {
  return total ? `${Math.round((value / total) * 100)}%` : "0%";
}

function impactScore(row) {
  const priorityScore = { Critical: 4, High: 3, Medium: 2, Low: 1 }[row.priority] || 1;
  const sentimentScore = row.sentiment === "Negative" ? 2 : row.sentiment === "Neutral" ? 1 : 0;
  return priorityScore * 10 + sentimentScore * 5 + (row.confidence === "High" ? 3 : 0);
}

function compareImpact(a, b) {
  return impactScore(b) - impactScore(a);
}

function keywordAnalysis(rows) {
  const keywords = [
    "event",
    "กาชา",
    "pity",
    "บอส",
    "one shot",
    "stamina",
    "รางวัล",
    "ทอง",
    "เติมเงิน",
    "แพ็กเกจ",
    "UI",
    "อ่านยาก",
    "inventory",
    "auto battle",
    "guild",
    "replay",
    "PvP",
    "meta",
    "แลค",
    "โหลด",
    "เสียงพากย์",
    "subtitle",
    "Tutorial",
    "skin"
  ];
  const text = rows.map((row) => row.player_feedback).join(" ").toLowerCase();
  return keywords
    .map((keyword) => [keyword, countOccurrences(text, keyword.toLowerCase())])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 22);
}

function countOccurrences(text, keyword) {
  if (!keyword) return 0;
  return text.split(keyword).length - 1;
}

function buildRisks(rows) {
  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.category]) acc[row.category] = { total: 0, critical: 0, high: 0, negative: 0 };
    acc[row.category].total += 1;
    if (row.priority === "Critical") acc[row.category].critical += 1;
    if (row.priority === "High") acc[row.category].high += 1;
    if (row.sentiment === "Negative") acc[row.category].negative += 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([category, data]) => ({
      category,
      score: data.critical * 4 + data.high * 2 + data.negative,
      ...data
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function buildInsights(rows, analytics) {
  const negativeCount = analytics.sentiment.Negative || 0;
  const positiveCount = analytics.sentiment.Positive || 0;
  const topCategory = sortEntries(analytics.category)[0] || ["Other", 0];
  const topOwner = sortEntries(analytics.owner)[0] || ["Product Manager", 0];
  const critical = rows.filter((row) => row.priority === "Critical").length;
  const f2pNegative = rows.filter((row) => row.player_segment === "F2P" && row.sentiment === "Negative").length;
  const spenderNegative = rows.filter((row) => ["Light Spender", "Mid Spender", "Whale"].includes(row.player_segment) && row.sentiment === "Negative").length;

  return {
    en: [
      {
        title: "Main Pattern",
        text: `${percent(negativeCount, analytics.total)} of feedback is negative, while ${percent(positiveCount, analytics.total)} is positive. Player pressure is concentrated around fixable friction rather than lack of content interest.`
      },
      {
        title: "Primary Problem Area",
        text: `${topCategory[0]} is the largest category at ${percent(topCategory[1], analytics.total)}. This should anchor the next planning review because it has the broadest player impact.`
      },
      {
        title: "Risk Queue",
        text: `${critical} items were classified as Critical. These should move into QA, engineering, LiveOps, or design triage before the next patch window.`
      },
      {
        title: "Team Ownership Pattern",
        text: `${topOwner[0]} owns the highest share of feedback at ${percent(topOwner[1], analytics.total)}. Cross-team dependency checks are needed before committing fixes.`
      },
      {
        title: "Commercial Watchout",
        text: `${spenderNegative} negative comments came from spender segments compared with ${f2pNegative} from F2P players. Monetization trust and fairness perception should be watched closely.`
      }
    ],
    th: [
      {
        title: "Pattern หลัก",
        text: `Feedback เชิงลบมี ${percent(negativeCount, analytics.total)} ส่วนเชิงบวกมี ${percent(positiveCount, analytics.total)} แปลว่าผู้เล่นยังสนใจเกม แต่แรงกดดันหลักมาจาก friction ที่แก้ได้ เช่น balance, reward, UI หรือ performance.`
      },
      {
        title: "ปัญหาหลัก",
        text: `หมวดที่เจอมากที่สุดคือ ${topCategory[0]} คิดเป็น ${percent(topCategory[1], analytics.total)} ควรใช้เป็นหัวข้อหลักในการวางแผน sprint หรือ patch ถัดไป.`
      },
      {
        title: "Risk Queue",
        text: `มีรายการ Critical ${critical} รายการ ควรส่งเข้า triage ของ QA, Engineering, LiveOps หรือ Game Design ก่อนรอบปล่อย patch ถัดไป.`
      },
      {
        title: "Pattern ด้าน Owner",
        text: `ทีมที่ถูก assign มากที่สุดคือ ${topOwner[0]} (${percent(topOwner[1], analytics.total)}) จึงควรเช็ก dependency ระหว่างทีมก่อน commit timeline.`
      },
      {
        title: "ความเสี่ยงด้านรายได้",
        text: `มี feedback เชิงลบจากกลุ่มผู้เล่นที่จ่ายเงิน ${spenderNegative} รายการ เทียบกับ F2P ${f2pNegative} รายการ ควรจับตาความรู้สึกเรื่องความคุ้มค่า ความแฟร์ และ gacha/monetization.`
      }
    ]
  };
}

function buildRecommendations(rows, analytics) {
  const topIssue = sortEntries(analytics.issue).filter(([key]) => key !== "General feedback")[0] || ["General feedback", 0];
  const topRisk = buildRisks(rows)[0];
  return {
    en: [
      {
        title: "Prioritize the highest recurring pain point",
        text: `${topIssue[0]} appears in ${topIssue[1]} entries. Assign an owner, confirm repro or design intent, and publish a visible response plan.`
      },
      {
        title: "Protect retention-critical cohorts",
        text: "New, returning, and guild-leading players repeatedly mention progression, event, and balance friction. Review first-week pacing and event economy together."
      },
      {
        title: "Run a patch-readiness triage",
        text: `${topRisk ? topRisk.category : "Critical"} risk carries the highest impact score. Validate fixes with QA and customer support before release notes are finalized.`
      },
      {
        title: "Close the feedback loop",
        text: "Convert common complaints into community-facing updates so players see that feedback has a clear path into production decisions."
      }
    ],
    th: [
      {
        title: "จัดลำดับปัญหาที่เกิดซ้ำมากที่สุดก่อน",
        text: `${topIssue[0]} พบ ${topIssue[1]} รายการ ควร assign owner, ยืนยันสาเหตุจริง และทำแผน response ที่ผู้เล่นมองเห็นได้.`
      },
      {
        title: "ปกป้องกลุ่มผู้เล่นที่กระทบ retention",
        text: "ผู้เล่นใหม่ ผู้เล่นกลับมาเล่น และ guild leader พูดถึง progression, event และ balance friction ซ้ำหลายครั้ง ควร review pacing ช่วงต้นเกมและ event economy ร่วมกัน."
      },
      {
        title: "ทำ triage ก่อน patch ถัดไป",
        text: `${topRisk ? topRisk.category : "Critical"} เป็น risk area ที่คะแนนสูงสุด ควร validate กับ QA และ Customer Support ก่อนสรุป release notes.`
      },
      {
        title: "ปิด feedback loop กับผู้เล่น",
        text: "เปลี่ยน complaint ที่เจอบ่อยเป็น community update เพื่อให้ผู้เล่นเห็นว่า feedback ถูกส่งต่อไปสู่ decision และ patch จริง."
      }
    ]
  };
}

function renderAll() {
  renderDashboard();
  renderTable();
  renderReport();
  renderWorkflow();
  renderValidation();
}

function renderDashboard() {
  const analytics = state.analytics;
  applyLanguage();
  renderKpis(analytics);
  drawDonut("sentimentChart", analytics.sentiment, [COLORS.Positive, COLORS.Neutral, COLORS.Negative]);
  renderLegend("sentimentLegend", analytics.sentiment, { Positive: COLORS.Positive, Neutral: COLORS.Neutral, Negative: COLORS.Red || COLORS.Negative });
  drawBarsChart("priorityChart", analytics.priority, PRIORITIES, [COLORS.Critical, COLORS.High, COLORS.Medium, COLORS.Low]);
  renderBars("categoryBars", analytics.category, CATEGORIES);
  renderBars("ownerBars", analytics.owner, OWNERS);
  renderIssueList("topIssues", analytics.topIssues);
  renderIssueList("complaints", analytics.complaints);
  renderWordCloud(analytics.words);
  renderRisks(analytics.risks);
  renderInsights(analytics.insights);
  renderImportant(analytics.important);
  renderRecommendations(analytics.recommendations);
  renderHeatmap(state.rows);
  document.getElementById("sentimentTotal").textContent = `${analytics.total} ${I18N[state.lang].dashboardText.analyzed}`;
}

function renderKpis(analytics) {
  const highRisk = (analytics.priority.Critical || 0) + (analytics.priority.High || 0);
  const topCategory = sortEntries(analytics.category)[0] || ["Other", 0];
  const topIssue = analytics.topIssues[0] || ["General feedback", 0];
  const copy = I18N[state.lang].kpi;
  document.getElementById("kpiGrid").innerHTML = [
    kpi(copy.total[0], analytics.total, copy.total[1]),
    kpi(copy.negative[0], percent(analytics.sentiment.Negative || 0), `${analytics.sentiment.Negative || 0} ${copy.negative[1]}`),
    kpi(copy.risk[0], highRisk, copy.risk[1]),
    kpi(copy.topCategory[0], topCategory[0], `${topCategory[1]} ${copy.topCategory[1]}, ${percent(topCategory[1])}`),
    kpi(copy.mainIssue[0], topIssue[0], `${topIssue[1]} ${copy.mainIssue[1]}`),
    kpi(copy.positive[0], analytics.sentiment.Positive || 0, `${percent(analytics.sentiment.Positive || 0)} ${copy.positive[1]}`),
    kpi(copy.owners[0], Object.keys(analytics.owner).length, copy.owners[1]),
    kpi(copy.critical[0], analytics.priority.Critical || 0, copy.critical[1])
  ].join("");
}

function kpi(label, value, detail) {
  return `<div class="kpi-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong><small>${escapeHtml(detail)}</small></div>`;
}

function drawDonut(id, data, colors) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  const entries = SENTIMENTS.map((key) => [key, data[key] || 0]);
  const total = entries.reduce((sum, [, value]) => sum + value, 0) || 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let start = -Math.PI / 2;
  entries.forEach(([, value], index) => {
    const end = start + (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(160, 130);
    ctx.arc(160, 130, 92, start, end);
    ctx.closePath();
    ctx.fillStyle = colors[index];
    ctx.fill();
    start = end;
  });
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(160, 130, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#edf3ff";
  ctx.textAlign = "center";
  ctx.font = "700 28px Inter, sans-serif";
  ctx.fillText(String(total), 160, 128);
  ctx.fillStyle = "#93a0b6";
  ctx.font = "12px Inter, sans-serif";
  ctx.fillText("feedback", 160, 150);
}

function drawBarsChart(id, data, keys, colors) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const max = Math.max(...keys.map((key) => data[key] || 0), 1);
  ctx.clearRect(0, 0, width, height);
  keys.forEach((key, index) => {
    const value = data[key] || 0;
    const x = 34 + index * 78;
    const barHeight = Math.round((value / max) * 150);
    const y = 190 - barHeight;
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(x, 40, 46, 150);
    ctx.fillStyle = colors[index];
    ctx.fillRect(x, y, 46, barHeight);
    ctx.fillStyle = "#edf3ff";
    ctx.textAlign = "center";
    ctx.font = "700 16px Inter, sans-serif";
    ctx.fillText(String(value), x + 23, y - 8);
    ctx.fillStyle = "#93a0b6";
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText(key, x + 23, 222);
  });
}

function renderLegend(id, data, colors) {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0) || 1;
  document.getElementById(id).innerHTML = SENTIMENTS.map((key) => {
    const value = data[key] || 0;
    return `<div class="legend-item"><span><i class="dot" style="display:inline-block;background:${colors[key]}"></i> ${key}</span><strong>${value} (${percent(value, total)})</strong></div>`;
  }).join("");
}

function renderBars(id, data, orderedKeys) {
  const max = Math.max(...Object.values(data), 1);
  const entries = orderedKeys
    .map((key) => [key, data[key] || 0])
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);
  document.getElementById(id).innerHTML = entries.map(([key, value]) => `
    <div class="bar-row">
      <div class="bar-meta"><strong>${escapeHtml(key)}</strong><span>${value} / ${percent(value)}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(5, (value / max) * 100)}%"></div></div>
    </div>
  `).join("");
}

function renderIssueList(id, entries) {
  const copy = I18N[state.lang].dashboardText;
  document.getElementById(id).innerHTML = entries.map(([name, count]) => `
    <div class="issue-item">
      <strong>${escapeHtml(name)}</strong>
      <p>${count} ${copy.mentions}, ${percent(count)} ${copy.totalFeedback}.</p>
    </div>
  `).join("");
}

function renderWordCloud(words) {
  const max = Math.max(...words.map(([, count]) => count), 1);
  document.getElementById("wordCloud").innerHTML = words.map(([word, count]) => {
    const size = 12 + Math.round((count / max) * 20);
    return `<span class="word" style="font-size:${size}px">${escapeHtml(word)} <strong>${count}</strong></span>`;
  }).join("");
}

function renderRisks(risks) {
  const copy = I18N[state.lang].dashboardText;
  document.getElementById("riskAreas").innerHTML = risks.map((risk) => `
    <div class="risk-item">
      <strong>${escapeHtml(risk.category)} ${copy.riskScore} ${risk.score}</strong>
      <p>${risk.total} ${copy.total}, ${risk.critical} ${copy.critical}, ${risk.high} ${copy.high}, ${risk.negative} ${copy.negative}.</p>
    </div>
  `).join("");
}

function renderInsights(insights) {
  const items = localizedList(insights);
  document.getElementById("keyInsights").innerHTML = items.map((insight) => `
    <div class="insight-card">
      <strong>${escapeHtml(insight.title)}</strong>
      <p>${escapeHtml(insight.text)}</p>
    </div>
  `).join("");
}

function renderImportant(rows) {
  document.getElementById("importantFeedback").innerHTML = rows.map((row) => `
    <div class="quote-item">
      <strong>${escapeHtml(row.feedback_id)} · ${escapeHtml(row.priority)} · ${escapeHtml(row.category)}</strong>
      <p>${escapeHtml(row.player_feedback)}</p>
    </div>
  `).join("");
}

function renderRecommendations(items) {
  document.getElementById("recommendations").innerHTML = localizedList(items).map((item) => `
    <div class="recommendation">
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(item.text)}</p>
    </div>
  `).join("");
}

function localizedList(value) {
  if (Array.isArray(value)) return value;
  return value[state.lang] || value.en || [];
}

function applyLanguage() {
  const copy = I18N[state.lang];
  document.documentElement.lang = state.lang === "th" ? "th" : "en";
  document.querySelectorAll(".tab").forEach((button) => {
    button.textContent = copy.tabs[button.dataset.tab] || button.textContent;
  });
  document.getElementById("pageTitle").textContent = copy.pageTitles[state.currentTab];
  document.querySelector(".topbar .eyebrow").textContent = copy.brand.eyebrow;
  document.querySelector(".sidebar-card span").textContent = copy.brand.auto;
  document.getElementById("refreshBtn").textContent = copy.buttons.refresh;
  document.getElementById("langToggleBtn").textContent = copy.buttons.lang;
  document.getElementById("exportCsvBtn").textContent = copy.buttons.csv;
  document.getElementById("exportXlsBtn").textContent = copy.buttons.excel;
  document.getElementById("prevPage").textContent = copy.buttons.previous;
  document.getElementById("nextPage").textContent = copy.buttons.next;
  document.getElementById("searchInput").placeholder = copy.table.search;
  document.querySelectorAll("#dashboard .panel-heading h3").forEach((heading, index) => {
    heading.textContent = copy.panels[index] || heading.textContent;
  });
}

function renderHeatmap(rows) {
  const categories = sortEntries(countBy(rows, "category")).slice(0, 6).map(([key]) => key);
  const header = ["Category", ...PRIORITIES].map((label) => `<div class="heat-cell"><strong>${label}</strong></div>`).join("");
  const body = categories.map((category) => {
    const cells = PRIORITIES.map((priority) => {
      const count = rows.filter((row) => row.category === category && row.priority === priority).length;
      const cls = count >= 8 ? "heat-hot" : count >= 5 ? "heat-warm" : count >= 2 ? "heat-mid" : "";
      return `<div class="heat-cell ${cls}">${count}</div>`;
    }).join("");
    return `<div class="heat-cell"><strong>${escapeHtml(category)}</strong></div>${cells}`;
  }).join("");
  document.getElementById("heatmap").innerHTML = header + body;
}

function wireNavigation() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentTab = button.dataset.tab;
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
      document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active-view", view.id === state.currentTab));
      applyLanguage();
    });
  });
  document.getElementById("refreshBtn").addEventListener("click", loadData);
  document.getElementById("langToggleBtn").addEventListener("click", () => {
    state.lang = state.lang === "en" ? "th" : "en";
    applyLanguage();
    populateFilters();
    renderAll();
  });
}

function wireTableControls() {
  ["searchInput", "sentimentFilter", "categoryFilter", "priorityFilter"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      state.page = 1;
      applyFilters();
      renderTable();
    });
  });
  document.getElementById("prevPage").addEventListener("click", () => {
    if (state.page > 1) {
      state.page -= 1;
      renderTable();
    }
  });
  document.getElementById("nextPage").addEventListener("click", () => {
    const pages = Math.max(1, Math.ceil(state.filteredRows.length / state.pageSize));
    if (state.page < pages) {
      state.page += 1;
      renderTable();
    }
  });
}

function populateFilters() {
  const copy = I18N[state.lang].table;
  setOptions("sentimentFilter", [copy.sentiments, ...SENTIMENTS]);
  setOptions("categoryFilter", [copy.categories, ...CATEGORIES]);
  setOptions("priorityFilter", [copy.priorities, ...PRIORITIES]);
}

function setOptions(id, values) {
  const select = document.getElementById(id);
  const current = select.value;
  select.innerHTML = values.map((value, index) => `<option value="${index === 0 ? "" : value}">${value}</option>`).join("");
  select.value = current;
}

function applyFilters() {
  const search = document.getElementById("searchInput").value.trim().toLowerCase();
  const sentiment = document.getElementById("sentimentFilter").value;
  const category = document.getElementById("categoryFilter").value;
  const priority = document.getElementById("priorityFilter").value;

  state.filteredRows = state.rows.filter((row) => {
    const haystack = columns.map(([key]) => row[key]).join(" ").toLowerCase();
    return (!search || haystack.includes(search)) &&
      (!sentiment || row.sentiment === sentiment) &&
      (!category || row.category === category) &&
      (!priority || row.priority === priority);
  });
  sortRows();
}

function sortRows() {
  const priorityRank = { Critical: 1, High: 2, Medium: 3, Low: 4 };
  const direction = state.sortDir === "asc" ? 1 : -1;
  state.filteredRows.sort((a, b) => {
    let left = a[state.sortKey] || "";
    let right = b[state.sortKey] || "";
    if (state.sortKey === "priority") {
      left = priorityRank[left] || 9;
      right = priorityRank[right] || 9;
    }
    if (left < right) return -1 * direction;
    if (left > right) return 1 * direction;
    return a.feedback_id.localeCompare(b.feedback_id);
  });
}

function renderTable() {
  renderTableHead();
  const start = (state.page - 1) * state.pageSize;
  const rows = state.filteredRows.slice(start, start + state.pageSize);
  document.getElementById("tableBody").innerHTML = rows.map((row) => `
    <tr>
      ${columns.map(([key]) => renderCell(key, row[key])).join("")}
    </tr>
  `).join("");
  const totalPages = Math.max(1, Math.ceil(state.filteredRows.length / state.pageSize));
  const copy = I18N[state.lang].table;
  document.getElementById("tableInfo").textContent = `${copy.showing} ${start + 1}-${Math.min(start + state.pageSize, state.filteredRows.length)} ${copy.of} ${state.filteredRows.length} ${copy.rows} · ${copy.page} ${state.page} ${copy.of} ${totalPages}`;
  document.getElementById("prevPage").disabled = state.page <= 1;
  document.getElementById("nextPage").disabled = state.page >= totalPages;
}

function renderTableHead() {
  document.getElementById("tableHead").innerHTML = columns.map(([key, label]) => {
    const marker = state.sortKey === key ? (state.sortDir === "asc" ? " ▲" : " ▼") : "";
    return `<th><button type="button" data-sort="${key}">${escapeHtml((I18N[state.lang].columns[key] || label) + marker)}</button></th>`;
  }).join("");
  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.sort;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDir = "asc";
      }
      sortRows();
      renderTable();
    });
  });
}

function renderCell(key, value) {
  if (key === "player_feedback") return `<td class="feedback-cell">${escapeHtml(value)}</td>`;
  if (key === "sentiment") return `<td><span class="pill sentiment-${value.toLowerCase()}">${escapeHtml(value)}</span></td>`;
  if (key === "priority") return `<td><span class="pill priority-${value.toLowerCase()}">${escapeHtml(value)}</span></td>`;
  return `<td>${escapeHtml(value)}</td>`;
}

function renderReport() {
  const analytics = state.analytics;
  const topIssues = analytics.topIssues.filter(([name]) => name !== "General feedback").slice(0, 5);
  const topOwner = sortEntries(analytics.owner).slice(0, 6);
  const important = analytics.important.slice(0, 4);
  const negative = analytics.sentiment.Negative || 0;
  const positive = analytics.sentiment.Positive || 0;
  const neutral = analytics.sentiment.Neutral || 0;
  const recs = localizedList(analytics.recommendations);
  const insights = localizedList(analytics.insights);

  if (state.lang === "th") {
    document.getElementById("reportContent").innerHTML = `
      ${reportSection("สรุปผู้บริหาร", `<p>ระบบวิเคราะห์ feedback ผู้เล่นทั้งหมด ${analytics.total} รายการ และแปลงเป็นข้อมูลเชิงโครงสร้าง ได้แก่ sentiment, category, priority, owner, summary และ note. ปัญหาที่ควรโฟกัสมากที่สุดคือ ${topIssues.slice(0, 3).map(([name]) => name).join(", ") || "feedback ทั่วไป"} โดย feedback เชิงลบอยู่ที่ ${percent(negative)} จึงควรทำ triage ในประเด็น design, economy, technical stability และ communication.</p>`)}
      ${reportSection("ภาพรวม Feedback", `<ul class="report-list">
        <li>จำนวน feedback ทั้งหมด: <strong>${analytics.total}</strong></li>
        <li>Critical + High priority: <strong>${(analytics.priority.Critical || 0) + (analytics.priority.High || 0)}</strong></li>
        <li>Category ที่พบมากที่สุด: <strong>${escapeHtml((sortEntries(analytics.category)[0] || ["Other"])[0])}</strong></li>
        <li>ทีมที่ถูก assign มากที่สุด: <strong>${escapeHtml((sortEntries(analytics.owner)[0] || ["Product Manager"])[0])}</strong></li>
      </ul>`)}
      ${reportSection("Top 5 Issues", list(topIssues.map(([name, count]) => `<strong>${escapeHtml(name)}</strong>: พบ ${count} รายการ (${percent(count)} ของทั้งหมด).`)))}
      ${reportSection("Sentiment Summary", `<p>Positive: <strong>${positive}</strong> (${percent(positive)}), Neutral: <strong>${neutral}</strong> (${percent(neutral)}), Negative: <strong>${negative}</strong> (${percent(negative)}). Pattern รวมคือผู้เล่นยังเห็นข้อดีของเกม แต่เสียง complaint ดังและเร่งด่วนกว่า โดยเฉพาะเรื่อง reward, balance, UI และ technical friction.</p>`)}
      ${reportSection("สิ่งที่ควรทำต่อ", list(recs.map((item) => `<strong>${escapeHtml(item.title)}</strong>: ${escapeHtml(item.text)}`)))}
      ${reportSection("Team Ownership", list(topOwner.map(([owner, count]) => `<strong>${escapeHtml(owner)}</strong>: ${count} รายการ (${percent(count)} ของ queue).`)))}
      ${reportSection("Risks / Things to Watch", list(analytics.risks.map((risk) => `<strong>${escapeHtml(risk.category)}</strong>: risk score ${risk.score}, มี Critical ${risk.critical} และ High ${risk.high} รายการ.`)))}
      ${reportSection("Important Example Feedback", list(important.map((row) => `<strong>${escapeHtml(row.feedback_id)} · ${escapeHtml(row.priority)} · ${escapeHtml(row.category)}</strong><br>${escapeHtml(row.player_feedback)}`)))}
      ${reportSection("Strategic AI Insights", list(insights.map((insight) => `<strong>${escapeHtml(insight.title)}</strong>: ${escapeHtml(insight.text)}`)))}
      ${reportSection("Suggested Next Steps", list([
        "ทำ weekly cross-functional feedback review โดยเริ่มจาก Critical และ High priority.",
        "เปลี่ยน top issue clusters เป็น action items ที่มี owner และ metric ก่อน/หลังแก้.",
        "สื่อสารกับผู้เล่นเรื่อง gacha clarity, event rewards, balance และ technical stability.",
        "รัน dashboard ซ้ำหลัง patch เพื่อเทียบ movement ของ sentiment และ category."
      ]))}
    `;
    return;
  }

  document.getElementById("reportContent").innerHTML = `
    ${reportSection("Executive Summary", `<p>${analytics.total} player feedback entries were analyzed and converted into structured sentiment, category, priority, ownership, and insight data. The strongest pressure points are ${topIssues.slice(0, 3).map(([name]) => name).join(", ") || "general product feedback"}. Negative sentiment represents ${percent(negative)}, requiring focused triage across design, economy, and technical teams.</p>`)}
    ${reportSection("Feedback Overview", `<ul class="report-list">
      <li>Total feedback: <strong>${analytics.total}</strong></li>
      <li>Critical and high priority: <strong>${(analytics.priority.Critical || 0) + (analytics.priority.High || 0)}</strong></li>
      <li>Largest category: <strong>${escapeHtml((sortEntries(analytics.category)[0] || ["Other"])[0])}</strong></li>
      <li>Most assigned owner: <strong>${escapeHtml((sortEntries(analytics.owner)[0] || ["Product Manager"])[0])}</strong></li>
    </ul>`)}
    ${reportSection("Top 5 Issues", list(topIssues.map(([name, count]) => `<strong>${escapeHtml(name)}</strong>: ${count} mentions, ${percent(count)} of total feedback.`)))}
    ${reportSection("Sentiment Summary", `<p>Positive: <strong>${positive}</strong> (${percent(positive)}). Neutral: <strong>${neutral}</strong> (${percent(neutral)}). Negative: <strong>${negative}</strong> (${percent(negative)}). The shape of feedback suggests players still recognize strong content and presentation wins, but unresolved friction is louder and more urgent.</p>`)}
    ${reportSection("Recommended Actions", list(recs.map((item) => `<strong>${escapeHtml(item.title)}</strong>: ${escapeHtml(item.text)}`)))}
    ${reportSection("Team Ownership", list(topOwner.map(([owner, count]) => `<strong>${escapeHtml(owner)}</strong>: ${count} items, ${percent(count)} of the queue.`)))}
    ${reportSection("Risks / Things to Watch", list(analytics.risks.map((risk) => `<strong>${escapeHtml(risk.category)}</strong>: impact score ${risk.score}, with ${risk.critical} critical and ${risk.high} high-priority items.`)))}
    ${reportSection("Important Example Feedback", list(important.map((row) => `<strong>${escapeHtml(row.feedback_id)} · ${escapeHtml(row.priority)} · ${escapeHtml(row.category)}</strong><br>${escapeHtml(row.player_feedback)}`)))}
    ${reportSection("Strategic AI Insights", list(insights.map((insight) => `<strong>${escapeHtml(insight.title)}</strong>: ${escapeHtml(insight.text)}`)))}
    ${reportSection("Suggested Next Steps", list([
      "Create a weekly cross-functional feedback review using the Critical and High priority queues.",
      "Turn the top issue clusters into owner-backed action items with measurable before/after metrics.",
      "Publish player-facing acknowledgements for recurring complaints around gacha clarity, event rewards, balance, and technical stability.",
      "Re-run this dashboard after each patch to compare sentiment and category movement."
    ]))}
  `;
}

function renderWorkflow() {
  const analytics = state.analytics;
  const categoryCount = Object.keys(analytics.category).length;
  const ownerCount = Object.keys(analytics.owner).length;
  const topIssue = analytics.topIssues.find(([name]) => name !== "General feedback") || analytics.topIssues[0] || ["General feedback", 0];
  const highRisk = (analytics.priority.Critical || 0) + (analytics.priority.High || 0);

  if (state.lang === "th") {
    document.getElementById("workflowContent").innerHTML = `
      ${reportSection("Workflow Explanation", `<p><strong>Data → AI → Clean → Insight → Report</strong> คือ pipeline ที่เว็บใช้จริงตั้งแต่รับ raw feedback จนกลายเป็น dashboard และ executive report. ระบบนี้เป็น rule-based AI heuristic ที่รันใน browser จึงอธิบายได้ว่าแต่ละผลลัพธ์เกิดจาก rule, keyword, metadata และ impact score ใด.</p>`)}
      ${reportSection("Step 1 — Data", `<ul class="report-list">
        <li><strong>Input:</strong> feedback จาก <strong>feedback-data.js</strong>; ถ้าไม่มีจะ fallback ไป <strong>feedback.json</strong> และ <strong>feedback.csv</strong>.</li>
        <li><strong>What happens:</strong> ระบบโหลดข้อมูล <strong>${analytics.total}</strong> rows และเก็บ field สำคัญ เช่น feedback text, segment, platform, version, source, game area hint.</li>
        <li><strong>Output:</strong> raw feedback rows ที่พร้อมส่งเข้า AI classification layer.</li>
      </ul>`)}
      ${reportSection("Step 2 — AI", `<ul class="report-list">
        <li><strong>Input:</strong> player_feedback + metadata ของแต่ละ row.</li>
        <li><strong>What happens:</strong> วิเคราะห์ sentiment, category, priority, issue cluster, suggested owner, confidence และ note ด้วย keyword/rule scoring.</li>
        <li><strong>Output:</strong> structured fields ได้แก่ <strong>feedback_id, player_feedback, sentiment, category, priority, ai_summary, suggested_owner, confidence, note</strong>.</li>
        <li><strong>Current coverage:</strong> พบ category <strong>${categoryCount}</strong> กลุ่ม และ owner team <strong>${ownerCount}</strong> ทีม.</li>
      </ul>`)}
      ${reportSection("Step 3 — Clean", `<ul class="report-list">
        <li><strong>Input:</strong> AI output ที่ยังมีข้อความสุภาพ/คำเกริ่นจาก raw feedback.</li>
        <li><strong>What happens:</strong> ตัด lead-in เช่น “อยากฝากทีมงานว่า”, “ส่วนตัวคิดว่า”, “เจอบ่อยมากว่า” และตัด sign-off เช่น “ขอบคุณครับ/ค่ะ”.</li>
        <li><strong>Output:</strong> summary ที่อ่านง่าย พร้อม normalized labels สำหรับ filter, sort, chart และ export.</li>
      </ul>`)}
      ${reportSection("Step 4 — Insight", `<ul class="report-list">
        <li><strong>Input:</strong> clean structured analytics rows.</li>
        <li><strong>What happens:</strong> aggregate ตาม sentiment, category, priority, owner, issue cluster และ keyword.</li>
        <li><strong>Output:</strong> top issue หลักคือ <strong>${escapeHtml(topIssue[0])}</strong> (${topIssue[1]} mentions) และ risk queue <strong>${highRisk}</strong> rows จาก Critical + High.</li>
      </ul>`)}
      ${reportSection("Step 5 — Report", `<ul class="report-list">
        <li><strong>Input:</strong> aggregated insights, risks, examples และ recommendation.</li>
        <li><strong>What happens:</strong> สร้าง executive summary, top issues, sentiment summary, owner distribution, risks, important examples และ next steps.</li>
        <li><strong>Output:</strong> Insight Report ที่ refresh ตาม dataset ล่าสุด และ export queue ได้จาก table filter.</li>
      </ul>`)}
      ${reportSection("Workflow Map", `<div class="flow-chain">
        <div><strong>Data</strong><span>feedback-data.js / JSON / CSV</span></div>
        <div><strong>AI</strong><span>classify, score, cluster</span></div>
        <div><strong>Clean</strong><span>normalize label และ summary</span></div>
        <div><strong>Insight</strong><span>chart, risk, issue, owner</span></div>
        <div><strong>Report</strong><span>สรุปผู้บริหารและ action</span></div>
      </div>`)}
    `;
    return;
  }

  document.getElementById("workflowContent").innerHTML = `
    ${reportSection("Workflow Explanation", `<p><strong>Data → AI → Clean → Insight → Report</strong> is the actual pipeline used by this website, from raw player feedback to dashboard metrics and executive reporting. The current AI layer is a transparent rule-based heuristic system that can be traced back to keywords, player metadata, and impact scoring.</p>`)}
    ${reportSection("Step 1 — Data", `<ul class="report-list">
      <li><strong>Input:</strong> feedback from <strong>feedback-data.js</strong>; if unavailable, the app falls back to <strong>feedback.json</strong> and then <strong>feedback.csv</strong>.</li>
      <li><strong>What happens:</strong> the app loads <strong>${analytics.total}</strong> rows and keeps useful metadata such as segment, platform, version, source, and game area hint.</li>
      <li><strong>Output:</strong> raw feedback rows ready for AI classification.</li>
    </ul>`)}
    ${reportSection("Step 2 — AI", `<ul class="report-list">
      <li><strong>Input:</strong> player_feedback plus row metadata.</li>
      <li><strong>What happens:</strong> the app classifies sentiment, category, priority, issue cluster, suggested owner, confidence, and notes using keyword/rule scoring.</li>
      <li><strong>Output:</strong> <strong>feedback_id, player_feedback, sentiment, category, priority, ai_summary, suggested_owner, confidence, note</strong>.</li>
      <li><strong>Current coverage:</strong> <strong>${categoryCount}</strong> detected categories and <strong>${ownerCount}</strong> suggested owner teams.</li>
    </ul>`)}
    ${reportSection("Step 3 — Clean", `<ul class="report-list">
      <li><strong>Input:</strong> AI output that may still contain polite lead-ins and sign-offs from raw text.</li>
      <li><strong>What happens:</strong> common Thai lead-ins and closings are stripped so summaries become shorter and easier to scan.</li>
      <li><strong>Output:</strong> clean summaries and normalized labels for filtering, sorting, charting, and export.</li>
    </ul>`)}
    ${reportSection("Step 4 — Insight", `<ul class="report-list">
      <li><strong>Input:</strong> clean structured analytics rows.</li>
      <li><strong>What happens:</strong> rows are aggregated by sentiment, category, priority, owner, issue cluster, and keywords.</li>
      <li><strong>Output:</strong> the leading recurring issue is <strong>${escapeHtml(topIssue[0])}</strong> (${topIssue[1]} mentions), with <strong>${highRisk}</strong> Critical + High rows forming the risk queue.</li>
    </ul>`)}
    ${reportSection("Step 5 — Report", `<ul class="report-list">
      <li><strong>Input:</strong> aggregated insights, risks, examples, and recommendations.</li>
      <li><strong>What happens:</strong> the app creates executive summary, top issues, sentiment summary, owner distribution, risks, important examples, and next steps.</li>
      <li><strong>Output:</strong> a refreshed Insight Report and exportable filtered review queue.</li>
    </ul>`)}
    ${reportSection("Workflow Map", `<div class="flow-chain">
      <div><strong>Data</strong><span>feedback-data.js / JSON / CSV</span></div>
      <div><strong>AI</strong><span>classify, score, cluster</span></div>
      <div><strong>Clean</strong><span>normalize labels and summaries</span></div>
      <div><strong>Insight</strong><span>charts, risks, issues, owners</span></div>
      <div><strong>Report</strong><span>executive narrative and actions</span></div>
    </div>`)}
  `;
}

function renderValidation() {
  const sample = buildReviewSample(state.rows, 12);
  const lowConfidence = state.rows.filter((row) => row.confidence === "Low").length;
  const mixedSignals = state.rows.filter((row) => {
    const text = row.player_feedback.toLowerCase();
    return countMatches(text, POSITIVE_WORDS) > 0 && countMatches(text, NEGATIVE_WORDS) > 0;
  }).length;
  const generalIssue = state.rows.filter((row) => row.issue === "General feedback").length;
  const possibleCategoryConflicts = state.rows.filter((row) => {
    const text = row.player_feedback.toLowerCase();
    return text.includes("event") && ["Monetization", "Progression", "Balance"].includes(row.category);
  }).length;
  const likelyMissed = buildLikelyMissedRows(state.rows);

  if (state.lang === "th") {
    document.getElementById("validationContent").innerHTML = `
      ${reportSection("Review Note — Validation / Human Review", `<p>บันทึกนี้ใช้สำหรับสุ่มตรวจผล AI และระบุข้อจำกัดของวิธีที่ใช้วิเคราะห์ feedback. เป้าหมายคือช่วยให้ reviewer เห็นทั้งผลที่น่าเชื่อถือและจุดที่ AI อาจตีความผิด เพื่อเอาไปแก้ rule หรือใช้เป็น human correction ต่อไป.</p>`)}
      ${reportSection("1. Sample Audit", `<p>ระบบสุ่มตัวอย่าง ${sample.length} rows โดยดึง Critical และ mixed-signal rows เข้ามาก่อน เพราะเป็นกลุ่มที่เสี่ยงต่อการตัดสินผิดมากกว่าปกติ.</p><div class="review-grid">
        ${sample.map((row) => `
          <div class="review-card">
            <strong>${escapeHtml(row.feedback_id)} · ${escapeHtml(row.sentiment)} · ${escapeHtml(row.category)} · ${escapeHtml(row.priority)}</strong>
            <p>${escapeHtml(row.player_feedback)}</p>
            <small>Review note: ตรวจ sentiment tone, category fit, priority severity และ owner ${escapeHtml(row.suggested_owner)} ว่าเหมาะสมหรือไม่.</small>
          </div>
        `).join("")}
      </div>`)}
      ${reportSection("2. AI Likely Missed / Needs Human Check", `<ul class="report-list">
        ${likelyMissed.map((item) => `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.reason)} <br><small>${escapeHtml(item.example)}</small></li>`).join("")}
      </ul>`)}
      ${reportSection("3. Method Limitations", `<ul class="report-list">
        <li><strong>Semantic limitation:</strong> ระบบใช้ keyword/rule heuristic ไม่ใช่ language model เต็มรูปแบบ จึงอาจพลาด sarcasm, nuance หรือภาษาไทยที่พูดอ้อม.</li>
        <li><strong>Single-label limitation:</strong> หนึ่ง feedback ได้ category เดียว แต่ความจริงอาจมีหลายมิติ เช่น Event + Monetization + Progression.</li>
        <li><strong>Priority inflation:</strong> คำรุนแรงอย่าง “ไม่ได้”, “หาย”, “แลคมาก”, “ไม่แฟร์” อาจดัน priority สูงเกินจริงถ้ายังไม่ได้ verify impact.</li>
        <li><strong>Owner simplification:</strong> owner ถูก map จาก category แต่บาง issue ต้องใช้ shared ownership ระหว่าง Product, Design, LiveOps และ Engineering.</li>
        <li><strong>Taxonomy gap:</strong> ยังมี <strong>${generalIssue}</strong> rows อยู่ใน General feedback แปลว่า issue taxonomy ยังไม่ละเอียดพอ.</li>
      </ul>`)}
      ${reportSection("4. Review Risk Summary", `<ul class="report-list">
        <li><strong>Mixed signal:</strong> มี ${mixedSignals} rows ที่มีทั้งสัญญาณบวกและลบ จึงเสี่ยงต่อ sentiment ผิด.</li>
        <li><strong>Low confidence:</strong> มี ${lowConfidence} rows ที่ evidence อ่อน ควรให้คนตรวจเป็นกลุ่มแรก.</li>
        <li><strong>Category conflict:</strong> มี ${possibleCategoryConflicts} rows ที่พูดถึง Event แต่ถูก route ไปหมวดใกล้เคียง อาจถูกหรือผิดก็ได้ ควรตรวจ.</li>
        <li><strong>Thai nuance:</strong> ภาษาไทยที่สุภาพหรือพูดอ้อมอาจทำให้ urgency ต่ำกว่าความจริง โดยเฉพาะ feedback จาก spender และ guild leader.</li>
      </ul>`)}
      ${reportSection("5. Reviewer Action", `<ul class="report-list">
        <li>ตรวจ Critical ทั้งหมดก่อน แล้วต่อด้วย High จาก spender และ guild leader.</li>
        <li>สุ่ม audit อย่างน้อย 10% ของแต่ละ category หลัง refresh dataset.</li>
        <li>นำตัวอย่างที่แก้แล้วกลับไปปรับ keyword rules หรือใช้เป็น prompt examples หากต่อ LLM จริง.</li>
        <li>วัด disagreement rate ระหว่าง AI label กับ human label ต่อเนื่อง.</li>
      </ul>`)}
    `;
    return;
  }

  document.getElementById("validationContent").innerHTML = `
    ${reportSection("Review Note — Validation / Human Review", `<p>This note audits the AI output, samples classified rows, documents limitations of the current method, and calls out where the AI may have made mistakes. The goal is to make review work visible, repeatable, and useful for improving the classifier.</p>`)}
    ${reportSection("1. Sample Audit", `<p>The system samples ${sample.length} rows, prioritizing Critical and mixed-signal feedback because those rows carry higher risk of bad classification.</p><div class="review-grid">
      ${sample.map((row) => `
        <div class="review-card">
          <strong>${escapeHtml(row.feedback_id)} · ${escapeHtml(row.sentiment)} · ${escapeHtml(row.category)} · ${escapeHtml(row.priority)}</strong>
          <p>${escapeHtml(row.player_feedback)}</p>
          <small>Review note: confirm sentiment tone, category fit, priority severity, and whether owner ${escapeHtml(row.suggested_owner)} is correct.</small>
        </div>
      `).join("")}
    </div>`)}
    ${reportSection("2. AI Likely Missed / Needs Human Check", `<ul class="report-list">
      ${likelyMissed.map((item) => `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.reason)} <br><small>${escapeHtml(item.example)}</small></li>`).join("")}
    </ul>`)}
    ${reportSection("3. Method Limitations", `<ul class="report-list">
      <li><strong>Semantic limitation:</strong> The current AI layer uses keyword/rule heuristics, not deep language understanding. It can miss sarcasm, subtle context, and Thai phrasing that does not include known keywords.</li>
      <li><strong>Single-label limitation:</strong> Each row receives one category, but real feedback can belong to multiple areas, such as Event + Monetization + Progression.</li>
      <li><strong>Priority inflation:</strong> Strong words like “ไม่ได้”, “หาย”, “แลคมาก”, or “ไม่แฟร์” can push items higher even when the real production impact needs verification.</li>
      <li><strong>Owner simplification:</strong> Owner is mapped from category. Some issues need shared ownership, for example Product + Design + LiveOps + Engineering.</li>
      <li><strong>Taxonomy gap:</strong> <strong>${generalIssue}</strong> rows are still in General feedback, meaning the issue taxonomy should be expanded if more precision is needed.</li>
    </ul>`)}
    ${reportSection("4. Review Risk Summary", `<ul class="report-list">
      <li><strong>Mixed signal rows:</strong> ${mixedSignals} rows contain both positive and negative signals. These are likely candidates for Neutral misclassification.</li>
      <li><strong>Low confidence rows:</strong> ${lowConfidence} rows have weak keyword evidence. They should be manually reviewed first if accuracy is more important than speed.</li>
      <li><strong>Category conflicts:</strong> ${possibleCategoryConflicts} rows mention Event while being routed to adjacent categories. These may be correct, but they deserve human review.</li>
      <li><strong>Thai nuance:</strong> Phrases that are polite, indirect, or culturally softened may understate urgency. Human reviewers should re-check VIP, spender, and guild leader complaints.</li>
    </ul>`)}
    ${reportSection("5. Reviewer Action", `<ul class="report-list">
      <li>Review all Critical rows first, then High rows from spender and guild leader segments.</li>
      <li>Audit at least 10% of rows per category after each data refresh.</li>
      <li>Add corrected examples to the keyword rules or migrate the prompt templates to a real LLM classifier.</li>
      <li>Track disagreement rate between AI label and human reviewer label over time.</li>
    </ul>`)}
  `;
}

function buildLikelyMissedRows(rows) {
  const mixed = rows.find((row) => {
    const text = row.player_feedback.toLowerCase();
    return countMatches(text, POSITIVE_WORDS) > 0 && countMatches(text, NEGATIVE_WORDS) > 0;
  });
  const eventConflict = rows.find((row) => {
    const text = row.player_feedback.toLowerCase();
    return text.includes("event") && ["Monetization", "Progression", "Balance"].includes(row.category);
  });
  const lowConfidence = rows.find((row) => row.confidence === "Low");
  const highButNotBlocking = rows.find((row) => row.priority === "Critical" && !["Bug", "Network", "Performance"].includes(row.category));
  const general = rows.find((row) => row.issue === "General feedback");

  return [
    {
      label: "Mixed sentiment",
      reason: "Feedback ที่มีทั้งคำชมและคำบ่นอาจถูกจัด sentiment กลาง ๆ หรือผิด tone เพราะ rule นับ keyword มากกว่าทำความเข้าใจบริบทเต็มประโยค.",
      example: mixed ? `${mixed.feedback_id}: ${mixed.player_feedback}` : "No mixed-sentiment sample found."
    },
    {
      label: "Category overlap",
      reason: "Feedback ที่พูดถึง Event อาจจริง ๆ แล้วเป็นปัญหา Monetization, Progression, Balance หรือ LiveOps มากกว่าจะเป็น Event อย่างเดียว.",
      example: eventConflict ? `${eventConflict.feedback_id}: ${eventConflict.player_feedback}` : "No event-overlap sample found."
    },
    {
      label: "Low evidence classification",
      reason: "Rows ที่ confidence ต่ำมี keyword signal ไม่ชัด AI อาจเดา category/owner จากคำไม่กี่คำ.",
      example: lowConfidence ? `${lowConfidence.feedback_id}: ${lowConfidence.player_feedback}` : "No low-confidence sample found."
    },
    {
      label: "Priority may be inflated",
      reason: "คำที่ฟังดูรุนแรงอาจดัน priority เป็น Critical แม้ยังต้องให้คนตรวจว่ากระทบ production จริงหรือไม่.",
      example: highButNotBlocking ? `${highButNotBlocking.feedback_id}: ${highButNotBlocking.player_feedback}` : "No non-technical Critical sample found."
    },
    {
      label: "Issue taxonomy gap",
      reason: "Rows ที่ยังอยู่ใน General feedback แปลว่า issue clustering ยังจับ pattern ไม่ละเอียดพอ ควรเพิ่ม taxonomy หรือ examples.",
      example: general ? `${general.feedback_id}: ${general.player_feedback}` : "No General feedback sample found."
    }
  ];
}

function buildReviewSample(rows, size) {
  const sorted = [...rows].sort((a, b) => {
    const seedA = numericId(a.feedback_id) * 37 + a.player_feedback.length;
    const seedB = numericId(b.feedback_id) * 37 + b.player_feedback.length;
    return (seedA % 997) - (seedB % 997);
  });
  const critical = rows.filter((row) => row.priority === "Critical").slice(0, 3);
  const mixed = rows.filter((row) => {
    const text = row.player_feedback.toLowerCase();
    return countMatches(text, POSITIVE_WORDS) > 0 && countMatches(text, NEGATIVE_WORDS) > 0;
  }).slice(0, 3);
  const combined = [...critical, ...mixed, ...sorted];
  const seen = new Set();
  return combined.filter((row) => {
    if (seen.has(row.feedback_id)) return false;
    seen.add(row.feedback_id);
    return true;
  }).slice(0, size);
}

function numericId(id) {
  const match = String(id).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function reportSection(title, content) {
  return `<section class="report-section"><h3>${escapeHtml(title)}</h3>${content}</section>`;
}

function list(items) {
  return `<ul class="report-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function wireExports() {
  document.getElementById("exportCsvBtn").addEventListener("click", () => exportCsv(state.filteredRows.length ? state.filteredRows : state.rows));
  document.getElementById("exportXlsBtn").addEventListener("click", () => exportExcel(state.filteredRows.length ? state.filteredRows : state.rows));
}

function exportCsv(rows) {
  const csv = [
    columns.map(([, label]) => label).join(","),
    ...rows.map((row) => columns.map(([key]) => csvEscape(row[key])).join(","))
  ].join("\n");
  downloadFile("feedback-analysis.csv", "text/csv;charset=utf-8", csv);
}

function exportExcel(rows) {
  const html = `
    <html><head><meta charset="utf-8"></head><body>
    <table>
      <thead><tr>${columns.map(([, label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${columns.map(([key]) => `<td>${escapeHtml(row[key])}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
    </body></html>
  `;
  downloadFile("feedback-analysis.xls", "application/vnd.ms-excel;charset=utf-8", html);
}

function downloadFile(filename, type, content) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quote = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quote && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quote = !quote;
    } else if (char === "," && !quote) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quote) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const [headers, ...records] = rows;
  return records.map((record) => Object.fromEntries(headers.map((header, index) => [header, record[index] || ""])));
}

function updateStatus(status, detail) {
  const localizedStatus = state.lang === "th" && status === "Analysis complete" ? "วิเคราะห์เสร็จแล้ว" : status;
  const localizedDetail = state.lang === "th" && detail.includes("feedback rows processed")
    ? detail.replace("feedback rows processed", "feedback rows ที่ประมวลผลแล้ว")
    : detail;
  document.getElementById("analysisStatus").textContent = localizedStatus;
  document.getElementById("refreshStamp").textContent = `${localizedDetail} · ${new Date().toLocaleTimeString()}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
