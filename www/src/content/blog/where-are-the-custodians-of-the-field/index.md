---
title: Where Are the Custodians of the Field?
publishDate: 2020-02-10T00:00:00Z
modifiedDate: 2021-08-11T00:00:00Z
---

> If software abstraction actually worked the way people pretend, then the "higher-level" you go, the more insulated you
> would be from implementation. Javascript in a browser would be the most stable, robust, unperturbable software,
> because it's so fully separated from the machine.
>
> -- Jonathan Blow [on Twitter][blow_quote]

Software productivity feels to me like it has lost its way. "[High][ruby_lang]-[level][python_lang]"
[programming][javascript_lang] [languages][java_lang] from the 1990s and 2000s have left a burdensome legacy that
engineers are ignoring. Despite having all these grand tools and languages, the actual output of our software, in terms
of features, capabilities, and robustness, is at a low point. All the while, the number of lines of code that we write
is just continuing to grow. I think that, instead, we should be taking a step back and reevaluating our return on
investment.

Dropbox just announced that they are now [type-checking 4 million lines of Python][dropbox_type_check] because
refactoring that much code is, they claim, too hard without it. Why does Dropbox need [4 million lines][million_lines]
of code in the first place? And, this isn't even all the code that Dropbox maintains, just the Python bits. Similarly,
Airbnb has [ditched React Native][airbnb_reactnative] "due to a variety of technical and organizational issues." If
you're like me, you may think, how can it be this hard to ship a room booking app, even with as many engineering
resources as Airbnb has and with all the bells and whistles that JavaScript and React Native offer?

To be clear, I don't blame Dropbox or Airbnb engineering. I certainly don't understand the full complexity of their
domain, nor do I claim that I could do any better, but my point is orthogonal. I thought the promise of high level
programming languages like Python was to liberate us from writing 4 million lines of code in the first place. I thought
Python was supposed to abstract away the difficulties and provide the modes of expression we need to avoid such deep
pits of despair. I don't mean to just pick on Python; my concerns could be applied to other tools born from the same
historical context, like Ruby, JavaScript, or Java. At the time, the design choices made a lot of sense: CPUs would keep
getting faster (Hint: [they have not][cpu_trends]) and that we wouldn't need all the performance most of the time
anyway. It must have seemed logical to trade in speed for managed runtimes and higher-level expression, due to the
perception that these resulted in more productivity. "No need to think too hard. And, damn, just look how easy it is to
get started."

```python
print("Look, ma! No malloc or free calls!")

a_type_error_waiting_to_happen = 3
print("The number is: " + a_type_error_waiting_to_happen)
```

I think we, as an industry, have yet to come to terms with how "easy to get started" does not mean "easy to maintain,
extend, and change." As it turns out, [simple isn't the same as easy][simple_easy]. What is the cost of convenience? All
the features that make us so productive might actually have downsides, the likes of which Dropbox and Airbnb are now
reeling from. It may be that the first time you see the code sharing capabilities of object inheritance or the
convenience of weak-typing coercion, you think to yourself, "Oh wow, I'll be faster with that. Sign me up, coach."
However, these "treasures" of expression are almost trivial, and they don't necessarily help you paint the big picture.
I've witnessed programmers go so far as to argue about whether or not a programming language should have semi-colons, as
if not physically typing semi-colons truly helps us to solve hard problems. Just look at this headline quote from the
Ruby homepage:

> A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that
> is natural to read and easy to write.

The authors chose to focus on the syntactic quality of their programming language as its selling point. Jeez, of all the
things. I've never heard a practitioner say, "If only the syntax of my programming language were better, I'd be able to
_actually_ solve this problem." And yet, your average Ruby programmer won't quiet down about how productive they are
because of the syntax. Perhaps what this imaginary Ruby programmer really meant was they are able to solve problems
_better_ or _faster_ because of the syntax, but I wouldn't exactly call the Ruby grammar simple. If you're one of these
semi-colon-hating Rubyists, I don't blame you, but I think you've been distracted.

To be fair, humans turn out to be bad at [bookkeeping][manual_mem_management] or otherwise boring, repetitive tasks. I
do think that some of the cognitive load of programming needs to be removed so that engineers can focus all their mental
faculties on the important or creative aspects. For instance, do I think we should go back to using conditional jump
codes instead of `for` loops and `if` blocks? Fuck no -- you can pry those abstractions from my cold, dead fingers.
However, I'm not sure that some of our other conventional approaches are really helping us. In fact, I claim they often
end up actively doing the opposite. We gave up the tedious and memory-unsafe `malloc` and `free` functions and gained a
garbage collector, but then we realized that those pesky GC pauses [spiked our tail latency][discord_rust]. Well, fuck
it, let's just work around these pause times by following some [rigorous rules][reduce_gc_rules] that end up sounding a
lot like the very tedium and error-proneness of manual memory management that we were trying to escape. Maybe it's time
for [a new model][rust_ownership].

Technical purity isn't everything, though. People have argued indefinitely about the best priorities for business, and
probably, when you're just trying to survive and find a market fit, you can't afford to think too hard about the
mounting technical debt and complexity. In this starry-eyed, Silicon-Valley-VC-funded world, time to market is all that
matters, right? Just keep hustling, write more code, and hope you'll make it. But that still doesn't explain why
"non-profit" technical efforts like programming languages have to repeat these same values. And because of that, what
happens to your company in the long run when you're stuck with the aftermath and a 2-million-line Java app?

I know I'm not [the only one][deep_work] clamoring for deeper thought in engineering; some are even proponents of
literal [slow programming][slow_programming]. But seriously, folks, where are the custodians of the field? Is "winning"
all that matters? Where is the emphasis on quality? Why aren't there more people looking around and saying, "we messed
up when we turned left at Banana St. and Clown Ave.?" My beloved GitHub, open-source culture is especially guilty of
this mentality, having become infected with shiny-logo and superficial getting-started-page syndrome. In this spirit,
projects like [Elm][elm_lang] are [pronounced dead][elm_dead] because of their slow, annual release cadences, as if
frequent releases are the only sign of quality. Yet, Elm has one of the [best developer experiences out
there][elm_compiler_msg] with outstanding, helpful compiler errors -- so much so, that [other languages are taking
note][rust_likes_elm] because deliberate, non-trivial design in service of developer quality of life matters.

I've come across objections to modern high-level programming languages that, at the surface, seem similar to mine. These
objections call for "back-to-fundamental" practices and re-embrace languages such as C. They also occasionally utilize
sexist rhetoric about what "real men" or "real programmers" should do. However, this kind of thinking is elitist and
exclusionary. The issue isn't that we have become "soft" or "[less of a programmer][xkcd_programmer]" by using Python or
Ruby. Instead, the issue is we have become so distracted by the high demands of businesses and users that we have
stopped meaningfully criticizing the very tools we rely on for productivity. Or, as Jonathan Blow identifies it, we are
only "pretending" that these high-level tools are meeting those demands. Constraints and insulation are useful, but I
think we are hiding the wrong details.

Approachability has been a driving force for a good number of the efforts I'm criticizing, and I'm not criticizing
approachability itself as a valuable goal. Relatedly, I don't want to discount the real, ethical issue here of how we
make tools and programming languages more open and inclusive because we do need to think about how to empower _all_
engineers. In the past, I've seen two approaches to improving inclusivity in programming language usage, neither of
which I've been satisfied with. The first purports that inclusivity can be accomplished through only community policy
and other social efforts. However, this approach is incomplete because it doesn't recognize the tight marriage of
technological and people problems. They're one and the same; don't be fooled into thinking that technological choices
don't have social impact or that technology is pristine and standalone. The second attempts to make tools "easier" to
understand and lower the intellectual barrier of entry. But, this is some weird, patronizing bullshit. How insulting
that we can't trust people (i.e., the historically disenfranchised) to grasp more technical details so we'll just make
it more "approachable." Yikes. No, expose all the nuances to professionals that they need to solve problems effectively,
be clear and honest about the chosen design constraints, and avoid "easier to get started" for its own sake.

Some of what I'm proposing here might require some pretty high buy-in and cognitive shift. We may have to dispose of
"trusted" solutions that have quite a bit of mileage on the tires. Which brings me to my final point: In this journey,
be brave, fair traveler! Courage might just be taking a step back, questioning, and being vocal about your concerns,
even when your complaints have mountains of historical momentum. Has garbage collection _really_ paid off? Perhaps even
small, "solved" problems, like the ancient and venerable Unix file descriptor, deserve a critical eye and not-so-gentle
reexamination. Is this _really_ the best abstraction for files and sockets, especially when these files and sockets are,
in fact, quite different from each other? Do I end up paying for conflating the two later with the same kinds of
complexity that the abstraction was supposed to save me from in the first place? Maybe what we mean when we say
"high-level," isn't so high-level after all.

[blow_quote]: https://twitter.com/jonathan_blow/status/1207815619355136001
[javascript_lang]: https://www.javascript.com/
[python_lang]: https://www.python.org/
[ruby_lang]: https://www.ruby-lang.org/en/
[java_lang]: https://www.java.com/en/
[dropbox_type_check]: https://blogs.dropbox.com/tech/2019/09/our-journey-to-type-checking-4-million-lines-of-python/
[million_lines]: https://www.visualcapitalist.com/millions-lines-of-code/
[airbnb_reactnative]: https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a
[cpu_trends]: https://www.karlrupp.net/2018/02/42-years-of-microprocessor-trend-data/
[simple_easy]: https://www.infoq.com/presentations/Simple-Made-Easy/
[manual_mem_management]: https://en.wikipedia.org/wiki/Manual_memory_management
[discord_rust]: https://blog.discordapp.com/why-discord-is-switching-from-go-to-rust-a190bbca2b1f
[reduce_gc_rules]: https://dzone.com/articles/how-to-reduce-long-gc-pause
[rust_ownership]: https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html
[deep_work]: https://www.7pace.com/blog/deep-work-in-the-age-of-distraction
[slow_programming]: https://ventrellathing.wordpress.com/2013/06/18/the-case-for-slow-programming/
[elm_lang]: https://elm-lang.org
[elm_dead]: https://www.reddit.com/r/elm/comments/7zk0dy/is_evan_killing_elms_momentum/
[elm_compiler_msg]: https://elm-lang.org/news/compiler-errors-for-humans
[rust_likes_elm]: https://blog.rust-lang.org/2016/08/10/Shape-of-errors-to-come.html
[xkcd_programmer]: https://xkcd.com/378/
