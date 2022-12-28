---
title: Programs Beyond the Pipeline
publishDate: 2022-12-29T00:00:00Z
layout: "@/layout/Page.astro"
---

> [I am] Becoming more and more aware that languages in the ML tradition (Haskell, Rust, OCaml, etc) are about a certain
> kind of linguistic game that the developers have fun playing, and not because it makes any software arrive quicker,
> behave righter, perform better, or last longer.
>
> -- Chris Done, on [Twitter][linguistic_game_tweet]

I am excitedly digesting this year's [Strange Loop][strange_loop_youtube] presentations. Usually Strange Loop focuses on
theoretical topics ranging from protocol correctness to well-formed type systems. However, in 2022, I am delighted to
see talks on more "practical" concerns of writing and operating software. In particular, Jack Rusher in ["Stop Writing
Dead Programs"][stop_dead_programs] and Jean Yang in ["Building Observability for 99%
Developers"][building_observability] delivered funny, helpful, and insightful presentations. Though they spoke on very
different topics, I was inspired by a common thread: they both rejected a deeply ingrained principle in software
development today -- that software can, and should be, "verified" before being shipped to users.

I think that the pursuit of perfect pre-deployment verification and "correctness by construction" design is dangerous
and distracting in the context of writing and operating "long-running processes," such as web apps and SaaS-y servers.
It seems to me that experienced engineers already admit that fully verifying the correctness of today's programs is not
practically possible, yet this idea still dominates what is considered to be "best practice." Moreover, I find that this
approach has insufficient impact on software quality. If we want to improve the services we provide to our users, we
need to instead reorient development ecosystems towards working with _running_ software. Our tools for dealing with
runtime complexities are sorely lacking.

<!-- endexcerpt -->

### Do Our Current Best Practices Have Meaningful Impact?

As the industry seems to define it, "best practices" revolve around certifying programs before deploying them. Following
this philosophy at work, I have advocated for more static analysis and automated testing, encouraged my teammates to use
techniques such as property-testing, and migrated hundreds of thousands of lines to TypeScript. I have mentored on how
to write effective tests and written full-fledged frameworks for making testing painless and fast. I have conducted
countless root-cause analysis post-mortems of production failures and as a result, implemented new verification steps to
our pre-production pipelines. I have ticked all these pre-deployment checkboxes in the name of correctness, quality, and
insurance against future failure.

However, if I am being honest, this work feels less impactful than I would have hoped. Yes, there are fewer typos and
"silly" mistakes, which have been prevented by our fancy compilers and static analysis tools. Yes, the code itself is
beautifully and automatically formatted. But, regrettably, incident count and severity metrics are not improving with
these efforts. Users still encounter crash and burn exceptions and unexplained state-change issues, even with elaborate
pre-deployment pipelines. It feels like software quality is not making progress. I agree with Rusher's sentiment that we
are writing "dead programs" and intentionally or not, working under an outdated premise that high-quality software
emerges from the program's text alone. It is easy to fall under the spell of what we call "correct by construction," but
I am becoming increasingly disenchanted with writing more tests, end-to-end browser automation, and continuous
integration verification. Jumping through all these pre-deployment hoops may create the illusion of robust software
while just adding complexity, increasing maintenance burden, impeding important code changes, or diluting resources.

What is so compelling about these "best practices" if our software services remain just as defective? Perhaps they are
compelling because programmers like writing code. Our work presents us with lexical puzzles, and many of us enjoy making
the pieces fit together and crafting algorithms that pass unit tests. The gratification of solving these puzzles is
partially why I myself started coding in the first place. But, scratching my itch while constructing new code does not
necessarily lead to satisfied users. I also see that we as an engineering community overvalue knowledge simply because
it was hard-earned, and that may also perpetuate the correct by construction mindset. For example, implementing fast and
non-flakey browser tests sounds like -- and in fact, is -- an impressive engineering challenge to overcome, but those
tests are not guaranteed to create a more reliable user experience. I think there must be better ways for us to use our
energy.

I do not mean that programming and earning expertise should not be fun. After all, joy in our craft can help us do
careful and patient work. Rather, I question whether we sometimes conflate feeling good during the production process
with producing software that _does good_. I believe Jack Rusher's and Chris Done's concerns are real: we are fooling
ourselves with so-called "modern" practices and programming languages. The industry has done well with wrangling text,
syntax, compilers, linters, test-runners, and package-managers, but often, these practices are more theatrical than
substantial.

### Turning Toward Fault Tolerance, Observability, and Longevity

As Rusher does, Yang also identifies that industry "best practices" that verify software as "correct by construction"
are inadequate for meeting today's expectations and are often hard to execute sustainably. What are our alternatives? I
propose that we improve software _environments_ and close what Yang calls the "observability gap." We should focus on
_running_ software: bettering the debugging experience, tolerating faults in production, and instrumenting code for
observability and introspection.

Right now, our programming environments do not give us the tools we need to deal with long-lived processes and large
numbers of state transformations. The latest interactive debuggers and introspection tools are primitive at best.
Services written in popular programming languages have no `ps` or `kill` commands, no `htop` and no live, attachable
state debuggers to help us understand and deal with the complexity of production. Just like they did 50 years ago, the
runtimes that support these languages all crash on failure, leaving behind, at best, a cryptic core dump. Though there
are exceptions, like the [BEAM][erlang_observer], which put our "modern" runtimes to shame and offer helpful insight
into the state of running systems, they are underappreciated in the industry.

The hyper-modern shop that deploys multiple times a day, where program state is "short-lived," does not escape this
problem. These so-called stateless processes are still backed by databases with effectively never-ending uptime and that
often have thousands of users concurrently reading and writing data. Even if we could ignore the lifetimes of our
program and database state, the organization or business that needs this software "continues to run." The code might
temporarily stop, but the people that use it never do.

Our tools have not evolved past the presumption that programs will be batch-executed until completion, like they did in
1970 on the company mainframe. In the world of SaaS and external APIs, implementations are dependent on how components
fit together, and the specification is based fluidly on the "observed" behavior of the system. The popular micro-service
architecture only exacerbates these effects because the state of the system is spread out across diverse and disjointed
computers and environments. Even if an organization were able to stick to a single, hyper-rigorous, and statically-typed
programming language, one would still contend with finicky networks or cloud computers that cannot be inspected fully.
The rising prevalence of business-critical, external APIs, such as Stripe, AWS, and Twilio, further abstract away
control and impede comprehension of the system. Our programming models and runtime environments are not built to handle
this tumultuous software landscape. Our standard practice is to build robustness into libraries rather than holistically
approach the problem from first principles.

Furthermore, it is remarkable to me that there is no standard way for runtime environments to maintain and expose
provenance of computed state, which is crucial for understanding failures at runtime. We are starved for ways to modify
and service programs in a safe and maintainable way while they are actively running. I would love a method for debugging
a live server, and observing its state, history, and output in a real-time and understandable format. Consider the
following example code:

```ts
function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

// Wow, so clean, so elegant, and typechecked!
let numbers = [1, 78, 4];
let avg = average(numbers);

// But what happens when unpredicted state changes occur, and the
// support team deletes this collection? In reality, this write
// occurs nowhere near the line that crashes.
numbers = [];
// Uh oh, our type check from build time did not help at all here,
// and we crash by dividing by zero...
avg = average(numbers);

// Since our program has crashed, the critical line below never runs,
// and we are left with a stack trace that does not tell us the
// real problem: that `numbers` was emptied unexpectedly.
emailCustomerWithReport(avg);
```

I could have written a "non-empty" list type and prevented this error from happening at compile-time, but that presumes
that I am able to anticipate all possible values for `numbers` beforehand. This is easier said than done for even
moderately complex systems. In any case, the user experiencing this crash needs help _right now_. I cannot use a
type-trick to fix the problem with state retroactively. Instead, it would be helpful to have a tool to resume the
program after understanding and fixing the real issue with `numbers`. No pre-deployment pipeline can do that, no matter
how sophisticated.

### Software Is Hard Enough

The domains in which our software work can be extremely complex. Engineers are asked to model legal compliance,
manufacturing processes, or even land rockets off-world: this is difficult enough. We do not to compound this by being
in the dark once we deploy our software. We need to admit that software engineering is an iterative design process --
one in which we figure out what we want as we go, learn from our mistakes, and make revisions. This design process does
not happen exclusively before code is deployed; it continues long after code is out in the world and in conversation
with its users. [Charity Majors says it best][test_in_production]: we all test in production whether we like it or not.
It should be expected to build buggy approximations as we navigate domain complexities. Convoluted pre-deployment
verification is a barrier to meaningful change, taking up precious cycles instead of delivering value.

I think we should reconsider our ideas about how the act of writing code happens, the shape of our artifacts, and
especially the environments in which our programs run. We should value debuggability, introspection, and runtime
understanding more than pre-release "correctness by construction." [Previously, I questioned the conventional
understanding of productivity in our programming languages][custodians], and now I question conventional thinking about
how we derive software quality. If we want programs that work -- programs that are capable of handling the complexity of
real users, time, and many, many state changes -- we need programs to have observable lives beyond the compilers that
produced them.

[linguistic_game_tweet]: https://twitter.com/christopherdone/status/1566895556110295051
[strange_loop_youtube]: https://www.youtube.com/c/StrangeLoopConf
[stop_dead_programs]: https://www.youtube.com/watch?v=8Ab3ArE8W3s
[building_observability]: https://www.youtube.com/watch?v=UJA4PGKny2k
[erlang_observer]: https://www.erlang.org/doc/man/observer.html
[test_in_production]: https://corecursive.com/019-test-in-production-with-charity-majors/
[custodians]: /blog/where-are-the-custodians-of-the-field/
