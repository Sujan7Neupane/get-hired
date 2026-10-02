import Button from "../ui/Button";
import Input from "../ui/Input";

const HeroSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find your next <span className="text-primary">opportunity</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-base-content/60">
          Discover jobs from companies that are looking for talented people like
          you.
        </p>

        <div className="mt-10 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <Input placeholder="Job title or keyword" />

            <Input placeholder="Location" />

            <Button className="btn btn-neutral">Search Jobs</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
