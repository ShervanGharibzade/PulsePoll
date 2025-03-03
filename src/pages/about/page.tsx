import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../routes/routes";

export const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-blue-400">
          About Our Platform
        </h1>
        <p className="text-lg text-gray-300 mt-4 text-center">
          Your go-to place for asking questions, voting on answers, and engaging
          with a vibrant community.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            What We Offer
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-300">
            <li>
              <strong>Create Questions:</strong> Ask anything and spark
              insightful discussions.
            </li>
            <li>
              <strong>Vote on Answers:</strong> Help surface the best responses
              by voting.
            </li>
            <li>
              <strong>Share Your Questions:</strong> Increase engagement by
              sharing with others.
            </li>
            <li>
              <strong>Track Votes & Voters:</strong> See how many votes your
              question has and who voted.
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
          <div className="space-y-4 mt-2">
            <div className="p-4 bg-zinc-700 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400">
                1. Create a Question
              </h3>
              <p className="text-gray-300">
                Post your question and let the community help you find answers.
              </p>
            </div>
            <div className="p-4 bg-zinc-700 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400">
                2. Get Answers & Engage
              </h3>
              <p className="text-gray-300">
                Users will provide responses, and you can interact with them.
              </p>
            </div>
            <div className="p-4 bg-zinc-700 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400">
                3. Vote for the Best Answer
              </h3>
              <p className="text-gray-300">
                Support the most useful answers by voting.
              </p>
            </div>
            <div className="p-4 bg-zinc-700 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400">
                4. Share & Expand the Discussion
              </h3>
              <p className="text-gray-300">
                Spread your question to get more engagement.
              </p>
            </div>
            <div className="p-4 bg-zinc-700 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400">
                5. Track Votes & See Voters
              </h3>
              <p className="text-gray-300">
                See how many votes your question received and who voted.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-300">
            <li>
              <strong>Community-Driven:</strong> Engage with an active and
              knowledgeable community.
            </li>
            <li>
              <strong>Transparent Voting:</strong> Easily track and understand
              question votes.
            </li>
            <li>
              <strong>Share & Expand:</strong> Get more people involved in
              discussions.
            </li>
            <li>
              <strong>Learn & Contribute:</strong> Ask questions, provide
              answers, and grow together.
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-blue-400">
            Join the Discussion Today!
          </h2>
          <p className="text-gray-300 mt-2">
            Be part of a community where curiosity meets collaboration.
          </p>
          <button
            onClick={() => navigate(pageRoutes.signUp)}
            className="mt-4 px-6 py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
