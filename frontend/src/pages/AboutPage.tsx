const AboutPage = () => {
  return (
    <section className="mx-auto max-w-5xl py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">About getHired</h1>

        <p className="mx-auto mt-5 max-w-2xl text-base-content/60">
          getHired is a job recruitment platform designed to make finding
          opportunities and hiring talent simpler.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-box border border-base-300 p-6">
          <h2 className="text-xl font-semibold">For Candidates</h2>

          <p className="mt-3 text-sm leading-6 text-base-content/60">
            Discover job opportunities, save jobs you're interested in, and
            manage your applications in one place.
          </p>
        </div>

        <div className="rounded-box border border-base-300 p-6">
          <h2 className="text-xl font-semibold">For Employers</h2>

          <p className="mt-3 text-sm leading-6 text-base-content/60">
            Create company profiles, post job opportunities, and manage
            applications from potential candidates.
          </p>
        </div>

        <div className="rounded-box border border-base-300 p-6">
          <h2 className="text-xl font-semibold">Simple & Focused</h2>

          <p className="mt-3 text-sm leading-6 text-base-content/60">
            Our goal is to keep the recruitment process straightforward for both
            candidates and employers.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-box bg-base-200 p-8 text-center">
        <h2 className="text-2xl font-bold">Find your next opportunity</h2>

        <p className="mx-auto mt-3 max-w-xl text-base-content/60">
          Explore available jobs and take the next step toward your career.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
