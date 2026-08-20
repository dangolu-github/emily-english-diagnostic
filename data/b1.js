window.EMILY_TEST = {
  id: "emily-b1-diagnostic-v1",
  level: "B1",
  title: "B1 English Diagnostic",
  subtitle: "Grammar · Vocabulary · Reading · Listening",
  total: 48,
  sections: [
    {
      name: "Grammar",
      title: "Grammar",
      instructions: "Choose the best answer for G01–G12.",
      items: [
        { id: "G01", type: "mc", prompt: "I've lived in this town ___ 2023.", options: ["for", "from", "during", "since"] },
        { id: "G02", type: "mc", prompt: "When the phone rang, I ___ dinner.", options: ["cooked", "was cooking", "have cooked", "am cooking"] },
        { id: "G03", type: "mc", prompt: "If I had more free time, I ___ a language club.", options: ["join", "will join", "would join", "joined"] },
        { id: "G04", type: "mc", prompt: "The new sports centre ___ last month.", options: ["opened", "has opened", "was opening", "was opened"] },
        { id: "G05", type: "mc", prompt: "Maya said that she ___ tired.", options: ["is", "was", "has", "will"] },
        { id: "G06", type: "mc", prompt: "The woman ___ lives next door is a doctor.", options: ["which", "whose", "who", "where"] },
        { id: "G07", type: "mc", prompt: "He ___ be at home; the lights are off and his car is gone.", options: ["must", "should", "need", "can't"] },
        { id: "G08", type: "mc", prompt: "I really enjoy ___ new places.", options: ["visit", "to visiting", "visiting", "visited"] },
        { id: "G09", type: "mc", prompt: "___ the heavy rain, the match continued.", options: ["Although", "Despite", "Because", "However"] },
        { id: "G10", type: "mc", prompt: "We ___ go swimming every weekend when we were younger.", options: ["used to", "were used to", "use to", "would to"] },
        { id: "G11", type: "mc", prompt: "I ___ that film yet.", options: ["didn't see", "haven't seen", "don't see", "wasn't seeing"] },
        { id: "G12", type: "mc", prompt: "By the time we arrived, the train ___.", options: ["left", "has left", "had left", "would leave"] }
      ]
    },
    {
      name: "Vocabulary",
      title: "Vocabulary",
      instructions: "Choose the word or phrase that best completes each sentence.",
      items: [
        { id: "V01", type: "mc", prompt: "Friday is the ___ for sending the application.", options: ["deadline", "direction", "entrance", "permission"] },
        { id: "V02", type: "mc", prompt: "Lena is very ___; she always does what she promises.", options: ["ordinary", "nervous", "private", "reliable"] },
        { id: "V03", type: "mc", prompt: "More than 200 students will ___ in the sports day.", options: ["make up", "look after", "turn down", "take part"] },
        { id: "V04", type: "mc", prompt: "The guide knew how to ___ unexpected problems.", options: ["deal with", "belong to", "depend on", "wait for"] },
        { id: "V05", type: "mc", prompt: "Take an umbrella to ___ getting completely wet.", options: ["avoid", "allow", "advise", "admit"] },
        { id: "V06", type: "mc", prompt: "The exchange programme is a great ___ to practise English.", options: ["behaviour", "decision", "description", "opportunity"] },
        { id: "V07", type: "mc", prompt: "I ___ taking the earlier train because the later one is often full.", options: ["suggest", "explain", "promise", "refuse"] },
        { id: "V08", type: "mc", prompt: "This bus takes a different ___ through the city centre.", options: ["route", "reason", "result", "report"] },
        { id: "V09", type: "mc", prompt: "Leaving the lights on all night is a ___ of energy.", options: ["waste", "lack", "risk", "piece"] },
        { id: "V10", type: "mc", prompt: "The school hopes the new library will ___ students' study habits.", options: ["support", "measure", "improve", "replace"] },
        { id: "V11", type: "mc", prompt: "The outdoor concert is ___ to be cancelled if the storm continues.", options: ["ready", "likely", "usual", "certain"] },
        { id: "V12", type: "mc", prompt: "Could you ___ a meeting for Tuesday afternoon?", options: ["arrange", "attend", "accept", "achieve"] }
      ]
    },
    {
      name: "Reading",
      title: "Reading",
      tasks: [
        {
          title: "Reading Task 1 — Phone-free lunches",
          instructions: "Read the article. Choose the best answer for R01–R06.",
          passage: "<h3>What happened when one school changed lunchtime?</h3><p>Last autumn, Brookfield Secondary introduced a four-week phone-free lunch experiment. Students left their phones in locked classroom boxes before going to the dining hall and collected them at the start of the next lesson. The school did not want to punish students; teachers wanted to find out whether a short daily break from screens would change how students used lunchtime.</p><p>During the first week, many students complained. Some worried that their parents might need to contact them, while others said there was nothing to do after eating. The school therefore kept one supervised phone at reception for urgent family messages and placed board games, drawing materials and sports equipment in the dining area.</p><p>By the third week, staff noticed that students were staying at the tables longer and mixing with classmates outside their usual friendship groups. The change was not equally popular with everyone. Older students, who often used lunchtime to organise after-school plans, remained less positive than younger students.</p><p>At the end of the experiment, 62% of students wanted two phone-free lunches each week, while 21% wanted every lunch to be phone-free. The rest preferred the old system. The head teacher chose the two-day option and added a quiet room where students could read or work alone.</p><p>The school has not claimed that phones are the cause of every social problem. Instead, it describes the project as a small change that created more choices: conversation and shared activities on two days, and normal phone use on the others.</p>",
          items: [
            { id: "R01", type: "mc", prompt: "What was the main purpose of the experiment?", options: ["To punish students who used phones in class", "To stop parents contacting the school", "To improve the school's internet connection", "To test the effect of a daily screen break"] },
            { id: "R02", type: "mc", prompt: "How could families send an urgent message?", options: ["Through a supervised phone at reception", "By calling the dining hall directly", "Through a student's locked phone", "By waiting until the next day"] },
            { id: "R03", type: "mc", prompt: "Why were games and sports equipment added?", options: ["Students needed alternatives after eating.", "Teachers wanted to extend lunchtime.", "Parents asked for more homework.", "Older students refused to eat."] },
            { id: "R04", type: "mc", prompt: "What did staff notice by the third week?", options: ["Students ate more quickly.", "Older students became the most positive group.", "The dining hall became quieter every day.", "Students mixed with a wider range of classmates."] },
            { id: "R05", type: "mc", prompt: "What did the head teacher decide?", options: ["Return completely to the old system", "Ban phones at every lunch", "Keep two phone-free lunches each week", "Let each class choose a different rule"] },
            { id: "R06", type: "mc", prompt: "Which statement best matches the school's conclusion?", options: ["Phones are responsible for all social problems.", "One small change can offer a useful balance.", "Students should never organise plans at lunch.", "Quiet individual work should replace conversation."] }
          ]
        },
        {
          title: "Reading Task 2 — The Conversation Bench",
          instructions: "Read the article. Answer R07–R12. Short answers must use no more than four words.",
          passage: "<h3>A ten-minute language exchange</h3><p>When librarian Eszter Varga noticed that language learners often studied alone, she started a weekly Conversation Bench in the entrance hall. A small sign shows which languages people want to practise. Anyone may sit down, but the first conversation is limited to ten minutes so that new speakers can join.</p><p>The project began with English and Hungarian, then expanded after international students offered German, Spanish and Turkish. Volunteers are not teachers and they do not correct every mistake. Their job is to keep the conversation moving, ask follow-up questions and explain a word when communication stops.</p><p>Some learners were nervous about speaking in a public space. In response, the library added colour cards. A green card means “please correct an important mistake”; a blue card means “let me finish before helping”. This simple choice made expectations clearer and reduced interruptions.</p><p>After three months, the library surveyed 84 regular users. Most said they had become more confident starting conversations, but fewer reported improvement in grammar. Eszter was not disappointed. She says the bench was designed to increase real speaking time, not replace a language course.</p><p>The main difficulty is finding enough volunteers during examination periods. The library is now training former participants to lead sessions and plans to add an evening bench for adults who work during the day.</p>",
          items: [
            { id: "R07", type: "mc", prompt: "Why did Eszter start the Conversation Bench?", options: ["Learners had no language textbooks.", "Many learners were studying by themselves.", "The library needed paid teachers.", "International students requested exams."] },
            { id: "R08", type: "text", prompt: "How long is the first conversation?" },
            { id: "R09", type: "mc", prompt: "What are volunteers expected to do?", options: ["Correct every grammar mistake", "Give formal language lessons", "Help the conversation continue", "Test each learner's vocabulary"] },
            { id: "R10", type: "text", prompt: "Which card asks for important corrections?" },
            { id: "R11", type: "mc", prompt: "What result did most regular users report?", options: ["More confidence in starting conversations", "Perfect grammar in written work", "Better examination results", "Less interest in other languages"] },
            { id: "R12", type: "text", prompt: "When is it hardest to find volunteers?" }
          ]
        }
      ]
    },
    {
      name: "Listening",
      title: "Listening",
      tasks: [
        {
          title: "Listening Task 1 — The Many Faces of Genius",
          instructions: "Listen twice. Choose the best answer for L01–L06.",
          audio: "../../audio/b1-many-faces-of-genius.m4a",
          credit: { title: "The Many Faces of Genius", url: "https://opentextbc.ca/abealfreader5/chapter/the-many-faces-of-genius/", creator: "Written by Shantel Ivits; narrated by Jacqui Bishop · CC BY 4.0" },
          items: [
            { id: "L01", type: "mc", prompt: "What happened when Einstein applied to university?", options: ["He passed every subject.", "He failed the science section.", "He failed the non-science sections.", "He refused to take the exam."] },
            { id: "L02", type: "mc", prompt: "Which achievement is connected with Winston Churchill?", options: ["Composing famous music", "Becoming a scientist", "Winning an Oscar", "Winning a Nobel Prize"] },
            { id: "L03", type: "mc", prompt: "Why is Whoopi Goldberg mentioned?", options: ["She became a teacher.", "She succeeded despite literacy difficulties.", "She invented a school test.", "She studied with Einstein."] },
            { id: "L04", type: "mc", prompt: "What do the three opening examples show?", options: ["School success measures every kind of intelligence.", "Intelligence is more complex than test results.", "Famous people never finish school.", "Science is the most important subject."] },
            { id: "L05", type: "mc", prompt: "Scientists", options: ["all use the same definition of intelligence.", "only study mathematical ability.", "have stopped researching intelligence.", "do not agree on one definition."] },
            { id: "L06", type: "mc", prompt: "One definition of intelligence is the ability to", options: ["avoid all new situations.", "remember every fact.", "solve problems and adapt.", "win school prizes."] }
          ]
        },
        {
          title: "Listening Task 2 — The Many Pathways to Knowledge",
          instructions: "Listen twice. Answer L07–L12 in no more than four words and/or a number.",
          audio: "../../audio/b1-many-pathways-to-knowledge.m4a",
          credit: { title: "The Many Pathways to Knowledge", url: "https://opentextbc.ca/abealfreader5/chapter/the-many-pathways-to-knowledge/", creator: "Written by Shantel Ivits; narrated by Jacqui Bishop · CC BY 4.0" },
          items: [
            { id: "L07", type: "text", prompt: "At what stage of life do many skilled people begin learning?" },
            { id: "L08", type: "text", prompt: "How many hours a week do they often practise?" },
            { id: "L09", type: "text", prompt: "For at least how long do they practise at this level?" },
            { id: "L10", type: "text", prompt: "What level of challenges do they choose?" },
            { id: "L11", type: "text", prompt: "What can intelligence be built with?" },
            { id: "L12", type: "text", prompt: "Give one home or social factor that can make learning harder." }
          ]
        }
      ]
    }
  ]
};
