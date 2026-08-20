window.EMILY_TEST = {
  id: "emily-a2-diagnostic-v1",
  level: "A2",
  title: "A2 English Diagnostic",
  subtitle: "Grammar · Vocabulary · Reading · Listening",
  total: 48,
  sections: [
    {
      name: "Grammar",
      title: "Grammar",
      instructions: "Choose the best answer for G01–G12.",
      items: [
        { id: "G01", type: "mc", prompt: "My sister ___ coffee every morning.", options: ["drink", "is drinking", "drank", "drinks"] },
        { id: "G02", type: "mc", prompt: "Look! The children ___ in the snow.", options: ["play", "played", "are playing", "have played"] },
        { id: "G03", type: "mc", prompt: "We ___ to the museum last Saturday.", options: ["go", "went", "have gone", "are going"] },
        { id: "G04", type: "mc", prompt: "There ___ any milk in the fridge.", options: ["isn't", "aren't", "hasn't", "wasn't"] },
        { id: "G05", type: "mc", prompt: "I haven't got ___ brothers, but I have two sisters.", options: ["some", "much", "a", "any"] },
        { id: "G06", type: "mc", prompt: "This bag is ___ than that one.", options: ["heavy", "heavier", "more heavy", "the heaviest"] },
        { id: "G07", type: "mc", prompt: "You ___ show your passport at the airport.", options: ["may", "could", "would", "have to"] },
        { id: "G08", type: "mc", prompt: "When I was six, I ___ swim across the pool.", options: ["can", "could", "must", "should"] },
        { id: "G09", type: "mc", prompt: "We're going ___ visit Budapest tomorrow.", options: ["at", "for", "to", "—"] },
        { id: "G10", type: "mc", prompt: "Tom gave ___ a birthday card.", options: ["I", "me", "my", "mine"] },
        { id: "G11", type: "mc", prompt: "The lesson starts ___ nine o'clock.", options: ["in", "on", "at", "by"] },
        { id: "G12", type: "mc", prompt: "If it rains tomorrow, we ___ at home.", options: ["stay", "stayed", "will stay", "would stay"] }
      ]
    },
    {
      name: "Vocabulary",
      title: "Vocabulary",
      instructions: "Choose the word or phrase that best completes each sentence.",
      items: [
        { id: "V01", type: "mc", prompt: "You can borrow books from a ___.", options: ["library", "bakery", "chemist's", "station"] },
        { id: "V02", type: "mc", prompt: "The opposite of expensive is ___.", options: ["crowded", "heavy", "quiet", "cheap"] },
        { id: "V03", type: "mc", prompt: "I need to ___ an appointment with the dentist.", options: ["do", "take", "put", "make"] },
        { id: "V04", type: "mc", prompt: "Hurry up, or we'll ___ the bus.", options: ["miss", "lose", "leave", "forget"] },
        { id: "V05", type: "mc", prompt: "The café was very ___, so we could not find a table.", options: ["empty", "crowded", "polite", "delicious"] },
        { id: "V06", type: "mc", prompt: "After walking for five hours, everyone felt ___.", options: ["tired", "tidy", "lucky", "ready"] },
        { id: "V07", type: "mc", prompt: "The shop assistant gave me a ___ after I paid.", options: ["recipe", "receipt", "ticket", "menu"] },
        { id: "V08", type: "mc", prompt: "The person who lives next door is my ___.", options: ["passenger", "customer", "guest", "neighbour"] },
        { id: "V09", type: "mc", prompt: "It's dark in here. Please ___ the light.", options: ["turn on", "look for", "pick up", "take off"] },
        { id: "V10", type: "mc", prompt: "The weather ___ says it will be sunny tomorrow.", options: ["forecast", "traffic", "journey", "season"] },
        { id: "V11", type: "mc", prompt: "The doctor gave me some ___ for my headache.", options: ["medicine", "message", "exercise", "appointment"] },
        { id: "V12", type: "mc", prompt: "If you practise regularly, your English will ___.", options: ["borrow", "improve", "arrive", "invite"] }
      ]
    },
    {
      name: "Reading",
      title: "Reading",
      tasks: [
        {
          title: "Reading Task 1 — An email about a club",
          instructions: "Read the email. Choose the best answer for R01–R06.",
          passage: "<h3>From: Nóra<br>To: Petra<br>Subject: Photography club</h3><p>Hi Petra,</p><p>Our new photography club starts next Wednesday. We normally meet in Room 14, but the room is being painted, so for the first two weeks we will use the school library. The club starts at 4:15 and finishes at 5:30.</p><p>You can bring a phone or a camera. Do not worry if you do not have a camera because the school has six cameras that students can share. For our first activity, we plan to walk beside the river and take pictures of the old bridge. If the weather is wet, we will stay inside and learn how to edit photos.</p><p>The club is free. However, please bring €2 on 18 September because we are taking a bus to a photography exhibition. If you want to join, reply to this email by Monday.</p><p>See you,<br>Nóra</p>",
          items: [
            { id: "R01", type: "mc", prompt: "When does the photography club start?", options: ["This Monday", "Next Wednesday", "18 September", "In two weeks"] },
            { id: "R02", type: "mc", prompt: "Where will the club meet at first?", options: ["Room 14", "Beside the river", "At an exhibition", "The school library"] },
            { id: "R03", type: "mc", prompt: "What time does the club finish?", options: ["4:15", "5:00", "5:30", "6:00"] },
            { id: "R04", type: "mc", prompt: "What does Petra NOT need to own?", options: ["A phone", "A camera", "A bus ticket", "A school bag"] },
            { id: "R05", type: "mc", prompt: "What will the students do if it rains?", options: ["Cancel the club", "Visit the old bridge", "Edit photos indoors", "Go to the exhibition"] },
            { id: "R06", type: "mc", prompt: "What must Petra do by Monday?", options: ["Pay €2", "Bring a camera", "Reply to the email", "Choose six photos"] }
          ]
        },
        {
          title: "Reading Task 2 — The Green Box",
          instructions: "Read the information. Choose the best answer for R07–R12.",
          passage: "<h3>The Green Box: borrow, use and return</h3><p>The Green Box is a new service for people who live in Szeged. It keeps useful household items that many people need only sometimes, such as a drill, a large cake tin, a tent and a carpet cleaner.</p><p>Any local resident can use the service after getting a free Green Box card. Most items can be borrowed for four days. Members reserve an item online and collect it from the community centre between 3 p.m. and 7 p.m. on weekdays.</p><p>Before borrowing an electrical item, members must watch a short safety video. Staff check every item when it comes back. If something is damaged, the item is repaired before another person can use it.</p><p>The service is free, but returning things on time is important. A member who returns an item late cannot borrow anything else until the late item is back. The Green Box helps families save money, and it also means fewer useful things are thrown away.</p>",
          items: [
            { id: "R07", type: "mc", prompt: "What is the main purpose of the Green Box?", options: ["To sell cheap household items", "To lend items people do not often need", "To repair phones for local shops", "To collect money for the community centre"] },
            { id: "R08", type: "mc", prompt: "Who can get a Green Box card?", options: ["Only community-centre staff", "People over 18 only", "Visitors staying for four days", "Any local resident"] },
            { id: "R09", type: "mc", prompt: "How long can most items be borrowed?", options: ["One day", "Three days", "Four days", "One week"] },
            { id: "R10", type: "mc", prompt: "What must members do before borrowing an electrical item?", options: ["Pay a deposit", "Watch a safety video", "Call a repair shop", "Bring their own tools"] },
            { id: "R11", type: "mc", prompt: "What happens after a late return?", options: ["The member must buy the item.", "The centre closes the member's card forever.", "The member cannot borrow another item yet.", "The item is thrown away."] },
            { id: "R12", type: "mc", prompt: "Which title gives the best summary?", options: ["A new place to buy tools", "How to open a community centre", "Borrow useful things and reduce waste", "Why electrical items are dangerous"] }
          ]
        }
      ]
    },
    {
      name: "Listening",
      title: "Listening",
      tasks: [
        {
          title: "Listening Task 1 — Poetry and Hope",
          instructions: "Listen twice. Choose the best answer for L01–L06.",
          audio: "../../audio/a2-poetry-and-hope.m4a",
          credit: { title: "Poetry and Hope", url: "https://opentextbc.ca/abealfreader2/chapter/chapter-1/", creator: "Written by Shantel Ivits; narrated by Jacqui Bishop · CC BY 4.0" },
          items: [
            { id: "L01", type: "mc", prompt: "What do many people think about poems?", options: ["Poems are not for them", "Poets are always famous", "Poems are only about history"] },
            { id: "L02", type: "mc", prompt: "What can a good poet help people do?", options: ["Forget the real world", "See the world with new eyes", "Become professional writers"] },
            { id: "L03", type: "mc", prompt: "How is Langston Hughes described in the recording?", options: ["A museum guide", "A school teacher", "A professional athlete", "A black poet"] },
            { id: "L04", type: "mc", prompt: "What unfair situation did he grow up with?", options: ["He could not find books", "White people did not treat black people well", "Poets were not allowed to travel"] },
            { id: "L05", type: "mc", prompt: "What did Langston write about?", options: ["Buying books online", "Life in a museum", "How to become famous", "The need to make a better world"] },
            { id: "L06", type: "mc", prompt: "Why does the narrator say Langston's poems are still needed?", options: ["Nobody can read poems now", "People still treat black people unfairly", "Langston is still writing"] }
          ]
        },
        {
          title: "Listening Task 2 — Remembering Langston Hughes",
          instructions: "Listen twice. Answer L07–L12 in no more than three words and/or a number.",
          audio: "../../audio/a2-langston-legacy.m4a",
          credit: { title: "Remembering Langston Hughes", url: "https://opentextbc.ca/abealfreader2/chapter/chapter-8/", creator: "Written by Shantel Ivits; narrated by Jacqui Bishop · CC BY 4.0" },
          items: [
            { id: "L07", type: "text", prompt: "What illness did Langston Hughes have?" },
            { id: "L08", type: "text", prompt: "On what date did he die?" },
            { id: "L09", type: "text", prompt: "How old was he when he died?" },
            { id: "L10", type: "text", prompt: "Where are his ashes?" },
            { id: "L11", type: "text", prompt: "What art form is he remembered for?" },
            { id: "L12", type: "text", prompt: "What term is now used with pride?" }
          ]
        }
      ]
    }
  ]
};
