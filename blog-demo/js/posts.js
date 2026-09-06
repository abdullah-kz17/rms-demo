const AUTHORS = {
  'Maren Aoki': { role: 'Culture & Essays', bio: 'Maren founded The Daily Loom in 2019 and still edits every issue. She writes mostly about attention, community and the small rituals that hold a life together.', image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=200&q=80' },
  'Leo Marsh': { role: 'Travel', bio: 'Leo has spent the last six years travelling slowly and writing about the places tour guides skip. He is currently based between Lisbon and wherever the story is.', image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=200&q=80' },
  'Priya Nair': { role: 'Food & Life', bio: 'Priya writes about food as a daily practice rather than a performance. She trained as a chef before turning to writing, and still cooks everything she reviews.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80' },
  'Devon Cole': { role: 'Tech', bio: 'Devon covers technology from the outside — what it does to attention, habits and relationships, more than what it does on a spec sheet.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80' }
};

const POSTS = [
  {
    id: 1, category: 'Culture', title: 'The Quiet Art Of Doing Nothing, On Purpose',
    excerpt: 'Why the busiest people you know are starting to schedule empty time — and what it\'s actually doing to their work.',
    date: 'Sept 2, 2026', readTime: '7 min read', author: 'Maren Aoki', tags: ['Mindfulness', 'Slow Living'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'A friend of mine, a product manager who used to answer emails from bed, now blocks ninety minutes on Wednesday afternoons for what her calendar calls "nothing." No phone, no notebook, no walk with a podcast in her ears. Just nothing. When I asked what she does during it, she said the point is that there isn\'t an answer to that question.' },
      { type: 'h2', text: 'The productivity trap of "productive rest"' },
      { type: 'p', text: 'We have gotten very good at rebranding rest as another form of output. Meditation apps track your streak. Journaling becomes a habit to optimize. Even walks get measured in steps. The busiest people I interviewed for this piece weren\'t rejecting rest — they were rejecting the idea that rest needs to justify itself.' },
      { type: 'quote', text: 'The nothing isn\'t empty. It\'s where the next good idea has room to show up.' },
      { type: 'p', text: 'There is a reasonable body of research on mind-wandering and creative insight, but you don\'t need a citation to notice it in your own life: the shower thought, the idea that arrives on a walk you took to escape your desk, not to solve anything on it.' },
      { type: 'h2', text: 'What it actually looks like' },
      { type: 'p', text: 'For most people this doesn\'t look like a silent retreat. It looks like sitting on a train without opening a phone. It looks like fifteen minutes after dinner with nowhere to be. Small, boring, unbillable pockets of time that we\'ve trained ourselves to fill on reflex.' },
      { type: 'p', text: 'Try one this week. Not an hour — ten minutes. Put the phone in another room. Notice how long it takes before you reach for something that isn\'t there.' }
    ]
  },
  {
    id: 2, category: 'Travel', title: 'Five Days Alone In The Dolomites',
    excerpt: 'A solo hiking trip turned into the reset I didn\'t know I needed.',
    date: 'Sept 1, 2026', readTime: '9 min read', author: 'Leo Marsh', tags: ['Solo Travel'],
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'I booked the trip on a Tuesday night out of frustration more than adventure. Five days, one rifugio-to-rifugio route through the Dolomites, no plan beyond the first night\'s bed. I had never hiked alone for more than an afternoon.' },
      { type: 'h2', text: 'Day one: the wrong kind of quiet' },
      { type: 'p', text: 'The first few hours were uncomfortable in a way I hadn\'t expected. Not physically — the trail was forgiving — but mentally. Without anyone to narrate the view to, I kept reaching for my phone to photograph things I hadn\'t actually looked at yet.' },
      { type: 'quote', text: 'By day three the silence stopped feeling like something missing and started feeling like something I\'d gained.' },
      { type: 'h2', text: 'What changed' },
      { type: 'p', text: 'Somewhere around the Alta Via 1, the compulsion to document eased off. I started arriving at overlooks and just standing there for ten minutes before touching my camera. Meals at the rifugios, shared with strangers at long communal tables, became the highlight of each day rather than an afterthought.' },
      { type: 'p', text: 'I came home with fewer photos than I expected and remember more of the trip than any I\'ve taken with company. That trade felt, and still feels, entirely worth it.' }
    ]
  },
  {
    id: 3, category: 'Food', title: 'The One-Pan Dinners That Saved My Week',
    excerpt: 'Seven recipes for nights when cooking feels like one task too many.',
    date: 'Aug 29, 2026', readTime: '6 min read', author: 'Priya Nair', tags: ['Cooking'],
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'There is a specific kind of tired where the idea of chopping an onion feels like a personal insult. This is a list for those nights — meals that ask for one pan, one cutting board, and the bare minimum of decision-making.' },
      { type: 'h2', text: 'The rules I cook by on hard nights' },
      { type: 'list', items: [
        'One pan or sheet, no exceptions — the sink can wait until morning',
        'Whatever vegetable is closest to going soft in the fridge',
        'A starch that doesn\'t need separate boiling: rice cooked in the same pan, or bread on the side',
        'Salt and acid at the end, always — it fixes more than you\'d think'
      ] },
      { type: 'quote', text: 'A tired dinner doesn\'t have to be a sad one. It just has to be simple.' },
      { type: 'p', text: 'My go-to lately is a sheet-pan chickpea and sausage bake — everything goes in raw, twenty-five minutes at a high heat, a squeeze of lemon at the end. It has fed me on nights I genuinely couldn\'t have managed anything else, and it has also, more than once, impressed guests I didn\'t know were coming.' },
      { type: 'p', text: 'The full seven recipes will be up on the site over the next few weeks — starting with the chickpea bake next Tuesday.' }
    ]
  },
  {
    id: 4, category: 'Tech', title: 'I Deleted Every App Except Four. Here\'s What Happened',
    excerpt: 'A month-long experiment in radical digital minimalism.',
    date: 'Aug 26, 2026', readTime: '8 min read', author: 'Devon Cole', tags: ['Remote Work', 'Minimalism'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'The four that survived: phone, messages, maps, and a single music app. Everything else — social, news, games, even email on the home screen — went in a folder buried three swipes deep, then eventually off the phone entirely.' },
      { type: 'h2', text: 'Week one: the phantom reach' },
      { type: 'p', text: 'For the first four or five days, I caught my thumb reaching for where an app used to be dozens of times a day. Muscle memory outlasts intention by a wide margin. It wasn\'t until the second week that the reflex actually started to fade.' },
      { type: 'quote', text: 'The apps weren\'t the problem. The problem was that they were all one tap away, all the time.' },
      { type: 'h2', text: 'What I got back' },
      { type: 'p', text: 'Roughly ninety minutes a day, by my phone\'s own screen-time count — most of it previously spent in small, involuntary sessions between other tasks. I read four books that month. I also missed two pieces of actually important news that would have reached me faster through an app, which is the honest trade-off nobody selling you digital minimalism wants to mention.' },
      { type: 'p', text: 'A month later, three of the deleted apps are back, reinstalled deliberately and used on a schedule rather than a reflex. That middle ground has held for longer than the extreme version ever would have.' }
    ]
  },
  {
    id: 5, category: 'Culture', title: 'What Small Towns Get Right About Community',
    excerpt: 'Notes from six months of working remotely out of towns under 5,000 people.',
    date: 'Aug 22, 2026', readTime: '7 min read', author: 'Maren Aoki', tags: ['Remote Work', 'Slow Living'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'Six towns, six months, one laptop. I went looking for cheap rent and good light for photos. What I found, almost everywhere, was a version of belonging that I hadn\'t experienced since I was a kid.' },
      { type: 'h2', text: 'The diner test' },
      { type: 'p', text: 'By the third visit to the same diner, someone remembered my order. By the fifth, they asked about the piece I was writing. In a city, that kind of familiarity takes years, if it arrives at all. In a town of four thousand people, it took two weeks.' },
      { type: 'quote', text: 'Small towns aren\'t quieter because less is happening. They\'re quieter because more of what happens, happens in view of each other.' },
      { type: 'h2', text: 'The trade-offs, honestly' },
      { type: 'p', text: 'It isn\'t all upside. Anonymity has its uses, and I missed it. Specialist services — a good physiotherapist, a decent bookstore — were often an hour\'s drive away. But the baseline sense of being known, even a little, by the people around me is something I\'m still trying to recreate now that I\'m back in a bigger city.' }
    ]
  },
  {
    id: 6, category: 'Life', title: 'The Two-Minute Journal Habit That Actually Stuck',
    excerpt: 'Forget the elaborate morning pages — this is the version that survives busy weeks.',
    date: 'Aug 18, 2026', readTime: '5 min read', author: 'Priya Nair', tags: ['Journaling'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'I have started and abandoned morning pages more times than I can count. Three pages, longhand, first thing — a beautiful idea that dies the first time I oversleep or travel.' },
      { type: 'h2', text: 'What replaced it' },
      { type: 'p', text: 'Three lines, most nights, in the notes app I already have open: one thing that happened, one thing I noticed, one thing I\'m carrying into tomorrow. No prompts, no streak tracker, no guilt when a night gets skipped.' },
      { type: 'quote', text: 'The habit that survives is the one small enough to fit into the worst version of your day, not the best one.' },
      { type: 'h2', text: 'Eight months in' },
      { type: 'p', text: 'I have missed maybe twenty nights out of two hundred and forty. Reading back through them isn\'t dramatic — most entries are mundane — but as a record of an actual, unpolished year, it is more honest than anything I ever managed with morning pages.' }
    ]
  },
  {
    id: 7, category: 'Travel', title: 'The Coastal Towns Everyone Skips On Their Way South',
    excerpt: 'Three under-the-radar stops worth the detour on any Mediterranean road trip.',
    date: 'Aug 14, 2026', readTime: '6 min read', author: 'Leo Marsh', tags: ['Solo Travel'],
    image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'Most road trips down this stretch of coast follow the same three or four towns everyone has seen on a feed. These three sit twenty minutes off that route and see a fraction of the traffic.' },
      { type: 'h2', text: 'The harbour with no name on the map apps' },
      { type: 'p', text: 'A working fishing harbour, still — not staged for tourists. The best meal of the whole trip was at a place with four tables and no menu; you eat whatever came in that morning.' },
      { type: 'quote', text: 'The towns worth the detour are usually the ones without a sign pointing to them.' },
      { type: 'h2', text: 'Timing the visit' },
      { type: 'p', text: 'Go in the shoulder season if you can — late September rewards you with warm water and towns that haven\'t emptied out for winter yet, without the July crowds that have started creeping even into these smaller stops.' }
    ]
  },
  {
    id: 8, category: 'Life', title: 'Learning To Sit With Boredom Again',
    excerpt: 'What happened when I banned my phone from every waiting room for a month.',
    date: 'Aug 10, 2026', readTime: '5 min read', author: 'Maren Aoki', tags: ['Mindfulness'],
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'Waiting rooms, queues, the elevator, the kettle boiling — all of it used to be phone time by default. For one month I made a rule: no phone in any waiting-adjacent moment under ten minutes.' },
      { type: 'h2', text: 'The first two weeks were rough' },
      { type: 'p', text: 'Boredom, it turns out, is a skill that atrophies. I noticed a low hum of restlessness in nearly every waiting room, checkout line, and elevator ride — a feeling I hadn\'t clocked in years because I\'d never given it room to surface.' },
      { type: 'quote', text: 'Boredom isn\'t empty time. It\'s time your mind hasn\'t been told what to do with yet.' },
      { type: 'p', text: 'By the end of the month, the restlessness had mostly faded, replaced by something closer to noticing — the pattern on a waiting room floor, a stranger\'s conversation, my own unresolved thoughts finally getting a turn to speak.' }
    ]
  },
  {
    id: 9, category: 'Food', title: 'The Neighbourhood Cafés That Made Me A Regular',
    excerpt: 'Three counters, three baristas who know my order, and why that matters.',
    date: 'Aug 6, 2026', readTime: '5 min read', author: 'Priya Nair', tags: ['Cooking', 'Slow Living'],
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'There is a particular kind of comfort in a barista starting your drink before you finish saying your name. It took each of these three cafés about six visits to get there.' },
      { type: 'h2', text: 'Why it\'s worth the loyalty' },
      { type: 'p', text: 'Chain coffee is consistent, which is its own virtue. But a neighbourhood café rewards return visits in a way a chain structurally can\'t: the staff remember you, the space starts to feel like an extension of your own routine.' },
      { type: 'quote', text: 'Being a regular somewhere is one of the last free memberships left.' },
      { type: 'p', text: 'All three are within walking distance of each other, which was an accident of where I ended up living rather than a plan — but it means a slow Sunday now has an actual circuit to it.' }
    ]
  },
  {
    id: 10, category: 'Culture', title: 'Why We Still Write Letters In 2026',
    excerpt: 'A short defence of slow correspondence in an instant-everything world.',
    date: 'Aug 2, 2026', readTime: '6 min read', author: 'Devon Cole', tags: ['Slow Living'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'I write four or five physical letters a month, to people I could text in half a second. The delay isn\'t a bug in the format — it\'s the entire point.' },
      { type: 'h2', text: 'What slowness changes' },
      { type: 'p', text: 'A text gets answered in the gaps of a day. A letter gets answered when someone has actually sat down, with nothing else competing for their attention, and decided what they want to say. The quality of the thinking on the other end is different, every time.' },
      { type: 'quote', text: 'A letter is the only message format left that assumes you\'ll have to wait for the reply — and that waiting turns out to be worth something.' },
      { type: 'p', text: 'I\'m not arguing anyone should abandon texting. I\'m arguing that one slow channel, kept open for the people who matter most, does something a fast one structurally can\'t.' }
    ]
  },
  {
    id: 11, category: 'Life', title: 'Building A Reading Habit That Outlasts January',
    excerpt: 'The one-page rule that finally made reading a daily habit instead of a resolution.',
    date: 'Jul 28, 2026', readTime: '5 min read', author: 'Leo Marsh', tags: ['Minimalism'],
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1400&q=80',
    content: [
      { type: 'p', text: 'Every January I resolve to read more. Every February the resolution is quietly dead. The thing that finally fixed it wasn\'t a goal — it was shrinking the unit of success to something almost embarrassingly small.' },
      { type: 'h2', text: 'The one-page rule' },
      { type: 'p', text: 'One page a night, minimum. Not a chapter, not thirty minutes — one page. Most nights I read more once I\'ve started, but the commitment is small enough that skipping it feels genuinely silly rather than understandably human.' },
      { type: 'quote', text: 'A goal you can\'t fail at on your worst day is a goal that survives your worst day.' },
      { type: 'p', text: 'Eleven months in, I\'ve finished more books this year than the previous three combined — not because I read more per session, but because I almost never skip a day entirely, and days compound.' }
    ]
  }
];
