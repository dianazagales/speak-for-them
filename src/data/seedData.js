export const seedCases = [
  {
    id: "case-001",
    title: "Abandoned Dog Colony in Rural Missouri",
    animalName: "Pack of 7 dogs",
    species: "Dog",
    location: { city: "Farmington", state: "MO" },
    status: "Needs Investigation",
    urgency: "High",
    shortDescription: "Seven dogs discovered chained without food or water for over two weeks at an abandoned rural property. Neighbors have reported the situation twice with no response from local animal control.",
    fullDescription: "In late February, residents near County Road 47 in Farmington, Missouri reported seeing seven dogs — a mix of hound mixes and a shepherd cross — chained to stakes at an abandoned farmstead. The property owner is believed to have left the state. The animals have been surviving on rainwater collected in old buckets and whatever small animals they can catch. Two of the dogs show signs of mange and severe malnutrition.\n\nNeighbors have called St. Francois County Animal Control twice over the past three weeks. No officer has been dispatched. Missouri state law (Section 578.012 RSMo) prohibits animal neglect, including failure to provide adequate food, water, or shelter.\n\nThese animals need immediate intervention. Please contact your representatives to demand that local animal control fulfill their legal obligations and that the state investigate why these reports are being ignored.",
    photoUrl: null,
    localPolice: {
      name: "St. Francois County Sheriff's Office",
      email: "sheriff@stfrancoisso.com",
      phone: "(573) 756-5757"
    },
    localAnimalControl: {
      name: "St. Francois County Animal Control",
      email: "animalcontrol@stfrancoisso.com",
      phone: "(573) 756-5757"
    },
    emailTemplate: {
      subject: "Urgent: Investigate Neglected Dogs at County Road 47, Farmington MO",
      body: "Dear {{rep_name}},\n\nI am writing to you as a constituent in {{user_zip}} about a deeply concerning animal neglect situation in Farmington, Missouri that has gone unaddressed for weeks.\n\nSeven dogs — {{case_name}} — have been found chained at an abandoned property on County Road 47 without adequate food, water, or shelter. Neighbors have reported this situation to St. Francois County Animal Control twice, with no response. Under Missouri state law (Section 578.012 RSMo), this constitutes criminal animal neglect.\n\nI am asking you to:\n1. Contact St. Francois County Animal Control and demand an immediate welfare check\n2. Inquire with the Missouri Department of Agriculture's Animal Care Program about this unresolved complaint\n3. Support stronger enforcement mechanisms for existing animal welfare laws\n\nThese animals are suffering right now. Your intervention could save their lives.\n\nThank you for your time and for representing the values of our community.\n\nA concerned constituent"
    },
    timeline: [
      { date: "2026-02-18", event: "First call made to animal control by neighbors" },
      { date: "2026-02-28", event: "Second call made — no response received" },
      { date: "2026-03-05", event: "Case reported to Speak For Them by local resident" }
    ],
    active: true,
    createdAt: "2026-03-05"
  },
  {
    id: "case-002",
    title: "Horse Starving in Drought-Stricken Texas Pasture",
    animalName: "Mare named Rosie",
    species: "Horse",
    location: { city: "Lubbock", state: "TX" },
    status: "Charges Pending",
    urgency: "Medium",
    shortDescription: "A mare named Rosie was found with severe malnutrition by a neighboring rancher. The Lubbock County Sheriff seized the animal and the owner now faces misdemeanor charges — advocates are pushing for felony-level prosecution under Texas Penal Code.",
    fullDescription: "In January 2026, a neighboring rancher near Lubbock noticed that a horse on the adjacent property — later identified as a 9-year-old quarter horse mare named Rosie — had become severely emaciated. Rosie's ribs, hips, and spine were clearly visible, and she was unable to walk without stumbling.\n\nThe rancher contacted the Lubbock County Sheriff's Office. Deputies visited the property and seized Rosie under Texas Agriculture Code §821.022. She was transported to a local large-animal rescue, where she is currently receiving veterinary care and is expected to make a full recovery with time.\n\nThe property owner, whose name has not been released, has been charged with animal cruelty as a Class A misdemeanor. Animal welfare advocates are calling for the charges to be elevated to a felony under Texas Penal Code §42.092, which allows for felony charges when serious bodily injury is inflicted on an animal through intentional or reckless conduct.\n\nThe Lubbock County District Attorney's office is currently reviewing the case. Public pressure matters — DA offices are elected officials accountable to constituents.",
    photoUrl: null,
    localPolice: {
      name: "Lubbock County Sheriff's Office",
      email: "sheriff@lubbockcounty.gov",
      phone: "(806) 775-1670"
    },
    localAnimalControl: {
      name: "Lubbock Animal Services",
      email: "animalservices@ci.lubbock.tx.us",
      phone: "(806) 775-2057"
    },
    emailTemplate: {
      subject: "Please Pursue Felony Charges in the Rosie the Horse Neglect Case",
      body: "Dear {{rep_name}},\n\nI am a constituent writing from {{user_zip}} about an animal cruelty case in Lubbock County that I believe demands stronger action.\n\nA horse named Rosie — {{case_name}} — was found in a state of severe malnutrition in January 2026. She was seized by the Lubbock County Sheriff and is now recovering at a rescue facility. While charges have been filed, they are currently at the misdemeanor level.\n\nGiven the severity of Rosie's condition and the clear evidence of prolonged neglect, I am urging the Lubbock County District Attorney's office to pursue felony charges under Texas Penal Code §42.092. Texas law allows for this, and this case meets that threshold.\n\nAnimals cannot speak for themselves. As an elected representative accountable to the people of this community, I ask you to make clear to the DA's office that constituents expect the full force of the law to be applied in cases of serious animal cruelty.\n\nThank you for standing up for those who cannot speak for themselves.\n\nSincerely,\nA concerned constituent from {{user_zip}}"
    },
    timeline: [
      { date: "2026-01-14", event: "Neighboring rancher notices Rosie's condition" },
      { date: "2026-01-16", event: "Sheriff's deputies seize horse under Texas Agriculture Code" },
      { date: "2026-01-20", event: "Owner cited — Class A misdemeanor charges filed" },
      { date: "2026-02-10", event: "DA's office begins review of whether to elevate charges" },
      { date: "2026-03-01", event: "Case added to Speak For Them — advocacy needed" }
    ],
    active: true,
    createdAt: "2026-03-01"
  }
]

export const seedBills = [
  {
    id: "bill-001",
    billNumber: "H.R. 1822",
    title: "Puppy Protection and Pet Store Reform Act",
    state: "Federal",
    shortDescription: "Would ban pet stores from selling dogs, cats, and rabbits sourced from commercial breeders — effectively closing the puppy mill pipeline to retail.",
    whyItMatters: "The vast majority of puppies sold in pet stores come from large-scale commercial breeding operations, often called 'puppy mills,' where animals are kept in overcrowded, unsanitary conditions with minimal veterinary care. Mother dogs are typically bred every heat cycle until they can no longer reproduce, then discarded.\n\nH.R. 1822 would require pet stores to source dogs, cats, and rabbits exclusively from shelters, rescues, and USDA-licensed breeders with fewer than 5 breeding females — effectively ending the pipeline between large-scale mills and retail sales.\n\nOver 400 US cities and several states have already passed similar ordinances. This bill would establish a federal standard, closing loopholes that allow mills to operate across state lines to circumvent local laws.\n\nSupporters include the ASPCA, Humane Society of the United States, and over 100 local animal shelters. Opposition comes primarily from industry lobbying groups representing commercial breeders.",
    currentStatus: "In Committee",
    urgency: "High",
    officialUrl: "https://www.congress.gov",
    emailTemplate: {
      subject: "Please Support H.R. 1822 — Puppy Protection and Pet Store Reform Act",
      body: "Dear {{rep_name}},\n\nI am writing as your constituent from {{user_zip}} to urge your support for H.R. 1822, the Puppy Protection and Pet Store Reform Act.\n\nPuppy mills are a documented source of animal suffering. Dogs bred in these facilities live in overcrowded, often unsanitary conditions, and the mother dogs are typically discarded once they can no longer produce litters. H.R. 1822 would close the direct retail pipeline between large commercial breeders and pet stores, without banning responsible small-scale breeders.\n\nThis bill has the support of major animal welfare organizations and mirrors ordinances that have already succeeded in hundreds of US cities. It is time for a federal standard.\n\nI respectfully ask that you:\n1. Co-sponsor H.R. 1822 if you have not already done so\n2. Advocate for the bill's advancement out of committee\n3. Vote YES when it reaches the floor\n\nThank you for representing the values of our community.\n\nYour constituent from {{user_zip}}"
    },
    active: true,
    createdAt: "2026-02-20"
  },
  {
    id: "bill-002",
    billNumber: "SB 447",
    title: "Florida Animal Cruelty Sentencing Enhancement Act",
    state: "FL",
    shortDescription: "Would increase maximum sentences for felony animal cruelty in Florida from 5 to 10 years and require psychological evaluation for convicted offenders — recognizing the link between animal abuse and violence against people.",
    whyItMatters: "Florida's current felony animal cruelty statute caps sentences at 5 years. Research consistently shows a strong link between animal abuse and violent crimes against humans — often called 'The Link' by criminologists. Abusers who harm animals are statistically more likely to also harm people, and lighter sentences fail to reflect the severity of the crime or protect communities.\n\nSB 447 would:\n- Increase the maximum sentence for felony animal cruelty from 5 to 10 years\n- Mandate psychological evaluation for anyone convicted of animal cruelty\n- Require that cruelty convictions be entered into the state's criminal database used by animal shelters and rescue groups (preventing convicted abusers from adopting animals)\n\nThirty-two other states have already enacted similar provisions. Florida regularly ranks in the top 10 for animal cruelty cases reported nationally. It is time for the law to catch up.\n\nThis bill has bipartisan support and is currently in the Florida Senate Judiciary Committee.",
    currentStatus: "In Committee",
    urgency: "High",
    officialUrl: "https://www.flsenate.gov",
    emailTemplate: {
      subject: "Please Support SB 447 — Animal Cruelty Sentencing Enhancement Act",
      body: "Dear {{rep_name}},\n\nAs your constituent from {{user_zip}}, I am writing to urge your support for SB 447, the Florida Animal Cruelty Sentencing Enhancement Act.\n\nFlorida's current 5-year cap on felony animal cruelty sentences is inadequate and out of step with 32 other states that have already enacted stronger protections. Research consistently links animal abuse to other violent crimes — this is not just about animals, it is about community safety.\n\nSB 447 would increase maximum sentences to 10 years, require mandatory psychological evaluation for offenders, and prevent convicted abusers from obtaining animals through shelters. These are commonsense measures with bipartisan support.\n\nI ask you to:\n1. Support SB 447's advancement out of the Senate Judiciary Committee\n2. Vote YES on the floor\n3. Encourage your colleagues to do the same\n\nThank you for your attention to this important issue.\n\nSincerely,\nA constituent from {{user_zip}}"
    },
    active: true,
    createdAt: "2026-02-15"
  }
]
