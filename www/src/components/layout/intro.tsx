import { main } from "./intro.module.scss";

function Intro() {
  return (
    <div className="mb-16">
      <h4 className={`${main} font-serif text-highlight text-3xl`}>
        Hi, I'm Eric. I'm a software engineer, and this is where I write my
        complaints.
      </h4>
      <p>
        This blog explores the crazy blend of ethics, software, and shit we call
        technology.
      </p>
    </div>
  );
}

export default Intro;
