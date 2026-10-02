import { Link } from "react-router";

const HiringSection = () => {
  return (
    <section className="py-16">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-box bg-base-200 p-8 lg:p-10">
          <h2 className="text-2xl font-bold">Looking for a job?</h2>

          <p className="mt-3 max-w-lg text-base-content/60">
            Create your profile, upload your resume, and discover opportunities
            that match your skills.
          </p>

          <Link to="/register" className="btn btn-neutral mt-6">
            Create Your Account
          </Link>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-8 lg:p-10">
          <h2 className="text-2xl font-bold">Looking for talent?</h2>

          <p className="mt-3 max-w-lg text-base-content/60">
            Find skilled candidates and build your team with getHired.
          </p>

          <Link to="/register" className="btn btn-outline mt-6">
            Start Hiring
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HiringSection;
