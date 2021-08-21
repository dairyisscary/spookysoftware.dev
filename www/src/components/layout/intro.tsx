import { main } from "./intro.module.scss";

function Intro() {
  return (
    <section className="mb-16">
      <div className={`${main} font-serif text-highlight text-3xl`}>
        Hi, I'm Eric. I'm a software engineer, and this is where I write my
        complaints.
      </div>
      <p>
        This blog explores the crazy blend of ethics, software, and shit we call
        technology.
      </p>
    </section>
  );
}

export default Intro;
