// Each record preserves the event date or the first-release date, separately from retrieval.
// CONFIRMED means the stated event/report is documented; CLAIM preserves attribution.
export const editionDate = '2026-11-20';
const item = (id, region, place, title, detail, source, url, art, lon, lat, basis = 'event', status = 'CONFIRMED') =>
  ({ id, region, place, title, detail, source, url, art, lon, lat, date: editionDate, basis, status });

export const stories = [
  item(1, 'EUROPE', 'KYIV · UKRAINE', 'Russian strikes hit three Kyiv bridges',
    'An overnight barrage damages Dnipro crossings and disrupts travel across the capital.',
    'REUTERS / AP', 'https://www.rte.ie/news/ukraine/2026/1120/1599948-ukraine-russia/', 'kyiv', 30.52, 50.45),
  item(2, 'ASIA', 'GOPALPUR · INDIA', 'Akvan comes ashore in Odisha',
    'More than 300,000 moved to safety. Winds weaken after the morning landfall; heavy rain remains a threat.',
    'IMD VIA STATESMAN', 'https://www.thestatesman.com/?p=1503664988', 'cyclone', 84.9, 19.25),
  item(3, 'ASIA', 'ASIAN MARKETS', 'AI sell-off sweeps Asian stocks',
    'Friday closes: Taipei −6.2%, Seoul −5.2%, Tokyo −5.1%, Hong Kong −1.9%.',
    'IMF / BAYSTREET', 'https://www.imfconnect.org/content/dam/imf/News%20and%20Generic%20Content/GMM/archive/GMM%20November%2020,%202026.pdf', 'markets', 121.56, 25.03),
  item(4, 'GLOBAL', 'ANTALYA · TÜRKIYE', 'COP31 runs into overtime',
    'Fossil fuels absent from draft; finance divides delegates.',
    'AP', 'https://apnews.com/article/a683c5c87a7ee64caf4e9257948b6e40', 'climate', 30.7, 36.9),
  item(5, 'EUROPE', 'BRUSSELS · EU / UK', 'A trade and youth “reset”',
    'Food deal and 100,000 youth places each way agreed; rollout is in future years.',
    'EU COUNCIL', 'https://www.consilium.europa.eu/en/meetings/international-summit/2026/11/20/', 'europe', 4.35, 50.85),
  item(6, 'EUROPE', 'EASTERN POLAND', 'Russian missiles fall in Poland',
    'Incursions coincide with European military drills. No injuries reported.',
    'AP', 'https://apnews.com/article/433e18f00cbd37a2a9da94e60fce0e07', 'poland', 23.2, 50.3),
  item(7, 'MIDDLE EAST', 'JURF AL-SAKHAR · IRAQ', 'State forces enter militia town',
    'Iraqi troops deploy after a deal with Kataib Hezbollah.',
    'AL JAZEERA / REUTERS', 'https://www.aljazeera.com/amp/news/2026/11/20/iraqi-forces-deploy-to-jurf-al-sakhar-after-deal-with-iran-backed-group', 'iraq', 44.28, 32.83),
  item(8, 'EUROPE', 'ITALY', 'Workers and students strike',
    'Nationwide marches oppose living costs and public-service cuts.',
    'LA REPUBBLICA', 'https://www.repubblica.it/en/news/2026/11/20/diretta/general_strike_and_student_protests_marches_in_a_hundred_town_squares_today-425736899/', 'strike', 12.5, 41.9),
  item(9, 'AMERICAS', 'UNITED STATES', 'Nvidia accounting under scrutiny',
    'Reuters sources say the SEC is examining accounting issues; no finding announced.',
    'REUTERS', 'https://www.streetinsider.com/Reuters/Exclusive-US%2BSECs%2BNvidia%2Bprobe%2Bis%2Bexamining%2Bpotential%2Baccounting%2Bissues%2C%2Bsources%2Bsay/27381042.html', 'nvidia', -121.96, 37.35, 'first_report', 'CLAIM'),
  item(10, 'ASIA', 'SEOUL · SOUTH KOREA', 'Party targets chief justice',
    'Democrats adopt impeachment as party policy; the judge has not been impeached.',
    'CHOSUN / SBS', 'https://www.chosun.com/english/national-en/2026/11/20/7OVFGUKAPRB6RICKW2NZ4QNNVI/', 'seoul', 126.98, 37.56),
  item(11, 'AFRICA', 'TURKANA · KENYA', 'Production drilling starts',
    'Amosing well spudded; commercial oil output is still a future target.',
    'THE STAR', 'https://www.the-star.co.ke/news/2026-11-20-kenya-begins-production-drilling-at-turkana-oilfields', 'oil', 35.9, 2.4),
  item(12, 'ASIA', 'TOKYO · JAPAN', 'October inflation: 2.3%',
    'Friday release: headline prices rise 2.3% yearly; core inflation is 2.2%.',
    'ANADOLU / MIC', 'https://mobil.aa.com.tr/en/economy/japans-core-inflation-accelerates-to-22-in-october/4131652', 'japan', 139.69, 35.68, 'release'),
  item(13, 'OCEANIA', 'WELLINGTON · NEW ZEALAND', 'Phillips makes 118 vs India',
    'Second Test century completed Friday; New Zealand reaches 317–6 at lunch.',
    'AP', 'https://ca.sports.yahoo.com/news/phillips-118-zealand-reaches-317-002426145.html', 'cricket', 174.78, -41.29),
  item(14, 'MIDDLE EAST', 'US / IRAN', 'Trump says Iran offers no acceptable deal', '', 'AP', 'https://apnews.com/article/8fd6dcd6dc4a1a77437cedc4567fbee8', 'talks', 51.4, 35.7, 'event', 'CLAIM'),
  item(15, 'MIDDLE EAST', 'SAUDI ARABIA / YEMEN', 'Saudi forces and Houthis exchange fire', '', 'AP', 'https://apnews.com/article/16c39c487a23b53b73c5eabb7f0fd57a', 'fire', 44.2, 15.35),
  item(16, 'MIDDLE EAST', 'GAZA', 'Israeli strikes kill six, local officials say', '', 'AP', 'https://apnews.com/article/16c39c487a23b53b73c5eabb7f0fd57a', 'gaza', 34.46, 31.5, 'event', 'CLAIM'),
  item(17, 'AFRICA', 'SUDAN', 'RSF alliance claims five Blue Nile gains', '', 'SUDAN TRIBUNE', 'https://sudantribune.com/article/321467', 'sudan', 34.3, 11.8, 'event', 'CLAIM'),
  item(18, 'AFRICA', 'SOUTH AFRICA', 'New police figures: 5,590 quarterly murders', '', 'DAILY MAVERICK', 'https://www.dailymaverick.co.za/article/2026-11-20-cachalia-drops-apartheid-truth-bombs-as-latest-stats-show-60-killed-daily-in-sa/', 'crime', 28.2, -25.75, 'release'),
  item(19, 'AFRICA', 'BENIN / FRANCE', 'Benin seeks return of 35 looted objects', '', 'AFRICANEWS', 'https://www.africanews.com/2026/11/20/benin-requests-return-of-35-looted-artifacts-from-paris-museum/', 'heritage', 2.4, 6.4, 'first_report'),
  item(20, 'AFRICA', 'SOMALIA', 'Protesters back expulsion of UAE envoy', '', 'AFRICANEWS', 'https://www.africanews.com/2026/11/20/somali-protesters-come-out-in-support-of-expulsion-of-uae-ambassador/', 'somalia', 45.35, 2.05),
  item(21, 'EUROPE', 'BERLIN · GERMANY', 'Students march against rearmament', '', 'AFRICANEWS', 'https://www.africanews.com/2026/11/20/germany-berlin-student-protest-targets-rearmament-and-compulsory-service/', 'berlin', 13.4, 52.5),
  item(22, 'EUROPE', 'RUSSIA / UKRAINE', 'Russia rejects NATO-like Ukraine status', '', 'AP', 'https://apnews.com/article/961f5a5b381dc7555c7bedfdd20581d8', 'security', 37.6, 55.75),
  item(23, 'EUROPE', 'UNITED KINGDOM', 'Dinghy vandal jailed for 15 months', '', 'AP', 'https://www.washingtonpost.com/world/2026/11/20/daniel-thomas-migrant-boat-jailed-britain/a63e25d4-e50c-11f1-a99e-b3e3805c6b8b_story.html', 'dinghy', -1.1, 50.8),
  item(24, 'AMERICAS', 'IOWA · US', 'DOJ filing asserts emergency blast powers', '', 'DOJ COURT FILING', 'https://iowaspulse.com/wp-content/uploads/2026/11/Justice-Department-Notice-Citing-Emergency-Authority-for-Iowa-Army-Ammunition-Plant-Detonation-%E2%80%94-Nov.-20-2026.pdf', 'iowa', -91.25, 40.82, 'release', 'CLAIM'),
  item(25, 'AMERICAS', 'HALIFAX · CANADA', 'International security forum opens', '', 'HFX / CANADA DND', 'https://halifaxtheforum.org/uploads/2026-Agenda_Final.pdf', 'halifax', -63.57, 44.65),
  item(26, 'AMERICAS', 'BRAZIL', 'Black Consciousness Day observed', '', 'B3 HOLIDAY CALENDAR', 'https://www.b3.com.br/data/files/93/65/8E/25/9FE9B9109B5E99B9AC094EA8/CL%20003-2026-VNC%20ERRATA_CALENDARIO%20DE%20FERIADOS%20EM%202026%20E%20FUNCIONAMENTO%20DA%20B3%20EM%2018022026%20QUARTAFEIRA%20DE%20CINZAS_EN.pdf', 'brazil', -47.9, -15.8),
  item(27, 'AMERICAS', 'SANTIAGO · CHILE', 'Fed’s Cook argues for higher interest rates', '', 'FEDERAL RESERVE', 'https://www.federalreserve.gov/newsevents/speech/cook20261120a.htm', 'fed', -70.65, -33.45),
  item(28, 'OCEANIA', 'AUSTRALIA / CHINA', 'Albanese meets Xi on bilateral trade', '', 'ABC NEWS', 'https://www.abc.net.au/news/2026-11-20/albanese-to-meet-xi-for-trade/107406222', 'australia', 114.06, 22.54),
  item(29, 'OCEANIA', 'AUSTRALIA', 'David Jones sends 1,689 redundancy notices', '', 'NEWSWIRE / ABC', 'https://au.finance.yahoo.com/news/david-jones-axes-1680-staff-080224268.html', 'retail', 151.2, -33.87),
  item(30, 'OCEANIA', 'NEW ZEALAND', 'Jackson calls for US envoy’s expulsion', '', 'NZ HERALD / NEWSTALK', 'https://z-umbraco-nzb-frontend-lin-as-ae-pr.azurewebsites.net/news/national/willie-jackson-calls-us-ambassador-jared-novelly-a-clown-and-wants-him-kicked-out/', 'envoy', 174.78, -41.29),
  item(31, 'ASIA', 'KATHMANDU · NEPAL', 'Children’s rights celebrated through cricket', '', 'UNICEF', 'https://www.unicef.org/nepal/press-releases/unicef-approaches-80-years-childrens-rights-and-equal-opportunities-take-centre', 'nepal', 85.3, 27.7),
  item(32, 'MIDDLE EAST', 'GAZA', 'Italy and UN launch €10m child-services plan', '', 'UNICEF / UN AGENCIES', 'https://www.unicef.org/sop/press-releases/italy-and-un-agencies-partner-strengthen-integrated-services-children-and-young', 'aid', 34.46, 31.5),
  item(33, 'GLOBAL', 'WORLD CHILDREN’S DAY', '20-plus exchanges ring the bell for children', '', 'UNICEF', 'https://www.unicef.org/press-releases/remarks-unicef-executive-director-catherine-russell-roundtable-conversation-nasdaq', 'children', -74, 40.7),
  item(34, 'AFRICA', 'DR CONGO · WHO UPDATE', 'WHO reports sustained Ebola transmission', '', 'WHO · FRIDAY BULLETIN', 'https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON630', 'health', 29.2, 1.6, 'release'),
  item(35, 'EUROPE', 'UKRAINE · UNICEF UPDATE', 'Child casualties highest in almost four years', '', 'UNICEF · FRIDAY RELEASE', 'https://www.unicef.org/press-releases/child-casualties-ukraine-reach-highest-level-almost-four-years-unicef', 'ukraine', 30.52, 50.45, 'release'),
];

export const additionalEvidence = [
  { story: 2, url: 'https://watchers.news/2026/11/20/cyclone-akvan-landfall-gopalpur-november-20-2026-deep-depression/', supports: 'IMD crossing interval 02:00–03:00 UTC; more than 300,000 sheltered.' },
  { story: 3, url: 'https://baystreet.ca/foreignmarketwrap/5069/Asia-Stumbles-into-Weekend', supports: 'Hang Seng Friday close −1.9%.' },
  { story: 10, url: 'https://news.sbs.co.kr/english/article.do?cooper=SBSNEWSMAIN&news_id=N1008855659&plink=NEW', supports: 'Task force on Friday; prior court decision is Thursday and is not reported as a new Friday judgment.' },
];

export const timeline = [
  { time: '00:24', label: 'Phillips 118 · AP report', basis: 'publication', story: 13 },
  { time: '02–03:00', label: 'Akvan crosses coast', basis: 'event interval', story: 2 },
  { time: '05:21', label: 'Seoul party vote reported', basis: 'publication: 14:21 KST', story: 10 },
  { time: '05:30', label: 'Taipei market closes', basis: 'scheduled exchange close', story: 3 },
  { time: '17:15', label: 'Cook’s Santiago speech', basis: 'Fed release schedule', story: 27 },
  { time: '19:13', label: 'Nvidia probe · Reuters', basis: 'publication: 14:13 EST', story: 9 },
];

export const exclusions = [
  { date: '19 NOV', text: 'Anthropic $83 market debut; Myanmar ICJ judgment; APEC three-leader summit; US cyber-chief departure.' },
  { date: '21 NOV+', text: 'BepiColombo Mercury orbit insertion and later Test scores excluded; no projected outcomes shown as completed.' },
];

export const datePolicy = 'Friday 20 November 2026 in the event’s local time zone. A new Friday data release is dated by release, not by the period measured. A first report is included only as reported, with claims attributed. Historical context and scheduled future outcomes are not new Friday events.';
