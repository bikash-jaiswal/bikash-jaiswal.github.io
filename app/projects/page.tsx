import GitHubProjects from '../Component/GitHubProjects';

export const metadata = {
  title: 'GitHub Projects - Bikash Jaiswal',
  description: 'Projects and repositories by Bikash Jaiswal on GitHub',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-bold text-white text-3xl mb-2 text-center">My GitHub Projects</h1>
        <p className="text-gray-400 text-center mb-12">Some of the projects I've been working on</p>
        <GitHubProjects />
      </div>
    </div>
  );
}
