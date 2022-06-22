"use strict";
import axios from 'axios';

/**** NOTE: The Madlibs API was down friday and saturday. Unfortunate timing.
  So I developed the assessment using the static list below. It is back up today,
  so I'll see about adding it back in. -update: didn't get to it. */

const MADLIB_API = 'http://madlibz.herokuapp.com/api/random';

// I've lifted a selection of madlibs from their GH profile.
// from https://github.com/HermanFassett/madlibz/blob/master/data/templates.json
const madlibs = [
  {
    "title": "Hello ____!",
    "blanks": ["noun"],
    "value": ["Hello, ", 0]
  },
  {
    "title": "How To Cross a Piranha-Infested River",
    "blanks": ["foreign country", "adverb", "adjective", "animal",
      "verb ending in 'ing'", "verb", "verb ending in 'ing'",
      "adverb", "adjective", "a place", "type of liquid", "part of the body", "verb"],
    "value": ["If you are traveling in ", " and find yourself having to cross a piranha-filled river, here's how to do it ",
      ": \n* Piranhas are more ", " during the day, so cross the river at night.\n* Avoid areas with netted ",
      " traps--piranhas may be ", " there looking to ", " them!\n* When ", " the river, swim ",
      ". You don't want to wake them up and make them ", "!\n* Whatever you do, if you have an open wound, try to find another way to get back to the ",
      ". Piranhas are attracted to fresh ", " and will most likely take a bite out of your ", " if you ", " in the water!", 0]
  },
  {
    "title": "Three Little Pigs",
    "blanks": ["adjective", "verb", "verb", "verb", "plural noun", "verb", "verb", "past tense verb", "plural noun", "adjective", "verb",
      "plural noun", "noun", "verb", "past tense verb", "noun", "noun", "noun", "past tense verb", "adjective", "past tense verb",
      "past tense verb", "noun", "past tense verb"],
    "value": ["Once up a time, there were three ", " pigs. One day, their mother said, \"You are all grown up and must ", " on your own.\" So they left to ",
      " their houses. The first little pig wanted only to ", " all day and quickly built his house out of ", ". The second little pig wanted to ",
      " and ", " all day so he ", " his house with ", ". The third ", " pig knew the wolf lived nearby and worked hard to ", " his house out of ",
      ". One day, the wolf knocked on the first pig's ", ". \"Let me in or I'll ", " your house down!\" The pig didn't, so the wolf ", " down the ",
      ". The wolf knocked on the second pig's ", ". \"Let me in or I'll blow your ", " down!\" The pig didn't, so the wolf ",
      " down the house. Then the wolf knocked on the third ", " pig's door. \"Let me in or I'll blow your house down!\" The little pig didn't so the wolf ",
      " and ", ". He could not blow the house down. All the pigs went to live in the ", " house and they all ", " happily ever after.", 0]
  },
  {
    "title": "Talk Like a Pirate",
    "blanks": ["noun", "adjective", "verb", "adverb", "noun", "adjective", "plural noun", "plural noun", "plural noun", "part of the body", "noun",
      "noun", "noun", "noun", "part of the body"],
    "value": ["Ye can always pretend to be a bloodthirsty ", ", threatening everyone by waving yer ", " sword in the air, but until ye learn to ",
      " like a pirate, ye'll never be ", " accepted as an authentic ", ". So here's what ye do: Cleverly work into yer daily conversations ",
      " pirate phrases such as \"Ahoy there, ", ", \"\"Avast, ye ", ",\" and \"Shiver me ", ".\" Remember to drop all yer gs when ye say such words as sailin', spittin', and fightin'. This will give ye a/an ",
      " start to being recognized as a swashbucklin' ", ". Once ye have the lingo down pat, it helps to wear a three-cornered ", " on yer head, stash a/an ",
      " in yer pants, and keep a/an ", " perched atop yer ", ". Aye, now ye be a real pirate!", 0]
  },
  {
    "title": "How to Date the Coolest Guy/Girl in School",
    "blanks": ["plural noun", "adverb", "verb", "article of clothing", "body part", "adjective", "noun", "plural noun", "another body part", "plural noun",
      "another body part", "noun", "noun", "verb ending in 'ing'", "adjective", "adjective", "verb"],
    "value": ["It's simple. Turn the ", ". Make him/her want ", " to date you. Make sure you're always dressed to ", ". Each and every day, wear a/an ",
      " that you know shows off your ", " to ", " advantage and make your ", " look like a million ", ". Even if the two of you make meaningful ",
      " contact, don't admit it. No hugs or ", ". Just shake his/her ", " firmly. And remember, when he/she asks you out, even though a chill may run down your ",
      " and you can't stop your ", " from ", ", just play it ", ". Take a long pause before answering in a very ", " voice. \"I'll have to ",
      " it over.\"", 0]
  },
  {
    "title": "The Fun Park",
    "blanks": ["adjective", "plural noun", "noun", "adverb", "number", "past tense verb", "adjective ending in -est", "past tense verb", "adverb", "adjective"],
    "value": ["Today, my fabulous camp group went to a(an) ", " amusement park. It was a fun park with lots of cool ",
      " and enjoyable play structures. When we got there, my kind counselor shouted loudly, \"Everybody off the ",
      ".\" My counselor handed out yellow tickets, and we scurried in. I was so excited! I couldn't figure out what exciting thing to do first. I saw a scary roller coaster I really liked so, I ",
      "  ran over to get in the long line that had about ", " people in it. when I finally got on the roller coaster I was ",
      ". In fact, I was so nervous my two knees were knocking together. This was the ", " ride I had ever been on! In about two minutes I heard the crank and grinding of the gears. Thats when the ride began! When I got to the bottom, I was a little ",
      " but I was proud of myself. The rest of the day went ", ". It was a ", " day at the fun park.", 0]
  },
  {
    "title": "A Spooky Campfire Story",
    "blanks": ["adjective", "adjective", "number", "adjective", "animal", "noun", "animal", "name", "verb", "adjective", "adjective"],
    "value": ["Every summer, I get totally amped and ", " to go camping in the deep, ", " forests. It's good to get away from it all - but not too far, like getting lost! Last year, my friend and I went hiking and got lost for ",
      " hour(s). We started off on a(n) ", " adventure, but we kept losing the trail. Night began to fall, and when we heard the howls of a ",
      ", we began to panic. It was getting darker and our flashlights were running on ", ". I'm sure glad my pet ", ", ", ", was with us. He is one gifted creature, because he was able to guide us back by ",
      " the ", " s'mores by the campfire. This year, before setting off on an ", " journey, I'll be sure to have working flashlights - and of course, my gifted pet!", 0]
  },
  {
    "title": "Weird News",
    "blanks": ["noun", "place", "verb ending in ing", "noun", "name", "verb", "noun", "verb", "noun", "part of body", "type of liquid", "place", " past tense verb ", "foreign country", "verb", "noun", "past tense verb", "adjective", "verb", "noun", "plural noun"],
    "value": ["A ", " in ", " was arrested this morning after he was caught ", " in front of ", ". ", " had a history of ", ", but no one-not even his ", "-ever imagined he'd ", " with a ", " stuck in his ", ". After drinking a ", ", cops followed him to a ",
      " where he reportedly  ", "in the fry machine. Later, a woman from ", " was charged with a similar crime. But rather than ", "with a ", ", she ", "with a ", " dog. Either way, we imagine that after witnessing him ", " with a ", " there are probably a whole lot of ", " that are going to need some therapy!", 0]
  },
  {
    "title": "All About Vampires",
    "blanks": ["adjective", "adjective", "body part", "verb ending in -ing", "verb", "verb", "verb", "noun", "verb", "verb", "body part", "verb", "verb", "verb", "noun", "body part", "adjective"],
    "value": ["Vampires are ", "! They have ", " ", " for ", " blood. The sun can ", " vampires, so they only ", " at night and ", " during the day. Vampires also don't like ", " so ", " it or ", " it around your ",
      " to keep them away. If a vampire ", "s a person and ", "s their blood, they become a vampire, too. The only way to ", " a vampire is with a ", " through the ", ", but ",
      " luck getting close enough to one!", 0]
  },
  {
    "title": "Our Cafeteria",
    "blanks": ["adjective", "verb", "adjective", "noun", "verb", "adjective", "noun", "adjective", "adjective", "noun", "noun"],
    "value": ["Our school cafeteria has really ", " food. Just thinking about it makes my stomach ", ". The spaghetti is ", " and tastes like ", ". One day, I swear one of my meatballs started to ",
      "! The turkey tacos are totally ", " and look kind of like old ", ". My friend Dana actually likes the meatloaf, even though it's ", " and ", ". I call it \"Mystery Meatloaf\" and think it's really made out of ",
      ". My dad said he'd make my lunches, but the first day, he made me a sandwich out of ", " and peanut butter! I think I'd rather take my chances with the cafeteria!", 0]
  },
  {
    "title": "Trip to the Park",
    "blanks": ["adjective", "adjective", "noun", "adjective", "adjective", "verb", "verb", "verb", "adjective", "verb"],
    "value": ["Yesterday, my friend and I went to the park. On our way to the ", " park, we saw big ", " balloons tied to a ", ". Once we got to the ", " park, the sky turned ",
      ". It started to ", " and ", ". My friend and I ", " all the way home. Tomorrow we will try to go to the ", " park again and hopefully it doesnt ", "!", 0]
  },
  {
    "title": "A Scary Halloween Story",
    "blanks": ["adjective", "name", "adjective", "noun", "verb", "animal", "adjective", "name", "adjective", "noun", "noun"],
    "value": ["They say my school is haunted; my ", " friend ", "says they saw a ", " ", " floating at the end of the hall near the cafeteria. Some say if you ",
      " down that hallway at night, you'll hear a ", " growling deeply. My ", " friend ", " saw a ", " ", " slithering under the tables once. I hope I never see any ",
      " crawling; eating lunch there is scary enough!", 0]
  },
  {
    "title": "Zombie Picnic",
    "blanks": ["verb", "verb", "body part", "body part", "body part", "noun", "adjective", "type of liquid", "body part", "verb", "adjective", "body part", "body part"],
    "value": ["If zombies had a picnic, what would they ", " to eat? Everybody knows zombies love to ", " ", ", but did you know they also enjoy ", " and even ",
      "? The best ", " for a zombie picnic is when the moon is ", ". At least one zombie will bring ", " to drink, and it's not a picnic without ",
      " with extra flesh on top. After eating, zombies will ", " ", " games like kick the ", " and ", " toss. What fun!", 0]
  },
  {
    "title": "North Pole",
    "blanks": ["plural noun", "adjective", "plural noun", "verb", "verb", "number", "noun", "adjective", "plural noun", "plural noun", "animal", "verb", "verb", "plural noun"],
    "value": ["Santa, Mrs. Claus, and the ", " live at the North pole. The weather is always ", " there, but the ", " ", " toys for Santa to ",
      " to children on Christmas, so holiday cheer lasts year-round there. There's no land at the North Pole; instead there is a ", "-inch thick sheet of ",
      " there, ", " enough to hold Santa's Village! The ", " help load Santa's sleigh with ", ", and Santa's ", " ", " his sleigh on Christmas Eve to ",
      " ", " to children around the entire world.", 0]
  },
  {
    "title": "Snowstorm!",
    "blanks": ["noun", "adjective", "noun", "noun", "adjective", "adjective", "adjective", "noun", "noun", "adjective"],
    "value": ["Weather plays an important part in our ", "s everyday. What is weather, you ask? Accoring to ", " scientists, who are known as meteorologists, weather is what the ",
      " is like at any given time of the ", ". It doesn't matter if the air is ", " or ", ", it's all weather. When vapors in ", " clouds condense, we have ",
      " and snow. A lot of ", " means a ", " snowstorm!", 0]
  },
  {
    "title": "Learning About History",
    "blanks": ["adjective", "noun", "nouns", "adjective", "nouns", "nouns", "animals", "nouns", "nouns", "number", "number", "nouns", "adjective", "nouns"],
    "value": ["History is ", " because we learn about ", " and ", " that happened long ago. I can't believe people used to dress in ", " clothing and kids played with ",
      " and ", " instead of video games. Also, before cars were invented, people actually rode ", "! People read ", " instead of computers and tablets, and sent messages via ",
      " that took ", " days to arrive. I wonder how kids will view my life in ", " year(s); maybe they will ride flying cars to school and play with ", " and ", " ", "!", 0]
  },
  {
    "title": "Star Wars",
    "blanks": ["adjective", "noun", "adjective", "noun; place", "adjective", "adjective", "adjective", "adjective", "plural noun", "adjective", "plural noun", "plural noun", "adjective",
      "noun", "verb", "adjective", "verb", "plural noun; type of job", "adjective", "verb", "adjective"],
    "value": ["Star Wars is a ", " ", " of ", " versus evil in a ", " far far away. There are ", " battles between ", "ships in ", " space and ", " duels with ", " called ",
      " sabers. ", " called \"droids\" are helpers and ", " to the heroes. A ", " power called The ", " ", "s people to do ", " things, like ", " ", " use The Force for the ",
      " side and the Sith ", " it for the ", " side.", 0]
  }
];

/** Randomly select n number of madlibs */
function getNumMadlibs(n) {
  const output = [];

  while (n > 0) {
    let i = Math.floor(Math.random() * madlibs.length);
    if (!output.includes(madlibs[i])) {
      output.push(madlibs[i]);
      n--;
    }
  }
  return output;
}


export default getNumMadlibs;